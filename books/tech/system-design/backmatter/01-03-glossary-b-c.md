## Glossary: B–C

| Term | Means | Where |
|---|---|---|
| **blast radius** | the smallest scope a bad release or an experiment can damage. Never everything | 5 · 4-11 |
| **Bloom filter** | a small bit array answering "is this key here?" with definitely-not or probably-yes, so a miss costs no disk read | 2 · 2-07 |
| **bounded context** | the boundary inside which one model and one vocabulary hold: one meaning per word, one owner per meaning | 5 · 2-01 |
| **BRIN** | a block-range index storing only the minimum and maximum per range of pages. Tiny, and useful only when physical order matches the column | 2 · 3-05 |
| **B-tree** | the sorted, page-based index that keeps only its top levels in memory. The default index in Postgres, and the table itself in InnoDB | 2 · 2-03 |
| **bulkhead** | a separate pool per dependency — threads, connections, queue slots — so one slow dependency cannot drain them all | 5 · 4-04 |
| **burn rate** | how fast an error budget is being spent. The thing worth paging on, rather than the amount left | 5 · 6-07 |
| **cache-aside** | read the cache; on a miss read the store, write the value back with a TTL, reply | 6 · 2-04 |
| **cache key** | what makes two requests "the same response". `Vary` extends it, and `Vary: Cookie` all but destroys it | 5 · 9-05 |
| **canary** | a partial, time-limited deployment of a change, evaluated against a control before the rest of the fleet gets it | 5 · 5-08 |
| **candidate** | the Raft state a follower enters when it hears no heartbeat: it increments its term and asks every node for a vote | 3 · 7-04 |
| **cardinality** | how many distinct values a field has. The ceiling on how many partitions, or how many metric series, are possible | 2 · 8-15 |
| **causal consistency** | if A could have influenced B, every client sees A before B. Unrelated operations may be seen in either order | 3 · 5-07 |
