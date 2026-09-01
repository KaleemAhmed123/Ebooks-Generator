## Service-to-service calls

- Inside the Docker network, one service reaches another by name over plain HTTP

```ts
const res = await fetch("http://catalog:8080/items/8812", {
  headers: { "x-request-id": req.id },
  signal: AbortSignal.timeout(3000),
});
```

### Four rules for every internal call

1. **A timeout, always.** `fetch` with no signal waits indefinitely, and one stuck call holds a connection until the process restarts
2. **Propagate the request ID.** Without it, a failure cannot be traced across services
3. **Retry only safe operations.** A `GET` may be retried. A `POST /payments` may not, unless it carries an idempotency key
4. **Fail with a useful status.** A downstream 500 should not become a 500 for the user without context

### Do not call through the public URL

```ts
// wrong. Leaves the box, hits Nginx, comes back, adds TLS and latency
await fetch("https://api.example.com/catalog/items/8812");

// right
await fetch("http://catalog:8080/items/8812");
```

- The public path also passes through rate limiting, so internal traffic starts consuming a limit meant for users

### When a synchronous call is the wrong shape

- Placing an order must not fail because the notification service is restarting
- Anything that can be done later, and does not change the response, belongs on the broker in page 10-09

### The circuit breaker, briefly

- After several consecutive failures, stop calling for a period and fail immediately
- Without it, twelve services all waiting three seconds on one dead dependency exhausts every connection pool at once. That is how a single failure takes down the whole stack
