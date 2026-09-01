## `instrumentation.ts`

- Tracing has to patch libraries as they load, which means it must run before any application code
- In a plain Node service that is `--import`, covered in Booklet 4. Next.js starts the process itself, so there is no place to put that flag
- **`instrumentation.ts`** is the hook. Next.js runs its `register` export once, before anything else, on every runtime it starts

```ts
// instrumentation.ts, at the project root
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node")
  }
}
```

```ts
// instrumentation.node.ts
import { NodeSDK } from "@opentelemetry/sdk-node"
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node"

new NodeSDK({
  serviceName: "storefront",
  instrumentations: [getNodeAutoInstrumentations()],
}).start()
```

- The runtime check matters. The Edge runtime has no `fs` and no TCP, so a Node-only SDK will crash it

### Catching server-side errors

```ts
export function onRequestError(err, request, context) {
  Sentry.captureException(err, { extra: { path: request.path, ...context } })
}
```

- `onRequestError` is called for every server-side error, in any runtime, from any part of the app
- Without it, errors in a Server Component or a Route Handler reach the logs and nothing else
