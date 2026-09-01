# Module 6 - Redis in practice

## Caching, and the part people skip

- Booklet 4 covered the client. This is about the patterns, and about the one that is genuinely hard
- **Cache aside** is the standard shape: look in the cache, fall back to the database, write the answer back

```ts
const key = `seller:${id}:catalog`
const cached = await redis.get(key)
if (cached) return JSON.parse(cached)

const fresh = await db.products.findMany({ where: { sellerId: id } })
await redis.set(key, JSON.stringify(fresh), "EX", 60)
return fresh
```

### Invalidation is the hard half

- Writing to the cache is easy. Knowing when the answer stopped being true is not
- **Expiry** is the honest default. Sixty seconds of staleness is acceptable for a catalog and requires no coordination
- **Explicit deletion** on write is exact, and it means every writer must know every key that derives from what it changed
- Miss one and the stale value lives until its TTL, which is the bug that only appears for some users

### Three failures worth naming

- **Stampede.** A popular key expires and a thousand requests all miss and all hit the database at once. Fix by locking the refill so one request rebuilds it
- **Penetration.** Requests for a key that does not exist bypass the cache every time. Cache the negative answer briefly
- **Avalanche.** Everything cached at boot expires at the same second. Add jitter to the TTL
