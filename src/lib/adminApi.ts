const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface SeedingBatch {
  id: string;
  batch_number: string;
  product_id: string;
  product_name?: string;
  seeded_date: string;
  growing_days: number;
  estimated_harvest_date: string;
  actual_harvest_date?: string | null;
  trays_planted: number;
  expected_yield_packs: number;
  actual_yield_packs?: number | null;
  status: 'germinating' | 'growing' | 'ready_to_harvest' | 'harvested' | 'discarded';
  seed_lot_notes?: string | null;
  notes?: string | null;
  days_until_harvest?: number;
  created_at?: string;
}

export interface OfflineSale {
  id: string;
  receipt_number: string;
  product_id: string;
  variant_id?: string | null;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  total_amount: number;
  payment_method: 'upi' | 'cash' | 'card' | 'bank_transfer' | 'complimentary';
  channel: 'direct' | 'farmers_market' | 'restaurant_b2b' | 'whatsapp' | 'walk_in';
  customer_name?: string | null;
  customer_phone?: string | null;
  notes?: string | null;
  sale_date: string;
  created_at?: string;
}

export interface AdminDashboardData {
  activeBatchesCount: number;
  totalTraysGrowing: number;
  readyForHarvestCount: number;
  onlineRevenue: number;
  offlineRevenue: number;
  totalRevenue: number;
  pendingOrdersCount: number;
  totalOfficeItems?: number;
  totalOfficeUnits?: number;
  recentBatches: SeedingBatch[];
  readyTodayBatches: SeedingBatch[];
  recentOfflineSales: OfflineSale[];
  recentOrders: any[];
}

export async function fetchAdminDashboard(): Promise<AdminDashboardData | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/dashboard`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data;
    }
  } catch (err) {
    console.error('Error fetching admin dashboard:', err);
  }
  return null;
}

export async function fetchBatches(): Promise<SeedingBatch[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/batches`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || [];
    }
  } catch (err) {
    console.error('Error fetching batches:', err);
  }
  return [];
}

export async function createBatch(data: {
  product_id: string;
  seeded_date: string;
  trays_planted: number;
  expected_yield_packs: number;
  seed_lot_notes?: string;
  notes?: string;
}): Promise<{ success: boolean; data?: SeedingBatch; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/batches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateBatch(
  batchId: string,
  data: {
    status?: string;
    actual_harvest_date?: string;
    actual_yield_packs?: number;
    notes?: string;
  }
): Promise<{ success: boolean; data?: SeedingBatch; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/batches/${batchId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function fetchOfflineSales(): Promise<OfflineSale[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/offline-sales`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || [];
    }
  } catch (err) {
    console.error('Error fetching offline sales:', err);
  }
  return [];
}

export async function createOfflineSale(data: {
  product_id: string;
  variant_id?: string;
  product_name: string;
  variant_name: string;
  quantity: number;
  unit_price: number;
  payment_method: string;
  channel: string;
  customer_name?: string;
  customer_phone?: string;
  notes?: string;
  sale_date?: string;
}): Promise<{ success: boolean; data?: OfflineSale; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/offline-sales`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateProductStock(
  productId: string,
  stock_quantity: number
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products/${productId}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock_quantity }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function createAdminProduct(data: any): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateAdminProduct(id: string, data: any): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function createAdminVariant(data: any): Promise<{ success: boolean; data?: any; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/variants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function fetchAdminOrders(status?: string): Promise<any[]> {
  try {
    const url = status && status !== 'all' ? `${API_BASE_URL}/admin/orders?status=${status}` : `${API_BASE_URL}/admin/orders`;
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return json.data || [];
    }
  } catch (err) {
    console.error('Error fetching admin orders:', err);
  }
  return [];
}

export async function updateAdminOrderStatus(
  orderId: string,
  status: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

// -------------------------------------------------------------
// Office Products & Equipment Inventory
// -------------------------------------------------------------
export interface OfficeInventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location?: string | null;
  condition?: string | null;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export async function fetchOfficeInventory(): Promise<{
  items: OfficeInventoryItem[];
  count: number;
  totalUnits: number;
  categories: string[];
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/inventory`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      return {
        items: json.data || [],
        count: json.count || 0,
        totalUnits: json.totalUnits || 0,
        categories: json.categories || [],
      };
    }
  } catch (err) {
    console.error('Error fetching office inventory:', err);
  }
  return { items: [], count: 0, totalUnits: 0, categories: [] };
}

export async function createOfficeInventoryItem(data: {
  name: string;
  category: string;
  quantity: number;
  unit: string;
  location?: string;
  condition?: string;
  notes?: string;
}): Promise<{ success: boolean; data?: OfficeInventoryItem; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/inventory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateOfficeInventoryItem(
  id: string,
  data: Partial<OfficeInventoryItem>
): Promise<{ success: boolean; data?: OfficeInventoryItem; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/inventory/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function updateOfficeInventoryCount(
  id: string,
  quantity: number
): Promise<{ success: boolean; data?: OfficeInventoryItem; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/inventory/${id}/count`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function deleteOfficeInventoryItem(
  id: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/inventory/${id}`, {
      method: 'DELETE',
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

