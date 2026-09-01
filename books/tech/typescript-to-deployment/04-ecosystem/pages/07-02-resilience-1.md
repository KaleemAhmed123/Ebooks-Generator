## Retries, limits and circuit breakers

- A network call has three failure modes and each needs a different response
- It can fail once for no reason, from a dropped packet or a restarting instance. Trying again fixes it
- It can fail because the request itself is wrong. Trying again just wastes the attempt and the upstream's capacity
- Or the service can be genuinely down, in which case every call waits for a timeout before failing, and your threads pile up behind it
- The last one is the dangerous one. A slow dependency turns into your outage, which is a **cascading failure**
- Three patterns cover all three, and they compose rather than compete
- **Retry with backoff** handles the transient failure, waiting longer between attempts so you do not add load to something already struggling
- **Concurrency limiting** stops you opening ten thousand connections at once because a loop said so
- A **circuit breaker** watches the failure rate and, once it crosses a threshold, fails instantly for a while instead of waiting on a service you already know is down

### p-retry 8.0.0, for a transient failure

```ts
import pRetry, { AbortError } from "p-retry"

const shipment = await pRetry(
  async () => {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) })
    if (res.status === 400) throw new AbortError("bad request")   // never retry
    if (!res.ok) throw new Error(`http ${res.status}`)
    return res.json()
  },
  { retries: 3, minTimeout: 500, factor: 2 }
)
```

- Retry a 500, a timeout or a connection reset
- Never retry a 400 or a 422. The request is wrong and repeating it wastes the budget
