## Rate limiting

- A limiter exists to keep one client from consuming the capacity everyone shares
- Version 8.7.0 of `express-rate-limit`, plus a store when you run more than one instance

```js
import rateLimit from "express-rate-limit"
import { RedisStore } from "rate-limit-redis"

const limiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  store: new RedisStore({ sendCommand: (...args) => redis.call(...args) }),
})
```

- **In-memory counters are per process.** Three replicas turn a 100 request limit into 300
- `standardHeaders: "draft-7"` sends `RateLimit` and `RateLimit-Policy` so clients can back off politely
