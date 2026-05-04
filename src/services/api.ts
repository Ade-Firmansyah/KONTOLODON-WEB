const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

type RequestOptions = RequestInit & {
  apiKey?: string;
};

export type AppRole = 'admin' | 'reseller' | 'member';

export interface LoginResponse {
  status: boolean;
  role: AppRole;
  api_key: string;
  user: {
    username: string;
    saldo: number;
    status: string;
  };
}

export interface ProductRecord {
  id: number;
  premku_id: number | null;
  name: string;
  code: string;
  note?: string;
  tag?: string;
  price_base: number;
  price_sell: number;
  markup?: number;
  markup_percent?: number;
  discount_percent?: number;
  image?: string;
  stock: number;
  status: string;
}

export interface MeRecord {
  id: number;
  username: string;
  email: string;
  saldo: number;
  role: AppRole;
  api_key: string;
}

export interface DashboardSummaryRecord {
  saldo: number;
  total_transactions: number;
  total_spent: number;
  total_deposits: number;
  total_deposit_amount: number;
  active_products: number;
}

export interface AdminUserRecord {
  id: number;
  username: string;
  role: AppRole;
  fullName?: string;
  email?: string;
  phone?: string;
  saldo: number;
  status: string;
  orders?: number;
  deposits?: number;
  lastLogin?: string;
  notes?: string;
  api_key?: string;
}

export interface MarkupSettingRecord {
  markup: number;
  markup_type: 'fixed' | 'percent';
}

export interface DiscountSettingRecord {
  discount_percent: number;
}

export interface NotificationRecord {
  id: number;
  title: string;
  message: string;
  target_role: 'all' | AppRole;
  created_by?: number | null;
  created_at?: string;
}

export interface OrderRecord {
  id?: number;
  invoice: string;
  product_id?: number;
  product_name?: string;
  product_image?: string | null;
  description?: string;
  qty?: number;
  price_sell?: number;
  total_price?: number;
  status?: string;
  channel?: string;
  account_data?: {
    email?: string;
    password?: string;
    description?: string;
    [key: string]: unknown;
  } | null;
  accounts?: Array<{
    username?: string;
    password?: string;
    [key: string]: unknown;
  }>;
  created_at?: string;
}

export interface DepositRecord {
  id?: number;
  user_id?: number;
  invoice: string;
  amount: number;
  total_bayar?: number;
  qr_data?: string | null;
  status?: string;
  created_at?: string;
}

export interface WithdrawRecord {
  id: number;
  user_id: number;
  username?: string;
  email?: string;
  amount: number;
  status: string;
  bank_account?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string | null;
}

export interface SaldoLogRecord {
  id: number;
  user_id: number;
  type: 'credit' | 'debit';
  amount: number;
  balance_before: number;
  balance_after: number;
  reference?: string;
  created_at?: string;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  try {
    const headers = new Headers(options.headers);
    headers.set('content-type', 'application/json');

    const apiKey =
      options.apiKey ||
      localStorage.getItem('premiuminplus:api-key') ||
      sessionStorage.getItem('premiuminplus:api-key');
    if (apiKey) {
      headers.set('x-api-key', apiKey);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const raw = await response.text();
    const trimmed = raw.trim();

    if (!trimmed) {
      throw new Error('Invalid API response (empty body)');
    }

    if (trimmed.startsWith('<')) {
      console.error('Invalid HTML response from API', { path, raw });
      throw new Error('Invalid API response (HTML returned)');
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(trimmed) as Record<string, unknown>;
    } catch (parseError) {
      console.error('Invalid JSON response from API', { path, raw, parseError });
      throw new Error('Invalid API response (JSON parse failed)');
    }

    if (!response.ok) {
      const message = typeof parsed.message === 'string' ? parsed.message : 'Request gagal';
      throw new Error(message);
    }

    return parsed as T;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Backend belum aktif atau CORS belum terbuka.');
    }

    throw error;
  }
}

