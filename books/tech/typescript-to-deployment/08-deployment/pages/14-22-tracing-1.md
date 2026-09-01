## Tracing

- A request touches the ALB, the API, the database, Redis, a queue and a third-party call. **A log line from each does not show where the two seconds went**
- A **trace** is one request as a tree of timed spans across every service it touched
- It is the only signal that answers "which part was slow" without guessing

```bash
npm i @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
```

```ts
// tracing.ts, imported before anything else
import { NodeSDK } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"

new NodeSDK({
  serviceName: "orders-api",
  instrumentations: [getNodeAutoInstrumentations()],
}).start()
```

```bash
node --import ./tracing.js dist/index.js
```

- **It must load first**, because instrumentation patches libraries as they are imported. Booklet 4 covers the mechanism
- Auto-instrumentation covers HTTP, Express, Postgres, Redis and the AWS SDK with no code changes at all
