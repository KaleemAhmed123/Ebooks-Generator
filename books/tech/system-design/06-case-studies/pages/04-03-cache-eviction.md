## Eviction

- Memory is fixed; keys are not. When a node is full, a write must evict something, and the policy decides the hit ratio more than any other setting. Redis names the choices in `maxmemory-policy`

| Policy | Evicts | Right when |
| :--- | :--- | :--- |
| `allkeys-lru` | the least recently used key, any key | access has temporal locality: what was read just now will be read again soon. The default choice for a cache |
| `allkeys-lfu` | the least frequently used, with a decaying count | a long tail of keys read once must not push out keys read a thousand times; a viral item ages out as its count decays |
| `volatile-lru` / `volatile-ttl` | only keys that have a TTL; `ttl` picks the soonest to expire | the same node holds cache keys with TTLs and a few keys that must stay |
| `allkeys-random` | any key | access is uniform, so tracking recency buys nothing |
| `noeviction` | nothing: writes return an error at the memory line | never for a cache; only when Redis is the primary store and losing a key is worse than refusing a write |

- Redis does not keep an exact LRU list; it samples. On each eviction it picks `maxmemory-samples` keys, 5 by default, and evicts the best candidate among them. The paper-exact linked list would cost a pointer pair per key and a lock on every read; a 5-sample approximation is close in hit ratio and costs nothing on the read path. Raising the sample to 10 makes it closer at some CPU
- LFU (Redis 4.0 and later) keeps a probabilistic counter that grows logarithmically, so a small field records millions of hits, and decays it on a timer, one minute by default, so yesterday's hot key does not hold its seat
- Two more limits are set alongside the policy: `maxmemory` itself, which on 64-bit builds defaults to 0, meaning no limit at all, and the TTL on each key, which is the eviction that happens without pressure

### The failure

- Defaults. `maxmemory` unset means the node grows until the operating system kills it; `maxmemory` set with `noeviction` left in place means the cache fills and then every write is an error. Either way the cache behaved as configured, and nobody configured it
