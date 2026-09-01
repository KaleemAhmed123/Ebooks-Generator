## Prometheus and Grafana

- CloudWatch is billed per metric and per query, and its dashboards are limited. **Prometheus and Grafana are the open alternative**, and they are what most teams use for application metrics
- **Prometheus pulls.** It scrapes a `/metrics` endpoint on each instance every few seconds, rather than receiving pushed data

```bash
npm i prom-client
```

```ts
import { register, Counter, Histogram, collectDefaultMetrics } from "prom-client"

collectDefaultMetrics()      // event loop lag, heap, GC, handles

const requests = new Counter({
  name: "http_requests_total",
  help: "requests",
  labelNames: ["method", "route", "status"],
})

const duration = new Histogram({
  name: "http_request_duration_seconds",
  help: "latency",
  labelNames: ["method", "route"],
  buckets: [0.01, 0.05, 0.1, 0.3, 1, 3, 10],
})

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType)
  res.end(await register.metrics())
})
```

- **`collectDefaultMetrics` gives event loop lag for free**, which is the single most useful Node metric there is
- A histogram is what makes `p95` and `p99` possible. **A gauge or an average cannot produce a percentile**
