### p-limit 7.3.1, for concurrency

```ts
import pLimit from "p-limit"

const limit = pLimit(5)
await Promise.all(orderIds.map((id) => limit(() => sendInvoice(id))))
```

- `Promise.all` over ten thousand ids opens ten thousand connections at once
- Five at a time finishes nearly as fast without taking the upstream down

### opossum 10.0.0, for a service that is already down

```ts
import CircuitBreaker from "opossum"

const breaker = new CircuitBreaker(createShipment, {
  timeout: 5000,
  errorThresholdPercentage: 50,
  resetTimeout: 30_000,
})

breaker.fallback(() => ({ status: "queued" }))
```

- After half the calls fail, the circuit opens and further calls fail instantly instead of waiting five seconds each
- **A fallback must not fake success.** Returning a null shipment id that the code treats as real is worse than the outage