export const premiuminApi = {
  login: (payload: { username: string; password: string }) =>
    apiRequest<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  products: (apiKey?: string) => apiRequest<{ status: boolean; data: ProductRecord[] }>('/products', { apiKey }),
  me: (apiKey?: string) => apiRequest<{ status: boolean; data: MeRecord }>('/me', { apiKey }),
  dashboardSummary: (apiKey?: string) =>
    apiRequest<{ status: boolean; data: DashboardSummaryRecord }>('/dashboard/summary', { apiKey }),
  saldo: (apiKey?: string) => apiRequest<{ status: boolean; saldo: number }>('/saldo', { apiKey }),
  transactions: (apiKey?: string) => apiRequest<{ status: boolean; data: OrderRecord[] }>('/orders', { apiKey }),
  deposits: (apiKey?: string) => apiRequest<{ status: boolean; data: DepositRecord[] }>('/deposits', { apiKey }),
  saldoLogs: (apiKey?: string) => apiRequest<{ status: boolean; data: SaldoLogRecord[] }>('/saldo/logs', { apiKey }),
  notifications: (apiKey?: string) => apiRequest<{ status: boolean; data: NotificationRecord[] }>('/notifications', { apiKey }),
  deposit: (payload: { amount: number }, apiKey?: string) =>
    apiRequest<{ status: boolean; data: DepositRecord }>('/deposit', {
      method: 'POST',
      apiKey,
      body: JSON.stringify(payload),
    }),
  depositStatus: (invoice: string, apiKey?: string) => apiRequest<{ status: boolean; data: DepositRecord }>(`/deposit/${invoice}`, { apiKey }),
  withdraw: (payload: { amount: number; bank_account: string; account_number: string; notes?: string }, apiKey?: string) =>
    apiRequest<{ status: boolean; data: WithdrawRecord }>('/withdraw', {
      method: 'POST',
      apiKey,
      body: JSON.stringify(payload),
    }),
  order: (payload: { product_id: number; qty?: number }, apiKey?: string) =>
    apiRequest<{ status: boolean; data: OrderRecord }>('/order', {
      method: 'POST',
      apiKey,
      body: JSON.stringify(payload),
    }),
  orderStatus: (invoice: string, apiKey?: string) => apiRequest<{ status: boolean; data: OrderRecord }>(`/order/${invoice}`, { apiKey }),
  adminUsers: (apiKey?: string) => apiRequest<{ status: boolean; data: AdminUserRecord[] }>('/admin/users', { apiKey }),
  adminTransactions: (apiKey?: string) => apiRequest<{ status: boolean; data: OrderRecord[] }>('/admin/transactions', { apiKey }),
  adminDeposits: (apiKey?: string) => apiRequest<{ status: boolean; data: DepositRecord[] }>('/admin/deposits', { apiKey }),
  adminWithdraws: (apiKey?: string) => apiRequest<{ status: boolean; data: WithdrawRecord[] }>('/admin/withdraws', { apiKey }),
  adminApproveWithdraw: (id: number, apiKey?: string) =>
    apiRequest<{ status: boolean; data: WithdrawRecord }>(`/admin/withdraws/${id}/approve`, {
      method: 'PATCH',
      apiKey,
    }),
  adminRejectWithdraw: (id: number, notes: string, apiKey?: string) =>
    apiRequest<{ status: boolean; data: WithdrawRecord }>(`/admin/withdraws/${id}/reject`, {
      method: 'PATCH',
      apiKey,
      body: JSON.stringify({ notes }),
    }),
  adminCreateUser: (payload: Record<string, unknown>, apiKey?: string) =>
    apiRequest<{ status: boolean; data: AdminUserRecord }>('/admin/create-user', {
      method: 'POST',
      apiKey,
      body: JSON.stringify(payload),
    }),
  adminUpdateUser: (id: number, payload: Record<string, unknown>, apiKey?: string) =>
    apiRequest<{ status: boolean; data: AdminUserRecord }>(`/admin/update-user/${id}`, {
      method: 'PATCH',
      apiKey,
      body: JSON.stringify(payload),
    }),
  adminDeleteUser: (id: number, apiKey?: string) =>
    apiRequest<{ status: boolean; data: AdminUserRecord }>(`/admin/delete-user/${id}`, {
      method: 'DELETE',
      apiKey,
    }),
  markup: (apiKey?: string) => apiRequest<{ status: boolean; data: MarkupSettingRecord }>('/admin/markup', { apiKey }),
  updateMarkup: (payload: MarkupSettingRecord, apiKey?: string) =>
    apiRequest<{ status: boolean; data: MarkupSettingRecord }>('/admin/markup', {
      method: 'PATCH',
      apiKey,
      body: JSON.stringify(payload),
    }),
  discount: (apiKey?: string) => apiRequest<{ status: boolean; data: DiscountSettingRecord }>('/admin/discount', { apiKey }),
  updateDiscount: (payload: DiscountSettingRecord, apiKey?: string) =>
    apiRequest<{ status: boolean; data: DiscountSettingRecord }>('/admin/discount', {
      method: 'PATCH',
      apiKey,
      body: JSON.stringify(payload),
    }),
  adminNotifications: (apiKey?: string) => apiRequest<{ status: boolean; data: NotificationRecord[] }>('/admin/notifications', { apiKey }),
  adminCreateNotification: (payload: { title: string; message: string; target_role: 'all' | AppRole }, apiKey?: string) =>
    apiRequest<{ status: boolean; data: NotificationRecord }>('/admin/notifications', {
      method: 'POST',
      apiKey,
      body: JSON.stringify(payload),
    }),
  premkuKey: (apiKey?: string) => apiRequest<{ status: boolean; data: { configured: boolean; masked: string } }>('/admin/premku-key', { apiKey }),
  updatePremkuKey: (premkuApiKey: string, apiKey?: string) =>
    apiRequest<{ status: boolean; data: { configured: boolean; masked: string } }>('/admin/premku-key', {
      method: 'PATCH',
      apiKey,
      body: JSON.stringify({ api_key: premkuApiKey }),
    }),
};
