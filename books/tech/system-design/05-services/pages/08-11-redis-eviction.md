## Cache eviction

- What happens when Redis runs out of memory? By default, nothing. The `maxmemory-policy` is set to `noeviction`. When the RAM is full, any new write command will fail with an OOM (Out of Memory) error
- If you are using Redis as a database (where data must survive), `noeviction` is correct. If you are using Redis as a cache, you want it to automatically delete old data to make room for new data. This is called Eviction

| Policy | How it works | When to use it |
|---|---|---|
| **`allkeys-lru`** | Evicts the Least Recently Used (oldest accessed) key out of all keys. | **Default choice for a cache.** Keeps popular data. |
| **`allkeys-lfu`** | Evicts the Least Frequently Used key out of all keys. | Better than LRU if you have clear "hot" and "cold" data. |
| **`volatile-lru`** | Evicts the LRU key, but only among keys that have a TTL set. | When you mix permanent DB data and temporary cache data in the same Redis instance (not recommended). |

- Redis does not perfectly sort all millions of keys to find the exact oldest one. That would waste CPU. It uses approximated LRU: it samples 5 random keys and evicts the oldest of those 5. This is fast and "good enough"

### The failure

- The failure is using `volatile-lru` on a cache where the developers forgot to set a TTL on the keys. If no keys have a TTL, `volatile-lru` behaves exactly like `noeviction`. The cache will fill up and crash
- If you are deploying a dedicated Redis instance solely for caching, always use an `allkeys-*` policy so you are protected from memory exhaustion even if someone forgets to set an expiry
