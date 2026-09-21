## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| replicate the cache nodes? | not for correctness, the truth is elsewhere; for load. Losing one of 32 nodes sends 3 % of reads to the database, which it absorbs. Losing a rack of 8 sends 25 %, which it may not: a replica per node turns a node loss into a failover instead of a miss storm |
| cold start | a new region or a rebooted cluster has a 0 % hit ratio and the database sees every read. Warm it before it takes traffic: replay the last hour of keys from the access log, or ramp traffic in at 5 % steps while watching the hit ratio climb |
| hot keys | one key read 200 000 times a second is one node's problem. Copy it to k nodes and pick one at random in the client (`key#0 … key#k`), or hold the hottest few hundred keys in each app server's memory with a one-second TTL |
| LRU or LFU | LRU when the recent past predicts the near future; LFU when a long tail of one-off reads would evict the small set of keys that matter (page 3). Decide from the access log, not from taste |
| memory per value | every key carries fixed per-key overhead, so tiny values are mostly overhead; small fields go into one hash, large JSON is compressed before the set, because the node count on page 1 was computed from value size |
| several regions | a cache per region with the database's write path deleting keys in every region, through pub/sub or the change stream (booklet 04); cross-region deletes are asynchronous, so the stale window is the replication lag |

- The one question under all of these: what does the database see when the cache is not there? The design must survive an empty cache, at reduced throughput or with load shedding at the edge (booklet 05), because an empty cache is what every deploy, every failover and every region launch starts with
- A cache node is never the only copy of anything. If a miss cannot be fully rebuilt from the primary store, it was not a cache; it was a database with no durability, and the interviewer will find the key that proves it

### The failure

- Rebooting the cache tier takes the site down with it. The database was sized for 1 % of reads, the cache restarts empty, and 100 % arrive. The fix is not a bigger database; it is a warm-up path and an admission limit, decided before the first restart rather than during it
