## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| surge | supply and demand counted per H3 cell every few seconds; the multiplier is a property of the cell, at a coarser resolution than matching, on the same grid. Uber's H3 post names surge as a reason the grid exists |
| ETA for ranking candidates | not the routing engine per candidate: rank the k nearest by a cheap estimate, straight-line or a cached travel-time grid, then call routing once for the driver actually offered |
| a concert ends: 50 000 requests from one cell | that cell's shard is the hot key (booklet 02; Module 3, page 4): split it at a finer resolution, spread the index by sub-cell, and let matching read across the rings. The trip store is not hot; the index is |
| match strictly or fast? | consistent for the offer (page 5), best-effort for the index: a match against a 4-second-old position is fine, a double offer is not. Two stores, two consistency models, because the data differs |
| why not one database for everything | 250 000 overwrites a second of values that expire, against a few thousand transactions a second that must never be lost. One store tuned for both is tuned for neither |
| how does the driver get the offer | a push over the same held-open connection that carries positions (page 4); the accept returns on it, and the transaction (page 5) decides |

- The metric: time from request to accepted offer, p95, per city; and the fraction of offers that expire, which is the TTL and the supply's health in one number
- Cross-references the design leans on: idempotency keys and timeouts (booklet 01); sharding and the hot key (booklet 02); the transaction and its lock (booklet 03); connection registries (Module 6, page 2)

### The failure

- Sharding in the application. Uber's fulfillment post gives the number for its first design, which sharded drivers across app processes with Ringpop: hotspots, and only "20 online drivers per core", because every process owned both routing and state. The rewrite put state in a store built to shard, and the app back to being stateless
