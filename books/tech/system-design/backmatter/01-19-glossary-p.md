## Glossary: P

| Term | Means | Where |
|---|---|---|
| **partitioning** | splitting the data so each node holds a slice | 1 · 3-04 |
| **partition key** | the key deciding which partition, and therefore which replicas, a row lives on | 2 · 1-04 |
| **partition (log)** | one append-only log on one broker's disk. The unit of both parallelism and ordering | 4 · 4-01 |
| **partition pruning** | skipping the partitions a query's predicate cannot match | 2 · 3-06 |
| **percentile (p50, p99)** | the value a given fraction of requests beat. p50 is the median; p99 is what 99 % come in under | 1 · 1-06 |
| **pessimistic locking** | taking the lock before the work, and holding it until commit | 3 · 3-02 |
| **phantom read** | new rows appearing inside a transaction, matching a predicate it has already run | 3 · 2-01 |
| **physical replication** | shipping the exact block changes, which demands a byte-identical follower | 2 · 5-03 |
| **poison message** | one that fails every time it is delivered, whatever the retry policy | 4 · 6-02 |
| **prefetch** | the cap on how many unacknowledged deliveries a consumer may hold. What stops a push broker flooding it | 4 · 2-01 |
| **presence** | a heartbeat with a TTL. A key that expires means offline; a dropped connection does not | 6 · 6-05 |
| **presigned URL** | a short-lived URL granting one upload or download straight to blob storage, so the bytes never cross the API | 6 · 9-02 |
| **processing time** | when this system saw an event, as opposed to when it happened | 4 · 12-02 |
