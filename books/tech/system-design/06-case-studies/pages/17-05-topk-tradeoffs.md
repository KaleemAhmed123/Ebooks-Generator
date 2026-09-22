## What the interviewer probes

| Probe | The answer that holds |
| :--- | :--- |
| ties | a secondary key, and the same one everywhere: Redis orders equal scores by member lexicographically (page 2), so the merger and the batch sort by (count desc, id asc) too, and every replica shows the same board |
| "trending", not "most" | decay instead of windows: each event adds a weight that shrinks with age, `weight = 2^(−age / half-life)`, so a board over the last hour with a 10-minute half-life ranks what is rising. A sketch cannot decay, so decay is for the exact structure (page 2) or applied at merge time to minute boards (page 4) |
| sharding | by item id, so an item's count lives in one place and the cross-partition merge is exact (page 4); by random key only for a hot item, which is then summed as partials (Module 16, page 6). Booklet 02 owns the partition choice |
| exact for the day | a batch over the raw log (booklet 04): a hash map per day fits a batch job that does not fit a stream, and it replaces the merged day board when it lands (page 4) |
| a view counted twice | not this module's job: views are events, deduped where they are counted (Module 16, page 4); the sketch counts what it is given, and a retry that reaches it is a view |
| K changes | the heap is sized at K, so a bigger K needs a new window; keep K generous, 1 000 in the heap for a board of 100, and cut at read time |

- The metric: the difference between the stream's day board and the batch's exact one, which is the sketch and the time merge measured against the truth every night; and the delay from an event to its appearance on the minute board
- Cross-references the design leans on: partitioning and the raw log (booklet 04); hot keys and partition choice (booklet 02); counting an event exactly once (Module 16); the view events' source (Module 9, page 6)

### The failure

- Promising exact top-K over a sharded stream. Exact needs every count in one place, and a stream across partitions and windows has them in many; the honest design names the error on each board and pays for exactness once a day in a batch. An interviewer who hears "exact" and "sharded stream" in one sentence has found the gap
