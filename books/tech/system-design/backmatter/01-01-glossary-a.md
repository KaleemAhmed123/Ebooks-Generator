## Glossary: A

| Term | Means | Where |
|---|---|---|
| **access pattern** | how the data is read: by id, by range scan, or by traversal. The question that picks the store | 2 · 1-01 |
| **ACID** | the four promises a transaction makes — atomicity, consistency, isolation, durability — which are four separate guarantees, not one switch | 3 · 1-01 |
| **adaptive bitrate (ABR)** | serving video as a manifest plus small segments in several renditions, so the player picks a quality per segment from the bandwidth it just measured | 6 · 9-04 |
| **advisory lock** | a lock on an application-chosen number rather than a row, for guarding things that are not rows | 3 · 3-09 |
| **agreement** | the consensus safety property: no two nodes decide different values | 3 · 7-01 |
| **alerting** | evaluating rules on a schedule against the freshest window, firing when a condition has held for a duration | 6 · 15-05 |
| **allowed lateness** | the grace period after the watermark during which a late record still updates its window | 4 · 12-05 |
| **Amdahl's law** | the serial fraction of a job caps its speedup, however many processors are added | 1 · 3-05 |
| **amplification** | the ratio of physical work to logical work — in writes, in reads, or in space | 2 · 2-10 |
| **anti-entropy** | a background process comparing whole replicas, usually by **Merkle tree**, and repairing what differs | 2 · 7-04 |
| **anycast** | announcing one address from many locations and letting internet routing choose, so failover is a routing change rather than a cache expiry | 5 · 7-09 |
| **AOF (append-only file)** | Redis persistence that appends every write command to a log and replays it on restart | 2 · 2-11 |
| **API composition** | answering a query by calling several services and stitching the result in the caller | 5 · 2-05 |
