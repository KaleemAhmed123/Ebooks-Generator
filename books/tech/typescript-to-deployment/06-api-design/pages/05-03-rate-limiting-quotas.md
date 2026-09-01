## Rate limits and quotas

- Capacity is shared. Without a limit, one caller can consume all of it, deliberately or through a retry loop
- A **rate limit** is about the short term, protecting the service. A **quota** is about the long term, usually about billing

| Algorithm | Behavior |
|---|---|
| Fixed window | a counter per minute. Simple, and allows double the limit across a boundary |
| Sliding window | counts the last 60 seconds continuously. Accurate, slightly more work |
| Token bucket | tokens refill at a steady rate. Allows short bursts, which is usually what you want |
| Leaky bucket | requests drain at a fixed rate. Smooths traffic completely |

### Tiering by cost, not by endpoint count

```ts
app.use("/api", limiter({ windowMs: 60_000, limit: 100 }))
app.post("/auth/login", limiter({ windowMs: 900_000, limit: 5, key: (r) => r.body.email }))
app.post("/reports", limiter({ windowMs: 3600_000, limit: 10 }))
```

- Cheap reads get a generous limit. Login gets a strict one keyed on the account, not the IP. Expensive work gets its own budget

### Telling the caller

```http
HTTP/1.1 429 Too Many Requests
RateLimit: limit=100, remaining=0, reset=42
Retry-After: 42
```

- A well-behaved client backs off if you tell it how long. Without a header it retries immediately and makes it worse
- **The counter must be shared** across instances, or three replicas triple the limit
