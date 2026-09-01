## Request logging with pino-http

```ts
import pinoHttp from "pino-http"
import { randomUUID } from "node:crypto"

app.use(pinoHttp({
  logger,
  genReqId: (req) => req.headers["x-request-id"] ?? randomUUID(),
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return "error"
    if (res.statusCode >= 400) return "warn"
    return "info"
  },
  autoLogging: { ignore: (req) => req.url === "/healthz" },
}))

app.get("/orders/:id", (req, res) => {
  req.log.info({ orderId: req.params.id }, "fetching order")
})
```

- `req.log` is a child logger already carrying the request id, so every line from that request is linked
- One log line per request with method, path, status and duration, without writing any of it

### Pretty printing, and where not to

```json
{ "scripts": { "dev": "tsx watch src/index.ts | pino-pretty" } }
```

- **Pipe to `pino-pretty`, never configure it as a transport in production**
- Formatting costs CPU and turns queryable JSON back into text
