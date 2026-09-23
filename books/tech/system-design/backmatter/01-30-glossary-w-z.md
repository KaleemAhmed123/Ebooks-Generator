## Glossary: W–Z

| Term | Means | Where |
|---|---|---|
| **WebSocket** | a long-lived two-way TCP connection upgraded from HTTP, so the server can write whenever it has something | 6 · 6-02 |
| **wide-column store** | partition key plus clustering columns over an LSM tree. Every query known in advance | 2 · 9-03 |
| **write-ahead log (WAL)** | an append-only file written and flushed before the data pages change. How a database survives a crash mid-write | 2 · 2-02 |
| **write conflict** | two leaders accepting writes to the same record before either has seen the other's | 2 · 6-01 |
| **writes-follow-reads** | a write you make after reading X is ordered after X everywhere | 3 · 5-08 |
| **write sharding** | spreading one hot key across many partitions by adding a suffix | 2 · 8-11 |
| **write skew** | two transactions each reading a premise the other is about to invalidate, and both committing | 3 · 2-01 |
| **zombie fencing** | an epoch per transactional id, so a restarted producer's predecessor is rejected | 4 · 5-04 |
| **ZooKeeper** | the Zab-based coordination service holding config, membership, locks and leader election | 3 · 7-11 |
