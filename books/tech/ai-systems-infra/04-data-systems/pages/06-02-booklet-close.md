## Booklet 4 — what you can now do

- **Reason about any datastore from its engine**: B-tree (read/range, write-amp) vs LSM (write-throughput, read/space-amp), the WAL behind durability, replication, and CDC — so a new database is just a known set of trade-offs, not a mystery.
- **Run Postgres well**: MVCC and the long-transaction/bloat trap, indexes and the planner (`EXPLAIN ANALYZE`), the right isolation level (and the write-skew fix), WAL replication, and why to pool connections.
- **Place the NoSQL stores**: DynamoDB (key-only, single-table, hot partitions), Cassandra (leaderless LSM, tunable consistency, query-first), MongoDB (documents, embed-vs-reference) — and run the **5-question selection framework** instead of chasing hype.
- **Cache safely**: Redis/Valkey as a data-structure server, cache-aside and the write patterns, TTL/eviction, and defeating the **stampede** with single-flight.
- **Choose a queue vs a log**: RabbitMQ (ack/DLQ/routing, work distribution) vs Kafka (partitions, offsets, consumer groups, replay, compaction), the exactly-once boundary, and the two misuse anti-patterns.
- **Know the coordination store**: etcd/Raft for the small, consistent, watched state a cluster agrees on.

<svg viewBox="0 0 360 58" role="img" aria-label="The arc: storage engines, Postgres, NoSQL, caching, messaging, coordination" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="6" y="20" width="54" height="16" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="33" y="31" text-anchor="middle">engines</text>
  <rect x="66" y="20" width="54" height="16" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="93" y="31" text-anchor="middle">Postgres</text>
  <rect x="126" y="20" width="54" height="16" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="153" y="31" text-anchor="middle">NoSQL</text>
  <rect x="186" y="20" width="48" height="16" rx="2" fill="#ece4f3" stroke="#6a4c93"/><text x="210" y="31" text-anchor="middle">caching</text>
  <rect x="240" y="20" width="60" height="16" rx="2" fill="#f1ecf6" stroke="#6a4c93"/><text x="270" y="31" text-anchor="middle">queue/log</text>
  <rect x="306" y="20" width="48" height="16" rx="2" fill="#dfe9d9" stroke="#2f7d4f"/><text x="330" y="31" text-anchor="middle">etcd</text>
</svg>

- **Next booklet:** *AWS — Operating a Cloud for Real Systems* — where these databases, caches, queues, and coordination stores become managed services (RDS, DynamoDB, ElastiCache, SQS/Kafka, etc.) inside a VPC, with IAM, networking, and a cost model you can defend.
