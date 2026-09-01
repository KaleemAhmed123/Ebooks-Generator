## Metrics with prom-client

- Logs answer what happened to one request. They cannot answer whether the service is slower than it was last week
- Counting log lines to find out is expensive and approximate, because logs are text and there are millions of them
- A **metric** is a number the process keeps in memory and updates as it runs, with almost no cost per update
- Something scrapes those numbers every few seconds and stores them as a time series, which is a value with a timestamp
- **Prometheus** is the scraper most teams use. Your service exposes a `/metrics` endpoint and Prometheus reads it on a schedule
- That pull model means the service does not need to know where Prometheus is, or care if it is down
- **Labels** turn one metric into many, so request duration can be broken down by route and status code
- Labels are also the thing that takes the system down. Each unique combination is its own time series, so a label holding an order id creates one per order
- `prom-client` is the official Node library. Version 15.1.3

```bash
npm i prom-client
```

```ts
import { Registry, collectDefaultMetrics, Histogram, Counter } from "prom-client"

export const registry = new Registry()
collectDefaultMetrics({ register: registry })

export const httpDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "request duration",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.3, 1, 3, 10],
  registers: [registry],
})
