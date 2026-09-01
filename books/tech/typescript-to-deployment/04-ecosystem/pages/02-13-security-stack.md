## The security middleware stack

- Each of these closes one class of attack, and they are cheap enough that leaving them out is never the right call

```js
import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import mongoSanitize from "express-mongo-sanitize"
import hpp from "hpp"

app.disable("x-powered-by")
app.use(helmet())
app.use(cors({ origin: env.ALLOWED_ORIGINS, credentials: true }))
app.use(express.json({ limit: "1mb" }))
app.use(mongoSanitize())
app.use(hpp())
app.use(rateLimit({ windowMs: 60_000, limit: 100 }))
```

| Middleware | What it stops |
|---|---|
| `helmet` | clickjacking, MIME sniffing, referrer leaks, missing HSTS |
| `cors` | other origins reading your responses in a browser |
| `express-mongo-sanitize` | `{ "$gt": "" }` in a body turning into a query operator |
| `hpp` | `?id=1&id=2` arriving as an array where code expects a string |
| `express-rate-limit` | brute force and scraping |
| `app.disable("x-powered-by")` | advertising the framework and version |

### Order is not decorative

- `helmet` first, so headers are set even on a response that fails later
- Sanitizers **after** the body parser, since there is nothing to sanitize before it
- Rate limiting before expensive work, not after
