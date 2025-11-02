import type { CSSProperties } from 'react';

export type CSS = CSSProperties;

export type SectionId =
  | 'hero'
  | 'benefits'
  | 'ingredients'
  | 'how'
  | 'pricing'
  | 'testimonials'
  | 'faq'
  | 'footer';

export type Currency = 'USD';

export interface Price {
  amount: number; // in minor units (e.g., 1999 = $19.99) or major units depending on usage; keep consistent
  currency: Currency;
  compareAt?: number; // optional strike-through price (same units as amount)
  perUnit?: string; // e.g., "per tub", "per serving"
  subscription?: {
    enabled: boolean;
    interval: 'month' | 'quarter' | 'year';
    intervalCount?: number; // e.g., every 2 months
    discountPercent?: number;
  };
}

export interface Address {
  fullName?: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode: string;
  country: string; // ISO country code preferred
  phone?: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon?: string; // URL to an icon image (use @@img_*@@ placeholders in components)
}

export interface ProductIngredient {
  name: string;
  amountMg: number;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  heroImage: string; // URL (use @@img_*@@ placeholders in components)
  sku?: string;
  benefits: Benefit[];
  ingredients: ProductIngredient[];
  price: Price;
  badges?: string[];
}

export interface Testimonial {
  name: string;
  quote: string;
  avatar?: string; // URL (use @@img_*@@ placeholders in components)
  rating?: number; // 1-5
  sport?: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface HowStep {
  title: string;
  text: string;
  icon?: string; // URL (use @@img_*@@ placeholders in components)
}

export interface TrustBadge {
  logo: string; // URL (use @@img_*@@ placeholders in components)
  alt: string;
  title?: string;
}

export interface CTAOption {
  id: string;
  label: string;
  sublabel?: string;
  price: Price;
  mostPopular?: boolean;
  savingsText?: string;
}

export interface Guarantee {
  durationDays: number;
  text: string;
}

export interface LineItem {
  productId: string;
  sku?: string;
  quantity: number;
  unitPrice: Price;
}

export interface Cart {
  items: LineItem[];
  subtotal: number; // numeric sum in same units as Price.amount (minor or major; keep consistent)
  currency: Currency;
  discounts?: number;
  shipping?: number;
  tax?: number;
  total: number;
  coupon?: string;
}

export interface CheckoutPayload {
  productId: string;
  quantity: number;
  email: string;
  subscribe?: boolean;
  coupon?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  // Optional plan for bundles or subscription variants
  planId?: string;
}

export interface CheckoutResponseSuccess {
  ok: true;
  redirectUrl: string; // e.g., to a payment processor
}

export interface CheckoutResponseError {
  ok: false;
  error: string;
}

export type CheckoutResponse = CheckoutResponseSuccess | CheckoutResponseError;

export interface SubscribePayload {
  email: string;
  ref?: string; // optional referral or source tag
}

export type SubscribeResponse =
  | { ok: true; message: string }
  | { ok: false; error: string };

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

export type ApiEndpoint = '/api/checkout' | '/api/subscribe';

export interface UseCheckoutState {
  loading: boolean;
  error?: string;
  lastRedirectUrl?: string;
}

export interface UseCheckout {
  state: UseCheckoutState;
  checkout: (payload: CheckoutPayload) => Promise<CheckoutResponse>;
}

export interface StickyCTAState {
  visible: boolean;
  height: number;
}

export interface NavLink {
  label: string;
  href: `#${SectionId}` | string;
}