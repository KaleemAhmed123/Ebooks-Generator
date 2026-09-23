## Read-through and write-through

- In cache-aside the application talks to both stores. In read-through and write-through it talks only to the cache, and the cache owns the database behind it. The pattern moves the code, and with it the failure modes

| | Cache-aside | Read-through | Write-through |
|---|---|---|---|
| Who reads the database | the application | the cache | — |
| Who writes it | the application | — | the cache, before acknowledging |
| Cache down means | a slow request | a failed request | a failed write |
| Fills with | data somebody read | data somebody read | data somebody wrote |
| Needs | nothing | a cache that can load | a cache that can write |

- The "cache down means" row is the decision. Cache-aside degrades to slow; the through patterns degrade to broken, because the cache is now on the only path to the data. That is a real dependency, and it needs the treatment any dependency gets in Module 4
- Write-through buys one thing worth having: the cache is never stale by construction, because no write reaches the database without passing through it. That removes the invalidation problem (page 6) entirely, at the cost of putting the cache in the write path

### The failure

- Write-through on data with a low read rate. Every write now pays a cache write plus a database write and waits for both, and for click events, sensor readings or audit rows — written constantly, read almost never — the cache fills with entries nobody will request and evicts the entries somebody would have
- The pattern is worse than useless there: it adds write latency in order to degrade the hit rate. Write-through pays off when the write-to-read ratio is low and reads must never be stale; cache-aside is the default everywhere else
