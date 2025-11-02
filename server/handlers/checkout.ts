import { v4 as uuidv4 } from 'uuid';

type CheckoutAddress = {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

type PaymentInfo = {
  type?: 'card';
  token?: string;
  cardLast4?: string;
};

type CheckoutRequest = {
  productId: string;
  quantity: number;
  email: string;
  name?: string;
  address?: CheckoutAddress;
  shippingMethod?: 'standard' | 'express';
  couponCode?: string;
  payment?: PaymentInfo;
  subscribe?: boolean;
};

type CheckoutResponse = {
  success: boolean;
  orderId?: string;
  message?: string;
  amount?: {
    currency: 'USD';
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
  product?: {
    id: string;
    name: string;
    unitPrice: number;
  };
  quantity?: number;
  email?: string;
  shippingMethod?: 'standard' | 'express';
  couponCode?: string;
  testMode?: boolean;
  lineItems?: Array<{ description: string; amount: number }>;
  errors?: string[];
};

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'content-type',
};

const PRODUCTS = {
  'muscle-recovery': {
    id: 'muscle-recovery',
    name: 'Muscle Recovery Supplement',
    currency: 'USD' as const,
  },
};

const TAX_RATES_BY_STATE: Record<string, number> = {
  CA: 0.0825,
  NY: 0.08875,
  FL: 0.07,
  TX: 0.0625,
};

const https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102192992-img-shipping.png_RATES = {
  standard: 4.95,
  express: 12.0,
};

const COUPONS: Record<
  string,
  | { kind: 'percent'; value: number }
  | { kind: 'freeship' }
  | { kind: 'fixed'; value: number; minSubtotal?: number }
> = {
  SUPP10: { kind: 'percent', value: 10 },
  FREESHIP: { kind: 'freeship' },
  BULK5: { kind: 'fixed', value: 5, minSubtotal: 100 }, // Extra $5 off orders >= $100
};

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function getUnitPrice(qty: number): number {
  if (qty >= 6) return 39;
  if (qty >= 3) return 44;
  return 49;
}

function isValidEmail(email: string): boolean {
  // Simple email check
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function parseJson<T = any>(req: Request): Promise<T | null> {
  try {
    const data = await req.json();
    return data as T;
  } catch {
    return null;
  }
}

function computeDiscount(
  couponCode: string | undefined,
  subtotal: number
): number {
  if (!couponCode) return 0;
  const key = couponCode.trim().toUpperCase();
  const c = COUPONS[key];
  if (!c) return 0;
  if (c.kind === 'percent') return round2((subtotal * c.value) / 100);
  if (c.kind === 'fixed') {
    if (c.minSubtotal && subtotal < c.minSubtotal) return 0;
    return Math.min(round2(c.value), subtotal);
  }
  // freeship has no discount effect on subtotal
  return 0;
}

function isFreeShipping(couponCode: string | undefined, shippingMethod: 'standard' | 'express', subtotalAfterDiscount: number): boolean {
  if (shippingMethod !== 'standard') return false;
  if (subtotalAfterDiscount >= 75) return true; // automatic free standard shipping threshold
  if (!couponCode) return false;
  const key = couponCode.trim().toUpperCase();
  const c = COUPONS[key];
  return !!c && c.kind === 'freeship';
}

function getTaxRate(address?: CheckoutAddress): number {
  if (!address?.state) return 0;
  const rate = TAX_RATES_BY_STATE[address.state.toUpperCase()];
  return rate ?? 0;
}

function newId(prefix: string): string {
  // Prefer uuid if available; fallback simple
  try {
    return `${prefix}_${uuidv4()}`;
  } catch {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function handle(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, message: 'Method Not Allowed' } satisfies CheckoutResponse),
      { status: 405, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  const body = await parseJson<CheckoutRequest>(req);
  if (!body) {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid JSON body' } satisfies CheckoutResponse),
      { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  const errors: string[] = [];
  const productId = body.productId || 'muscle-recovery';
  const product = PRODUCTS[productId as keyof typeof PRODUCTS];

  if (!product) errors.push('Invalid productId.');
  if (typeof body.quantity !== 'number' || !Number.isFinite(body.quantity) || body.quantity < 1 || body.quantity > 99) {
    errors.push('Quantity must be between 1 and 99.');
  }
  if (!body.email || !isValidEmail(body.email)) {
    errors.push('A valid email is required.');
  }

  const shippingMethod: 'standard' | 'express' = body.shippingMethod === 'express' ? 'express' : 'standard';

  if (errors.length) {
    return new Response(
      JSON.stringify({ success: false, errors, message: 'Validation failed' } satisfies CheckoutResponse),
      { status: 400, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  // Compute pricing
  const unitPrice = getUnitPrice(body.quantity);
  const subtotal = round2(unitPrice * body.quantity);
  const discount = computeDiscount(body.couponCode, subtotal);
  const subtotalAfterDiscount = round2(subtotal - discount);

  const freeShip = isFreeShipping(body.couponCode, shippingMethod, subtotalAfterDiscount);
  const baseShipping = shippingMethod === 'express' ? https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102192992-img-shipping.png_RATES.express : https://jg7nnjuy9jonydmm.public.blob.vercel-storage.com/ai/1762102192992-img-shipping.png_RATES.standard;
  const shipping = freeShip ? 0 : baseShipping;

  const taxRate = getTaxRate(body.address);
  const taxableAmount = subtotalAfterDiscount; // shipping not taxed
  const tax = round2(taxRate * taxableAmount);

  const total = round2(subtotalAfterDiscount + shipping + tax);

  // Fake payment processing
  const testMode = true;
  const paymentOk = true; // In test mode, always succeeds
  if (!paymentOk) {
    return new Response(
      JSON.stringify({ success: false, message: 'Payment failed. Please try another payment method.' } satisfies CheckoutResponse),
      { status: 402, headers: { 'Content-Type': 'application/json', ...CORS_HEADERS } }
    );
  }

  const orderId = newId('ord');

  const lineItems = [
    { description: `${product.name} x ${body.quantity}`, amount: subtotal },
    ...(discount > 0 ? [{ description: 'Discount', amount: -discount }] : []),
    ...(shipping > 0 ? [{ description: `${shippingMethod === 'express' ? 'Express' : 'Standard'} Shipping`, amount: shipping }] : []),
    ...(tax > 0 ? [{ description: 'Estimated Tax', amount: tax }] : []),
  ];

  const resBody: CheckoutResponse = {
    success: true,
    orderId,
    email: body.email,
    product: {
      id: product.id,
      name: product.name,
      unitPrice,
    },
    quantity: body.quantity,
    shippingMethod,
    couponCode: body.couponCode?.toUpperCase(),
    amount: {
      currency: 'USD',
      subtotal,
      discount,
      shipping,
      tax,
      total,
    },
    testMode,
    lineItems,
    message: 'Order processed successfully.',
  };

  return new Response(JSON.stringify(resBody), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}