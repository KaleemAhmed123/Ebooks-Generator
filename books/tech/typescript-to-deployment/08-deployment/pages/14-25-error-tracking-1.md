## Error tracking

- Logs record that an error happened. **An error tracker groups every occurrence of the same error, keeps the stack trace and the context, and tells you when it started**
- It answers a different question from logs: **not "what happened to this request" but "which bug is hurting the most people"**

```bash
npm i @sentry/node
```

```ts
// instrument.ts, imported first
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.GIT_SHA,          // which deploy introduced it
  tracesSampleRate: 0.1,
  beforeSend(event) {
    delete event.request?.cookies
    if (event.request?.headers) delete event.request.headers.authorization
    return event
  },
})
```

```ts
Sentry.setUser({ id: req.user.id })       // never the email
Sentry.setTag("tenant", req.tenantId)
Sentry.setContext("order", { id: order.id, status: order.status })
```

### The three fields that make it useful

- **`release`.** "This error started with `abc123`" is the answer most of the time, and it needs the commit on every event
- **Tags for tenant and route**, so "is this one customer" is one filter away
- **`beforeSend` redaction.** A stack trace can carry a request body, and a request body can carry a password
