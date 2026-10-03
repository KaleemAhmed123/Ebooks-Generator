## Invalidation and the stampede

- "There are only two hard things in computer science: cache invalidation and naming things." **Invalidation** — keeping the cached copy in step with a source that changes — is hard because it's a distributed-consistency problem in disguise (Booklet 3). Three approaches, increasingly precise and increasingly fiddly:
  - **TTL expiry** — let entries go stale and refetch after N seconds. Dead simple, no write-path coupling, but you accept a staleness window and a thundering refetch when popular keys expire.
  - **Explicit invalidation** — delete/update the cache entry when the source changes. Precise, but now every writer must know every cache key it affects, and a missed path serves stale data forever.
  - **Versioned keys** — embed a version in the key (`user:123:v7`); a write bumps the version, so old entries are simply never read again (and age out). Sidesteps deletion races at the cost of key churn.

:::warn
**Cache stampede (dogpile / thundering herd).** A hot key expires; in the next instant **thousands of concurrent requests all miss**, and all of them hit the database at once to recompute the same value — the database buckles under a load spike that the cache existed precisely to prevent. It's worst for expensive-to-compute hot keys. Three fixes: **single-flight / lock** — the first miss acquires a lock and loads; the rest **wait for that one result** instead of all loading. **Probabilistic early expiration** — refresh a key slightly *before* its TTL, at random, so one request renews it while others still get the cached value. **Stale-while-revalidate** — serve the stale value instantly and refresh in the background. All three share one idea: **never let N concurrent misses become N concurrent loads.**
:::

### Module 4 — checkpoint
- **Key concepts:** Redis as a data-structure server (rate limiter, leaderboard, queue, streams, locks) + persistence (RDB/AOF) + Redis-8-AGPL/Valkey-BSD · cache-aside vs write-through/back/read-through · TTL + eviction (LRU/LFU, set `maxmemory`) · invalidation (TTL/explicit/versioned) · **stampede** and single-flight/early-expiry/stale-while-revalidate.
- **Task + questions:** design the cache for a product page (pattern, TTL, invalidation on price change); then explain how a stampede happens and the single-flight fix.
- **Next:** Module 5 — messaging and streaming.
