export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'harvested'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface ProductVariant {
  id: string;
  product_id: string;
  name: string;
  weight_grams: number;
  price: number;
  is_available: boolean;
  is_default?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string;
  description: string;
  image_url: string;
  video_url?: string | null;
  price: number;
  unit: string;
  is_available: boolean;
  is_featured: boolean;
  stock_quantity: number;
  growing_days: number;
  harvest_notes?: string | null;
  flavor_profile?: string | null;
  nutrition_highlights?: string[];
  health_benefits?: { title: string; desc: string; icon?: string }[];
  benefits?: string[];
  uses?: string[];
  media_files?: { url: string; key?: string; type: string; name?: string; _id?: string }[];
  display_order?: number;
  variants?: ProductVariant[];
  created_at?: string;
  updated_at?: string;
}


export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  slug: string;
  imageUrl: string;
  unitPrice: number;
  weightGrams: number;
  quantity: number;
}

export interface OrderItem {
  id?: string;
  order_id?: string;
  product_id?: string | null;
  variant_id?: string | null;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_id?: string | null;
  status: OrderStatus;
  subtotal: number;
  delivery_charge: number;
  total: number;
  delivery_name: string;
  delivery_phone: string;
  delivery_email?: string | null;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  delivery_notes?: string | null;
  items?: OrderItem[];
  created_at?: string;
  updated_at?: string;
}

export interface CheckoutFormData {
  delivery_name: string;
  delivery_phone: string;
  delivery_email?: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  delivery_notes?: string;
}
