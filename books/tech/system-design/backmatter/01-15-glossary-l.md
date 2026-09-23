## Glossary: L

| Term | Means | Where |
|---|---|---|
| **lease** | a leader's assumption that it still leads for a bounded time after its last majority heartbeat, so a read costs no round trip | 3 · 7-07 |
| **leveled compaction** | compaction into levels each about ten times the last, with no overlapping files inside a level. Cheap reads, expensive writes | 2 · 2-08 |
| **linearizable** | every operation appears to take effect at one instant between its call and its return, and those instants respect real time | 3 · 5-02 |
| **linearization point** | the instant inside a call's duration at which the system chooses to say the operation took effect | 3 · 5-02 |
| **listen-to-yourself** | a service publishing an event first and applying the change only when it consumes that event back | 4 · 8-07 |
| **Little's law** | in a stable system, the number of items in flight equals the arrival rate times the time each spends inside | 1 · 3-06 |
| **liveness** | a property promising something good eventually happens, with no bound on when | 3 · 5-10 |
| **load levelling** | a queue absorbing a burst, so the worker sees its own steady rate rather than the spike | 4 · 1-02 |
| **load shedding** | refusing work at admission, cheaply and early, so the work that is accepted finishes in time | 5 · 4-05 |
| **locality** | keeping a copy near the reader | 2 · 5-01 |
| **logical replication** | shipping row changes rather than disk blocks, so replicas may differ in version and layout | 2 · 5-03 |
| **logical shard** | a shard number carried inside the primary key, so any service holding the key knows where the row lives | 5 · 11-04 |
| **look-aside** | the cache pattern where the application reads the cache, fills it on a miss, and deletes the key on a write | 6 · 4-05 |
