## Eviction

- When `maxmemory` is reached, `maxmemory-policy` decides what happens. The default is `noeviction`: writes start failing with an out-of-memory error and reads keep working. For a datastore that is correct; for a cache it is an outage

| Policy | Evicts from | Use when |
|---|---|---|
| `noeviction` (default) | nothing — writes fail | Redis is the source of truth, not a cache |
| `allkeys-lru` | every key, least recently used | the default choice for a cache |
| `allkeys-lfu` | every key, least frequently used | a stable hot set, and scans that must not evict it |
| `volatile-*` | only keys with a TTL | one instance mixes cache and permanent data |

- LRU and LFU are approximated, not exact. Redis samples `maxmemory-samples` keys — five by default — and evicts the best candidate among them, because tracking a true ordering over millions of keys would cost more than the eviction saves
- LFU is the one to reach for when a nightly scan touches every key once. Under LRU that scan is the most recent access on everything and evicts the genuinely hot set; LFU counts frequency, so a single touch does not promote a cold key

### The failure

- `volatile-lru` on an instance where nothing sets a TTL. The `volatile-*` policies consider only keys with an expiry, so with no expiring keys there are no eviction candidates, and the documented behaviour is that they "behave like `noeviction`"
- Memory fills, writes begin failing, and the configuration looks correct in the file — it names an eviction policy, and it is even a reasonable one. The failure is the interaction between a policy chosen once and a code path added later that omits an expiry. A dedicated cache instance should use `allkeys-*` for exactly this reason: it stays safe when somebody forgets, which somebody eventually will
