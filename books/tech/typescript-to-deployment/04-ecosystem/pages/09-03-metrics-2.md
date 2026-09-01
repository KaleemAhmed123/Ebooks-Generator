## Metrics with prom-client - continued

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", registry.contentType)
  res.end(await registry.metrics())
})
```

- `collectDefaultMetrics` gives event loop lag, heap usage, GC and open handles for free

### The three types

| Type | Goes | Use for |
|---|---|---|
| Counter | only up | requests served, jobs failed |
| Gauge | up and down | queue depth, active connections |
| Histogram | buckets | latency, payload size |

### The label rule that will save you

```ts
httpDuration.labels(req.method, req.route?.path ?? "unknown", String(res.statusCode))
```

- Use `req.route.path`, which is `/orders/:id`, not `req.path`, which is `/orders/o1`
- A label per order id creates a new time series per order and will take the metrics backend down
- Keep every label to a small, bounded set of values
