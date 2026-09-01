## Express performance

- Framework overhead is rarely the problem, and these are the few places it genuinely is

### Set the environment

```bash
NODE_ENV=production node dist/index.js
```

- Express caches view lookups and skips verbose errors only when `NODE_ENV` is `production`
- Leaving it unset is a measurable, free loss

### Keep the middleware stack short

```js
app.use(express.json())            // runs on every request, including GETs
```

- Every `app.use` runs on every request that reaches it
- Mount expensive parsers on the routes that need them instead of globally

### Do not put slow work in a request

- Reports, exports, image processing and outbound email belong on a queue
- Booklet 3 covers why one blocking function stalls every connection, not just its own

### Cache the expensive read

```js
const cached = await redis.get(key)
if (cached) return res.json(JSON.parse(cached))
```

- A catalog query cached for sixty seconds removes most of the load from a typical storefront

### Measure before changing anything

```bash
npx autocannon -c 100 -d 30 http://localhost:3000/api/v1/orders
```

- `autocannon` 8.0.0 gives requests per second and latency percentiles
- Look at p99, not the average. The average hides the requests users complain about
