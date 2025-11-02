/* Lightweight API client for serverless endpoints under /api */
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

export type JsonObject = { [key: string]: JSONValue };

export interface ApiError extends Error {
  status: number;
  details?: unknown;
}

export interface ApiClientOptions {
  baseUrl?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
  fetchImpl?: typeof fetch;
}

const DEFAULT_TIMEOUT = 15000;

const DEFAULT_BASE_URL =
  typeof import.meta !== "undefined" && (import.meta as any).env && (import.meta as any).env.VITE_API_BASE_URL
    ? (import.meta as any).env.VITE_API_BASE_URL
    : "/api";

function joinUrl(base: string, path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const b = base.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return `${b}/${p}`;
}

function buildHeaders(extra?: Record<string, string>): Headers {
  const h = new Headers();
  h.set("Accept", "application/json");
  h.set("Content-Type", "application/json");
  if (extra) {
    for (const [k, v] of Object.entries(extra)) {
      if (v != null) h.set(k, v);
    }
  }
  return h;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  const isJSON = contentType.includes("application/json");

  if (res.ok) {
    if (res.status === 204) return undefined as unknown as T;
    if (isJSON) return (await res.json()) as T;
    const text = await res.text();
    return (text as unknown) as T;
  }

  let message = `Request failed with status ${res.status}`;
  let details: unknown;
  if (isJSON) {
    try {
      const data = await res.json();
      message =
        (data && (data.message || data.error || data.reason)) || message;
      details = data;
    } catch {
      // ignore
    }
  } else {
    try {
      const text = await res.text();
      if (text) message = text;
    } catch {
      // ignore
    }
  }

  const error: ApiError = Object.assign(new Error(message), {
    status: res.status,
    details,
    name: "ApiError",
  });
  throw error;
}

async function request<T>(
  path: string,
  body?: unknown,
  options: ApiClientOptions & { method?: string } = {}
): Promise<T> {
  const {
    baseUrl = DEFAULT_BASE_URL,
    timeoutMs = DEFAULT_TIMEOUT,
    headers,
    fetchImpl,
    method = "POST",
  } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await (fetchImpl || fetch)(joinUrl(baseUrl, path), {
      method,
      headers: buildHeaders(headers),
      body: body === undefined ? undefined : JSON.stringify(body),
      credentials: "same-origin",
      signal: controller.signal,
    });
    return await handleResponse<T>(res);
  } catch (err: any) {
    if (err?.name === "AbortError") {
      const timeoutError: ApiError = Object.assign(
        new Error("Request timed out"),
        { status: 0, name: "ApiTimeoutError" }
      );
      throw timeoutError;
    }
    throw err;
  } finally {
    clearTimeout(id);
  }
}

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

export async function safeRequest<T>(
  path: string,
  body?: unknown,
  options?: ApiClientOptions & { method?: string }
): Promise<ApiResult<T>> {
  try {
    const data = await request<T>(path, body, options);
    return { ok: true, data };
  } catch (error) {
    return { ok: false, error: error as ApiError };
  }
}

/* Domain-specific helpers */
export interface CheckoutPayload extends JsonObject {}
export interface CheckoutResponse extends JsonObject {}
export interface SubscribePayload extends JsonObject {}
export interface SubscribeResponse extends JsonObject {}

/* POST /api/checkout */
export async function checkout(
  payload: CheckoutPayload,
  options?: ApiClientOptions & { idempotencyKey?: string }
): Promise<CheckoutResponse> {
  const { idempotencyKey, headers, ...rest } = options || {};
  return request<CheckoutResponse>("/checkout", payload, {
    ...rest,
    headers: {
      ...(headers || {}),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
  });
}

/* POST /api/subscribe */
export async function subscribe(
  payload: SubscribePayload,
  options?: ApiClientOptions
): Promise<SubscribeResponse> {
  return request<SubscribeResponse>("/subscribe", payload, options);
}

/* Optional health check if needed by the app (GET /api/health) */
export async function health(
  options?: ApiClientOptions
): Promise<{ status: string } | JsonObject> {
  return request<{ status: string } | JsonObject>("/health", undefined, {
    ...(options || {}),
    method: "GET",
  });
}

/* Export a convenient API object */
export const api = {
  checkout,
  subscribe,
  health,
  request,
  safeRequest,
};