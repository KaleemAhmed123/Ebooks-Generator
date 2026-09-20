## Distributed Cache: Requirements and numbers

- The prompt "design a distributed cache" (like Memcached or Redis) tests your understanding of memory management, hashing, and concurrency. It is asked frequently at scale-obsessed companies like Google and Stripe
- The core requirements are storing key-value pairs, serving reads in under 1 millisecond, and gracefully handling eviction when memory is full. A distributed cache must also survive the loss of individual nodes
- For numbers, memory is your primary constraint. A standard cache node might have 64 GB to 128 GB of RAM. If you need to cache 2 TB of data, you need roughly 20 to 30 nodes (factoring in replication and overhead)
- The most important metric to define upfront is the target **hit ratio**. A cache with a 99% hit ratio protects the database entirely. A cache with a 40% hit ratio is just wasting memory and network hops

| Metric | Why it matters | Typical Value |
| :--- | :--- | :--- |
| **Hit Ratio** | Determines if the cache is actually useful | 80% to 99% |
| **Read Latency** | Must be significantly faster than the database | < 1 ms (p99) |
| **Item Size** | Dictates how many items fit in RAM | 100 bytes to 100 KB |
| **Node Memory** | Determines the cluster size | 64 GB to 256 GB |

### The failure

- The failure mode is designing a cache without stating a target hit ratio. If you do not know what hit ratio you are aiming for, you cannot choose an eviction policy or size the cluster
- Caching is not a generic "make it fast" button. It is a mathematical trade-off between memory cost and database load. You must defend your memory sizing using the hit ratio

:::interview
**The measurement test**
If you propose a cache, the interviewer will ask: "How do you know it is working?" If your answer is not "we monitor the hit ratio and eviction rate," you have missed the operational reality of caching.
:::
