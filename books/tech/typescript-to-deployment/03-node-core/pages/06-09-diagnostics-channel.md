## `diagnostics_channel`

- Instrumenting a library normally means monkey-patching it, which breaks on the next version and is why tracing setups are fragile
- **`diagnostics_channel`** is a built-in publish and subscribe bus for exactly this, so a library can emit events and a tool can listen without either knowing about the other
- Publishing costs almost nothing when nobody is subscribed, which is what makes it safe to leave in production code
- Node itself publishes on it, so HTTP requests, DNS lookups and network events can be observed with no patching at all

```js
import diagnostics_channel from "node:diagnostics_channel"

const channel = diagnostics_channel.channel("orders:created")

// in your code
if (channel.hasSubscribers) channel.publish({ orderId, sellerId })

// anywhere else, including a separate module
diagnostics_channel.subscribe("orders:created", (message) => {
  metrics.ordersCreated.inc({ seller: message.sellerId })
})
```

### Listening to Node itself

```js
diagnostics_channel.subscribe("http.client.request.start", ({ request }) => {
  logger.debug({ host: request.host, path: request.path }, "outbound")
})
```

### Where it earns its place

- Emitting domain events for metrics without importing the metrics library into business code
- Adding tracing to your own libraries so consumers can observe them without patching
- Debugging in production by attaching a subscriber, since the publish points are already there
- It is how `undici` and several Node internals expose their behavior, and it is the reason those can be traced at all
