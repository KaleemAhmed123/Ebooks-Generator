## Rate limits and queues

- Provider limits come in two units, and the token limit is almost always the one that bites first
- A burst of traffic that a normal API absorbs will get `429` from a model provider, because the limit is measured in work rather than in calls

### Two directions to protect

- **Inbound**: your users against your service. A per-user limit on AI endpoints, separate from and lower than your normal API limit
- **Outbound**: your service against the provider. A concurrency cap so a spike queues instead of failing

```ts
import pLimit from "p-limit"

const limit = pLimit(8)   // never more than 8 in flight
const results = await Promise.all(items.map((i) => limit(() => classify(i))))
```

### The shape that actually holds up

- **Interactive requests go straight through**, with a low concurrency cap and a fast failure
- **Everything else goes on a queue**, as Booklet 5 describes, with a worker concurrency you can turn down during an incident
- **Bulk work goes to the Batch API**, at half price and no rate limit pressure at all

### Handling the `429`

- Respond to the retry-after header when there is one, rather than to your own guess
- Retry with exponential backoff **and jitter**, or every worker retries in the same instant and the spike repeats
- **A user-facing request should fail fast rather than retry for thirty seconds.** Queue the work and tell them it is coming
- Track the remaining-tokens header as a metric. It is the earliest warning that a limit increase is needed
