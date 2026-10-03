## Replication and failover

- Postgres replicates by **streaming its WAL** (Module 1) to replicas that replay it — Booklet 3's leader-follower model, concretely. One **primary** takes writes; **replicas** stay current and serve reads. The same two choices apply: **asynchronous** (default — fast, but a primary crash can lose the last unshipped writes) or **synchronous** (a replica must confirm before commit — no loss, but commit latency now includes the replica, and a stalled sync replica blocks writes).
- Read replicas scale **reads**, not writes, and they carry **replication lag**, so a read right after a write can miss it (read-your-writes, Booklet 3). Route a user's immediate post-write reads to the primary, or only read from a replica caught up past your write's WAL position.
- **Failover** is the sharp edge, and it needs Booklet 3/6's lessons. If the primary dies, a replica must be **promoted** — but promoting while the old primary is merely **unreachable** gives you **two primaries** (split-brain) accepting divergent writes. Safe automatic failover therefore uses an external coordinator with **consensus**: tools like **Patroni** store cluster state in **etcd/Consul** (Raft) so exactly one node is elected primary and fencing prevents the old one from accepting writes. Don't hand-roll failover; a naive health-check-and-promote script is a split-brain generator.

:::warn
Postgres uses a **process per connection**, and each is relatively heavy (memory + fork cost). A few hundred direct connections can exhaust RAM and context-switch the box (Booklet 1), so apps that open a connection per request melt the database long before CPU is the limit. Put a **connection pooler** — **PgBouncer** (or the pooler built into your managed service) — in front, with a bounded pool (Booklet 2's sizing). "Postgres fell over at modest load" is, nine times out of ten, unpooled connections, not query cost.
:::

### Module 2 — checkpoint
- **Key concepts:** Postgres as the default (JSONB, pgvector, vertical scale; write-ceiling is one node) · MVCC + VACUUM + the long-transaction trap · indexes + the cost-based planner + `EXPLAIN ANALYZE` + over-indexing · Read Committed/Repeatable Read/Serializable(SSI) + write skew fix · WAL streaming replication, lag, consensus-based failover, connection pooling.
- **Task + questions:** run `EXPLAIN ANALYZE` on a filtered query, add the index, compare; then explain why one idle-in-transaction connection can bloat the whole database.
- **Next:** Module 3 — the NoSQL family, and when to leave Postgres.
