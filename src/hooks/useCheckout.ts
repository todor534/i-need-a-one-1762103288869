import { useCallback, useEffect, useRef, useState } from 'react';

type CheckoutMode = 'one_time' | 'subscribe';

export type CheckoutParams = {
  // Customer
  email?: string;
  name?: string;

  // Product
  sku?: string; // product identifier
  quantity?: number;

  // Pricing / flow
  coupon?: string;
  mode?: CheckoutMode; // defaults to one_time for startCheckout, subscribe for startSubscription
  interval?: 'month' | 'year'; // used for subscriptions
  redirect?: boolean; // whether to redirect if URL returned
  openInNewTab?: boolean; // only used when redirect === true
  metadata?: Record<string, string | number | boolean | null>;
};

type ApiCheckoutResponse = {
  ok: boolean;
  message?: string;
  // Either a URL to redirect to or an immediate order id
  url?: string;
  orderId?: string;
  // Optional normalized fields
  status?: 'created' | 'paid' | 'requires_action' | 'redirect';
};

type HookStatus = 'idle' | 'processing' | 'redirected' | 'completed' | 'error';

const DEFAULT_PRODUCT_SKU = 'muscle-recovery-supplement';

async function postJSON<T = any>(
  url: string,
  body: unknown,
  signal?: AbortSignal
): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body ?? {}),
    signal,
  });

  const isJSON =
    res.headers.get('content-type')?.toLowerCase().includes('application/json') ||
    false;

  const payload = isJSON ? await res.json().catch(() => ({})) : {};

  if (!res.ok) {
    const msg = (payload && (payload.message || payload.error)) || res.statusText;
    throw new Error(msg || 'Request failed');
  }

  return payload as T;
}

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<HookStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const reset = useCallback(() => {
    setLoading(false);
    setStatus('idle');
    setError(null);
    setOrderId(null);
  }, []);

  const run = useCallback(
    async (endpoint: '/api/checkout' | '/api/subscribe', params?: Partial<CheckoutParams>) => {
      // Cancel previous in-flight
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);
      setStatus('processing');
      setOrderId(null);

      const {
        email,
        name,
        quantity = 1,
        coupon,
        sku = DEFAULT_PRODUCT_SKU,
        interval,
        metadata,
        redirect = true,
        openInNewTab = false,
        mode,
      } = params || {};

      // Basic validation
      const safeQty = Number.isFinite(quantity) && (quantity as number) > 0 ? Math.floor(quantity as number) : 1;

      try {
        const body = {
          email,
          name,
          coupon,
          product: {
            sku,
            quantity: safeQty,
          },
          mode: mode ?? (endpoint === '/api/subscribe' ? 'subscribe' : 'one_time'),
          interval: interval ?? (endpoint === '/api/subscribe' ? 'month' : undefined),
          metadata: {
            source: 'landing_onepage',
            ...metadata,
          },
          // Allow server handlers to understand the expected client behavior
          client: {
            redirect,
            openInNewTab,
          },
        };

        const data = await postJSON<ApiCheckoutResponse>(endpoint, body, controller.signal);

        // If server returns a URL, prefer redirect flow
        if (data.url) {
          if (redirect) {
            setStatus('redirected');
            if (openInNewTab) {
              window.open(data.url, '_blank', 'noopener,noreferrer');
            } else {
              window.location.assign(data.url);
            }
          } else {
            // If consumer doesn't want redirect, just return success with URL
            setStatus('completed');
          }
        } else if (data.orderId || data.status === 'paid' || data.ok) {
          // Immediate success (e.g., free or mock checkout)
          setOrderId(data.orderId || null);
          setStatus('completed');
        } else {
          throw new Error(data.message || 'Unable to start checkout');
        }

        return data;
      } catch (err: any) {
        if (controller.signal.aborted) {
          // Swallow abort errors
          return;
        }
        const msg = err?.message || 'Something went wrong starting checkout';
        if (mountedRef.current) {
          setError(msg);
          setStatus('error');
        }
        throw err;
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    },
    []
  );

  const startCheckout = useCallback(
    (params?: Partial<CheckoutParams>) => run('/api/checkout', { mode: 'one_time', ...params }),
    [run]
  );

  const startSubscription = useCallback(
    (params?: Partial<CheckoutParams>) => run('/api/subscribe', { mode: 'subscribe', interval: 'month', ...params }),
    [run]
  );

  // Aliases for convenience
  const checkout = startCheckout;
  const subscribe = startSubscription;

  return {
    // state
    loading,
    status,
    error,
    orderId,
    // actions
    startCheckout,
    startSubscription,
    checkout,
    subscribe,
    reset,
  };
}

export default useCheckout;