### OpenTelemetry

- Logs and metrics say something is slow. A trace says **which call** was slow, across service boundaries

```bash
npm i @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node @opentelemetry/exporter-trace-otlp-http
```

```ts
// tracing.ts, imported before anything else
import { NodeSDK } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"

new NodeSDK({
  serviceName: "orders-api",
  traceExporter: new OTLPTraceExporter({ url: env.OTLP_URL }),
  instrumentations: [getNodeAutoInstrumentations()],
}).start()
```

```json
{ "scripts": { "start": "node --import ./dist/tracing.js dist/index.js" } }
```

- **It has to load first.** Auto-instrumentation patches `http`, `pg` and `ioredis` as they are required, so importing it late instruments nothing
- Express, Postgres, Redis and outbound HTTP are all captured with no code changes
- Vendor neutral, so the same setup exports to Jaeger, Grafana Tempo, Honeycomb or Datadog
