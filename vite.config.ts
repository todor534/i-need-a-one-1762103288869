import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function apiDevMiddleware(): Plugin {
  return {
    name: 'api-dev-middleware',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        try {
          const url = req.url || '/'
          if (!url.startsWith('/api/')) return next()

          const fullUrl = new URL(url, 'http://localhost')
          const name = fullUrl.pathname.replace(/^\/api\//, '').split('/')[0]
          if (!name) return next()

          // Load the server handler via Vite to support TS during dev
          const mod = await server.ssrLoadModule(`/server/handlers/${name}.ts`)
          const handle = mod?.handle as (req: Request) => Promise<Response>
          if (typeof handle !== 'function') {
            res.statusCode = 404
            res.end('Not found')
            return
          }

          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) {
            if (v === undefined) continue
            if (Array.isArray(v)) headers.append(k, v.join(', '))
            else headers.set(k, v)
          }

          const body =
            req.method && ['GET', 'HEAD'].includes(req.method) ? undefined : await readNodeRequestBody(req)

          const request = new Request(fullUrl.toString(), {
            method: req.method,
            headers,
            body: body as any,
          })

          const resp = await handle(request)

          res.statusCode = resp.status
          resp.headers.forEach((value, key) => {
            res.setHeader(key, value)
          })

          // Stream or buffer the response body
          if (!resp.body) {
            res.end()
            return
          }

          // Node doesn't understand Web ReadableStream directly; buffer it
          const buf = Buffer.from(await resp.arrayBuffer())
          res.end(buf)
        } catch (err: any) {
          server.ssrFixStacktrace?.(err)
          next(err)
        }
      })
    },
  }
}

async function readNodeRequestBody(req: import('http').IncomingMessage): Promise<Buffer | undefined> {
  return await new Promise<Buffer | undefined>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
    req.on('end', () => {
      if (chunks.length === 0) return resolve(undefined)
      resolve(Buffer.concat(chunks))
    })
    req.on('error', (e) => reject(e))
  })
}

export default defineConfig({
  plugins: [react(), apiDevMiddleware()],
  server: {
    port: 5173,
  },
  preview: {
    port: 5173,
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime'],
  },
})