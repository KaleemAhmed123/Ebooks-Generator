## Bulkheads, load shedding and degradation

### Bulkheads

- Named after ship compartments. One flooded section must not sink the vessel
- One shared connection pool means a slow dependency consumes every connection, and unrelated endpoints start failing

```ts
const shippingPool = pLimit(10)    // at most 10 concurrent shipping calls
const searchPool = pLimit(20)
```

- Separate pools, separate limits, so shipping being slow cannot starve search

### Load shedding

- When a service is beyond capacity, accepting more work makes everything slower and nothing succeeds
- **Rejecting quickly is kinder than queueing indefinitely.** A fast `503` lets the caller retry elsewhere or degrade

```ts
if (queueDepth > 1000 || eventLoopDelayMs > 200) {
  return res.status(503).set("Retry-After", "5").json({ code: "overloaded" })
}
```

### Graceful degradation

- Decide in advance which features may disappear so the core keeps working

| Dependency down | Degrade to |
|---|---|
| recommendations | show the plain catalog |
| search | browse by category |
| shipping rates | a flat estimate, confirmed later |
| the payment provider | queue the order as pending |

- The pattern is to keep taking orders even when something non-essential is unavailable
- Deciding this during an incident produces the wrong answer, which is why it belongs in the design
