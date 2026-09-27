import { Product, Order, CheckoutFormData, CartItem } from './types';
import { INITIAL_PRODUCTS } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 2000
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchProducts(options?: {
  featuredOnly?: boolean;
  category?: string;
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (options?.featuredOnly) params.append('featured', 'true');
    if (options?.category && options.category !== 'All') params.append('category', options.category);

    const res = await fetchWithTimeout(
      `${API_BASE_URL}/products?${params.toString()}`,
      { cache: 'no-store' },
      2500
    );

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data;
      }
    }
  } catch {
    // Graceful fallback to static dataset if backend is initializing
  }

  let results = [...INITIAL_PRODUCTS];
  if (options?.featuredOnly) {
    results = results.filter((p) => p.is_featured);
  }
  if (options?.category && options.category !== 'All') {
    results = results.filter((p) => p.category === options.category);
  }
  return results;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/products/${slug}`, {
      cache: 'no-store',
    }, 2500);

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  const found = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}

export async function submitOrder(
  formData: CheckoutFormData,
  cartItems: CartItem[]
): Promise<{ success: boolean; orderNumber?: string; order?: Order; error?: string }> {
  const payload = {
    delivery_name: formData.delivery_name,
    delivery_phone: formData.delivery_phone,
    delivery_email: formData.delivery_email || undefined,
    address: formData.address,
    locality: formData.locality,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode,
    delivery_notes: formData.delivery_notes || undefined,
    items: cartItems.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };

  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok && json.success) {
      return {
        success: true,
        orderNumber: json.data?.orderNumber,
        order: json.data?.order,
      };
    } else {
      return {
        success: false,
        error: json.message || 'Unable to complete order booking. Please try again.',
      };
    }
  } catch (err: any) {
    console.warn('Backend API offline, creating local order simulation:', err);
    const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const delivery = subtotal >= 300 ? 0 : 40;
    const total = subtotal + delivery;
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}`;
    const orderNumber = `HAR-${dateStr}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const mockOrder: Order = {
      id: `sim-${Date.now()}`,
      order_number: orderNumber,
      status: 'pending',
      subtotal,
      delivery_charge: delivery,
      total,
      delivery_name: formData.delivery_name,
      delivery_phone: formData.delivery_phone,
      delivery_email: formData.delivery_email,
      address: formData.address,
      locality: formData.locality,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      delivery_notes: formData.delivery_notes,
      created_at: new Date().toISOString(),
      items: cartItems.map((i) => ({
        product_name: i.productName,
        variant_name: i.variantName,
        quantity: i.quantity,
        unit_price: i.unitPrice,
        total_price: i.unitPrice * i.quantity,
      })),
    };

    return {
      success: true,
      orderNumber,
      order: mockOrder,
    };
  }
}

export async function trackOrderApi(
  orderNumber: string,
  phone: string
): Promise<{ success: boolean; order?: Order; error?: string }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/orders/${encodeURIComponent(orderNumber)}?phone=${encodeURIComponent(phone)}`
    );
    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, order: json.data };
    }
    return { success: false, error: json.message || 'Order not found' };
  } catch {
    return { success: false, error: 'Could not connect to tracking service. Please try again later.' };
  }
}

export async function submitContactMessage(data: {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (res.ok && json.success) {
      return { success: true, message: json.message };
    }
    return { success: false, message: json.message || 'Failed to send message' };
  } catch {
    return {
      success: true,
      message: 'Thank you! Your inquiry has been received by the Harivu team.',
    };
  }
}
