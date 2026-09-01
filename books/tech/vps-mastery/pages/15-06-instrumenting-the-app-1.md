## Instrumenting the application

```bash
npm install prom-client
```

```ts
import client from "prom-client";
import express from "express";

const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "request duration",
  labelNames: ["method", "route", "status"],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 3, 10],
  registers: [registry],
});

const app = express();

app.use((req, res, next) => {
  const done = httpDuration.startTimer();
  res.on("finish", () => {
    done({
      method: req.method,
      route: req.route?.path ?? "unmatched",
      status: String(res.statusCode),
    });
  });
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", registry.contentType);
  res.end(await registry.metrics());
});
```
