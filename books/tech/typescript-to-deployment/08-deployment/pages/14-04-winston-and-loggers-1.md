## Winston, pino, and choosing

- Booklet 4 introduced both. **In a deployment the choice matters for two reasons: throughput, and what shipping the logs looks like**

| | pino | Winston |
|---|---|---|
| Speed | **several times faster** | slower, more work per line |
| Output | JSON, always | anything, configurable |
| Transports | separate process, non-blocking | in-process, many built in |
| Ecosystem | smaller, focused | **large, every destination** |
| Fits | high throughput, ship via stdout | many destinations, custom formats |

### Winston, configured for production

```ts
import winston from "winston"

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  defaultMeta: { service: "orders-api", version: process.env.GIT_SHA },
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),      // otherwise an Error logs as {}
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  rejectionHandlers: [new winston.transports.Console()],
})

logger.info("request", { requestId, route: "/api/v1/orders", status: 201, durationMs: 42 })
```

- **`format.errors({ stack: true })` is not optional.** Without it, logging an `Error` object produces `{}` and the stack is lost
- **`exceptionHandlers` and `rejectionHandlers`** catch what would otherwise kill the process silently
