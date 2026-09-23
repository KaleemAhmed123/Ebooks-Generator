## Glossary: L–M

| Term | Means | Where |
|---|---|---|
| **lost update** | two read-modify-write cycles racing, so one write silently disappears | 3 · 2-01 |
| **LSM tree** | a storage engine that never updates a page in place: writes land in memory, flush to immutable sorted files, and merge in the background | 2 · 2-06 |
| **MapReduce** | a map function producing intermediate key-value pairs, and a reduce function merging all the values for one key | 4 · 13-01 |
| **materializing conflicts** | making an invariant a row, so it becomes something a lock can be taken on | 3 · 2-10 |
| **memtable** | the sorted in-memory structure an LSM write lands in before it is flushed to disk | 2 · 2-06 |
| **Merkle tree** | a hash tree whose leaves hash blocks of keys, so two replicas compare roots and descend only where they differ | 2 · 7-04 |
| **message broker** | a server that stores messages from producers and hands them to consumers | 4 · 1-01 |
| **metric** | a number sampled over time, cheap per point and cheap to query, carrying no ids | 6 · 15-06 |
| **microservice** | a process that can be deployed on its own, owns its data, and talks to the others over a network | 5 · 1-03 |
| **modular monolith** | one process whose modules each expose a small public API, own their tables, and may not reach into each other's | 5 · 1-02 |
| **monotonic clock** | a counter since an arbitrary point, meaningless across machines and guaranteed never to go backwards. The one to measure a duration with | 3 · 9-01 |
| **monotonic reads** | a client that has seen a value never sees an older one afterwards | 2 · 5-10 |
| **monotonic writes** | your writes apply everywhere in the order you issued them | 3 · 5-08 |
