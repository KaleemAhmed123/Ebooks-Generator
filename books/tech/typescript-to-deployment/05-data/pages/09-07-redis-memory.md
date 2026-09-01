## Redis persistence and eviction

- Redis holds everything in memory, so two questions have to be answered before production: what happens when it restarts, and what happens when memory runs out

### Persistence

| Mode | How | Loses |
|---|---|---|
| **RDB** | a point-in-time snapshot every so often | everything since the last snapshot |
| **AOF** | appends every write to a log | a second at most, depending on fsync |
| Both | snapshot plus log | very little |
| Neither | pure memory | everything on restart |

- For a **cache**, none of it matters. Losing it means a slow few minutes while it refills
- For a **queue backing store or a session store**, losing it means losing work or logging everybody out
- BullMQ jobs live in Redis, which makes persistence a real decision rather than a default

### Eviction

```
maxmemory 2gb
maxmemory-policy allkeys-lru
```

| Policy | Evicts |
|---|---|
| `noeviction` | nothing. Writes start failing. **The default** |
| `allkeys-lru` | the least recently used key. Right for a pure cache |
| `volatile-lru` | least recently used among keys that have a TTL |
| `allkeys-lfu` | least frequently used. Better when access is skewed |

- **The default is `noeviction`**, so a Redis used as a cache with no policy set eventually rejects writes instead of making room
- Use `volatile-*` when the same instance holds both cache entries and things that must not disappear
- Better still, run two instances. A cache and a job store have opposite requirements
