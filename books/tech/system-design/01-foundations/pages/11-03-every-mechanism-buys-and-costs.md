## Every mechanism buys and costs

- Every mechanism in this series is a purchase. The ledger below is the price list

| Mechanism | It buys | It costs |
|---|---|---|
| **Replication** | Availability (survive node death) | Consistency lag, write latency |
| **Partitioning/Sharding** | Write throughput, storage size | Routing complexity, cross-shard queries |
| **Caching** | Read latency, read throughput | Staleness, cache invalidation bugs |
| **Async Queues** | Decoupling, burst absorption | End-to-end latency, operational complexity |
| **Retries** | Transient resilience | Retry storms, duplicate processing |
| **Timeouts** | Bounding concurrency limits | Cancelling work that would have succeeded |

### The failure

- "We'll add a cache to make it faster" without an invalidation plan. The cache buys speed, but costs staleness. If the business requires strict consistency, a cache is the wrong mechanism

:::interview
"Should we use a queue here?" — State the trade-off. "A queue decouples the services and absorbs spikes, but it introduces eventual consistency. If the user expects to see their update immediately, we should do it synchronously instead."
:::
