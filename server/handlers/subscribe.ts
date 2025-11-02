import type { } from 'vite';

type SubscribePayload = {
  email?: string;
  planId?: string;
  quantity?: number;
  name?: string;
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
  paymentMethodId?: string;
  coupon?: string;
  meta?: Record<string, unknown>;
};

type Plan = {
  id: string;
  label: string;
  price: number; // USD
  interval: 'month' | 'quarter' | 'year';
};

type Subscription = {
  id: string;
  status: 'active' | 'pending' | 'canceled' | 'past_due';
  email: string;
  name?: string;
  planId: string;
  interval: Plan['interval'];
  quantity: number;
  unitPrice: number;
  discount?: { code: string; amountOff: number; percentOff?: number };
  total: number;
  currency: 'USD';
  createdAt: string;
  nextBillingDate: string;
  address?: SubscribePayload['address'];
  meta?: Record<string, unknown>;
};

const PLANS: Record<string, Plan> = {
  monthly: { id: 'monthly', label: 'Monthly', price: 39, interval: 'month' },
  quarterly: { id: 'quarterly', label: 'Quarterly', price: 99, interval: 'quarter' },
  yearly: { id: 'yearly', label: 'Yearly', price: 349, interval: 'year' },
};

const CORS_MAX_AGE = '86400';

function corsHeaders(origin?: string | null): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': CORS_MAX_AGE,
    Vary: 'Origin',
  };
}

function json(data: unknown, init?: ResponseInit, origin?: string | null): Response {
  const baseHeaders: HeadersInit = {
    'Content-Type': 'application/json; charset=utf-8',
    ...corsHeaders(origin),
  };
  return new Response(JSON.stringify(data), { ...init, headers: { ...baseHeaders, ...(init?.headers || {}) } });
}

function badRequest(message: string, details?: unknown, origin?: string | null): Response {
  return json({ success: false, error: message, details }, { status: 400 }, origin);
}

function methodNotAllowed(origin?: string | null): Response {
  return json({ success: false, error: 'Method Not Allowed' }, { status: 405 }, origin);
}

function unsupportedMediaType(origin?: string | null): Response {
  return json({ success: false, error: 'Unsupported Media Type. Expected application/json' }, { status: 415 }, origin);
}

function uid(prefix = 'sub'): string {
  return `${prefix}_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

function isEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  // Simple, permissive email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function getPlan(planId?: string): Plan {
  if (!planId) return PLANS.monthly;
  return PLANS[planId] ?? PLANS.monthly;
}

function clampQuantity(qty: unknown): number {
  const n = typeof qty === 'number' ? qty : Number(qty);
  if (!Number.isFinite(n) || n <= 0) return 1;
  return Math.min(Math.floor(n), 10);
}

function addIntervalFromNow(interval: Plan['interval']): string {
  const now = new Date();
  const msPerDay = 24 * 60 * 60 * 1000;
  const days =
    interval === 'month' ? 30 :
    interval === 'quarter' ? 90 :
    365;
  return new Date(now.getTime() + days * msPerDay).toISOString();
}

function applyCoupon(price: number, code?: string): { total: number; discount?: Subscription['discount'] } {
  if (!code) return { total: price };
  const normalized = code.trim().toUpperCase();
  if (!normalized) return { total: price };

  // Simple demo coupons
  if (normalized === 'SAVE10') {
    const discount = Math.round(price * 0.10 * 100) / 100;
    return { total: Math.max(0, price - discount), discount: { code: normalized, amountOff: discount, percentOff: 10 } };
  }
  if (normalized === 'SAVE20') {
    const discount = Math.round(price * 0.20 * 100) / 100;
    return { total: Math.max(0, price - discount), discount: { code: normalized, amountOff: discount, percentOff: 20 } };
  }
  if (normalized === 'FREESHIP') {
    // For demonstration, no shipping line exists, so just echo discount with zero amount
    return { total: price, discount: { code: normalized, amountOff: 0 } };
  }
  // Unknown coupon: ignore silently
  return { total: price };
}

declare global {
  // In-memory demo store for dev
  // eslint-disable-next-line no-var
  var __SUBSCRIPTIONS__: Subscription[] | undefined;
}

export async function handle(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return methodNotAllowed(origin);
  }

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return unsupportedMediaType(origin);
  }

  let payload: SubscribePayload;
  try {
    payload = await req.json();
  } catch {
    return badRequest('Invalid JSON body', undefined, origin);
  }

  const { email, planId, quantity, name, address, coupon, meta } = payload;

  if (!isEmail(email)) {
    return badRequest('A valid email address is required.', { field: 'email' }, origin);
  }

  const plan = getPlan(planId);
  const qty = clampQuantity(quantity);
  const unitPrice = plan.price;
  const subtotal = Math.round(unitPrice * qty * 100) / 100;

  const couponResult = applyCoupon(subtotal, coupon);
  const total = Math.round(couponResult.total * 100) / 100;

  const subscription: Subscription = {
    id: uid(),
    status: 'active',
    email: email.trim(),
    name: typeof name === 'string' ? name.trim() : undefined,
    planId: plan.id,
    interval: plan.interval,
    quantity: qty,
    unitPrice,
    discount: couponResult.discount,
    total,
    currency: 'USD',
    createdAt: new Date().toISOString(),
    nextBillingDate: addIntervalFromNow(plan.interval),
    address: address && typeof address === 'object' ? address : undefined,
    meta: meta && typeof meta === 'object' ? meta : undefined,
  };

  // Persist to in-memory store (dev/demo only)
  try {
    globalThis.__SUBSCRIPTIONS__ = globalThis.__SUBSCRIPTIONS__ || [];
    globalThis.__SUBSCRIPTIONS__!.push(subscription);
  } catch {
    // ignore persistence failures in serverless environments without global state
  }

  return json(
    {
      success: true,
      subscriptionId: subscription.id,
      subscription,
      message: 'Subscription created successfully.',
    },
    { status: 201 },
    origin
  );
}