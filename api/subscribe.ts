import { handle as subscribeHandle } from '../server/handlers/subscribe';

function toWebHeaders(nodeHeaders: Record<string, string | string[] | undefined>) {
  const headers = new Headers();
  if (!nodeHeaders) return headers;
  for (const key of Object.keys(nodeHeaders)) {
    const value = nodeHeaders[key];
    if (value === undefined) continue;
    headers.set(key, Array.isArray(value) ? value.join(', ') : String(value));
  }
  return headers;
}

function methodHasBody(method?: string) {
  const m = (method || '').toUpperCase();
  return m !== 'GET' && m !== 'HEAD';
}

export default async function handler(req: any, res?: any): Promise<any> {
  // Edge/fetch-compatible runtimes
  if (
    typeof Request !== 'undefined' &&
    typeof Response !== 'undefined' &&
    res === undefined &&
    (req instanceof Request || (req?.url && typeof req?.headers?.get === 'function'))
  ) {
    return subscribeHandle(req as Request);
  }

  // Node-style (e.g., Vercel/Netlify Node runtimes)
  if (res) {
    const protocol =
      (req.headers['x-forwarded-proto'] as string) ||
      req.protocol ||
      'http';
    const host = req.headers.host;
    const fullUrl = `${protocol}://${host}${req.url}`;

    const init: RequestInit = {
      method: req.method,
      headers: toWebHeaders(req.headers),
      body: methodHasBody(req.method) ? req : undefined,
      // @ts-expect-error Node request body stream is acceptable in Node runtimes
      duplex: methodHasBody(req.method) ? 'half' : undefined,
    };

    const webReq = new Request(fullUrl, init);
    const response = await subscribeHandle(webReq);

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Send as text to avoid Node Buffer typings; sufficient for JSON/text responses
    const bodyText = await response.text();
    res.send(bodyText);
    return;
  }

  // Fallback
  return subscribeHandle(req as Request);
}