## Glossary: R

| Term | Means | Where |
|---|---|---|
| **replication factor** | how many copies of the data are kept. Three in most production settings | 1 · 5-05 |
| **replication lag** | how far behind the leader a follower is. Never zero under asynchronous replication | 2 · 5-08 |
| **replication slot** | the Postgres object a CDC reader subscribes to, in order to receive every committed change from the WAL | 4 · 8-04 |
| **request coalescing** | collapsing identical in-flight requests into one | 6 · 4-04 |
| **REST** | a synchronous call style: resources at URLs, JSON bodies, HTTP verbs, and a schema only if someone writes one | 5 · 3-02 |
| **retention** | the policy deciding how long, or how many bytes, a partition keeps before its oldest segments are removed | 4 · 7-01 |
| **`Retry-After`** | the header a 429 or 503 uses to tell the client how long to wait | 1 · 9-07 |
| **retry budget** | a cap on the ratio of retries to normal traffic across a whole client | 1 · 9-06 |
| **retry storm** | a dependency kept down because every recovery attempt is crushed by the backlog of retries | 1 · 9-03 |
| **retry topic** | moving the wait out of the partition by republishing a failed record to a delayed topic | 4 · 6-01 |
| **reverse proxy** | something standing in front of the instances and doing work on the way past, as distinct from choosing between them | 5 · 7-08 |
| **rolling update** | replacing the fleet in batches, watching health checks | 5 · 5-08 |
| **round-trip time** | how long a packet takes to reach the other end and come back | 1 · 4-01 |
