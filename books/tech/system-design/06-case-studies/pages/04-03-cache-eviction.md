## Eviction

- A cache has fixed memory. When it fills up, it must delete old data to make room for new data. This is eviction. The choice of eviction policy changes the hit ratio dramatically
- Redis defaults to `noeviction`, meaning it returns an error on write when full. This is catastrophic for a cache. You must explicitly configure a policy like `allkeys-lru` (Least Recently Used) or `allkeys-lfu` (Least Frequently Used)
- True LRU requires a linked list, which is memory-heavy and requires a lock on every read to move the item to the head. Redis does not use true LRU. It uses sampled LRU: it picks 5 random keys and evicts the one that is oldest
- Sampled LRU is good enough. LFU (available in Redis 4.0+) uses a Morris counter to track frequency in just 8 bits, decaying the count over time so old viral content does not stay in memory forever

| Policy | How it works | When to use it |
| :--- | :--- | :--- |
| **LRU** (Least Recently Used) | Evicts the item accessed longest ago | Standard default. Good for temporal locality |
| **LFU** (Least Frequently Used) | Evicts the item with the lowest access count | Better for long-tail reads where popularity matters more than recency |
| **volatile-ttl** | Evicts items with the shortest remaining TTL | When some keys are explicitly marked as less important via short TTLs |
| **noeviction** | Errors on write when full | Never for a cache. (Only use if Redis is your primary data store) |

### The failure

- The failure mode is assuming Redis handles memory perfectly out of the box. If you do not change the default `noeviction` policy, your cache will work beautifully until it hits the memory limit, at which point it will reject all new writes
- A cache must be configured to gracefully degrade by shedding old data.

:::interview
**The approximation test**
Senior engineers know that exact algorithms are rarely used at scale. Knowing that Redis uses a 5-key random sample for LRU shows you understand how systems actually work under the hood.
:::
