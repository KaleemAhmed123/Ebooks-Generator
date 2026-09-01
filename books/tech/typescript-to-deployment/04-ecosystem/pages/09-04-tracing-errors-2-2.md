### @sentry/node 10.72.0

```ts
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: env.SENTRY_DSN,
  environment: env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend: (event) => (env.NODE_ENV === "production" ? event : null),
})

Sentry.setupExpressErrorHandler(app)
```

- Groups identical stack traces, so ten thousand occurrences are one issue with a count
- `tracesSampleRate: 1.0` in production will cost more than it returns. Sample at ten percent and raise it while debugging

### The three together

- **Logs** for detail on one request, **metrics** for trends and alerts, **traces** for where the time went
- Carry the same request id through all three or you cannot join them up
