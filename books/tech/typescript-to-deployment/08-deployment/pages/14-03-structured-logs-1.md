## Structured logging

- `console.log('user ' + id + ' failed')` is unqueryable. Finding every failure for one tenant means a text search and hope
- **A structured log line is JSON**, so every field is a column that can be filtered, grouped and aggregated

```ts
import pino from "pino"

export const logger = pino({
  level: env.LOG_LEVEL ?? "info",
  redact: ["req.headers.authorization", "req.headers.cookie", "*.password", "*.token"],
  base: { service: "orders-api", version: process.env.GIT_SHA },
  formatters: { level: (label) => ({ level: label }) },
})

logger.info({ requestId, tenantId, route: "/api/v1/orders", status: 201, durationMs: 42 }, "request")
```

```json
{"level":"info","time":1756...,"service":"orders-api","version":"abc123",
 "requestId":"r_9f2","tenantId":"t_42","route":"/api/v1/orders",
 "status":201,"durationMs":42,"msg":"request"}
```

### The fields every line should carry

| Field | Makes possible |
|---|---|
| `requestId` | following one request through every line |
| `traceId` | joining the log to a trace |
| `tenantId`, `userId` | "is this one customer or everyone" |
| `service` and `version` | "did this start with the last deploy" |
| `route` as a **pattern** | grouping. `/orders/:id`, never `/orders/o_842` |
