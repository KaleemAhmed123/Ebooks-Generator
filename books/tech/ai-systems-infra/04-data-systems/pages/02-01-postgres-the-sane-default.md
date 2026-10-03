# Relational Done Right

## Postgres, the sane default

- The most useful default in data infrastructure: **reach for PostgreSQL first, and make something else prove it's needed.** Postgres gives you full ACID transactions, SQL with real joins and constraints, strong consistency on one node, and a feature set that quietly absorbs needs people reach for separate systems to meet: **JSONB** (document storage with indexing), **full-text search**, **arrays/ranges**, geospatial (**PostGIS**), and even vector similarity (**pgvector**) for AI retrieval. One well-run Postgres often replaces three half-run specialty stores.
- It scales further than its "boring SQL database" reputation suggests. **Vertically** it rides modern hardware a long way — Postgres 18 (Sept 2025) added an **asynchronous I/O** subsystem that markedly speeds large reads. **Read-heavy**? Add read replicas (Module 2.5). The ceiling is **single-node write throughput**: all writes still go through one primary.
- So the honest "when *not* Postgres" list is short and specific:
  - **Write volume beyond one node** — ingest that outruns a single primary's write path → a partitioned/LSM store (Module 3).
  - **A fixed, simple access pattern at massive scale** — pure key-value or wide-column lookups where a relational engine's generality is dead weight.
  - **A genuinely different shape** — a cache (Module 4), a log/stream (Module 5), or a coordination store (Module 6).

:::note
The anti-pattern this fights is **premature NoSQL**: choosing a specialised store for its scaling story before you've hit the scale, and paying immediately in lost joins, lost transactions, and hand-rolled consistency (Booklet 3's hard problems, now yours to solve). The senior move is to **start relational, measure, and migrate the one workload that actually outgrows it** — not to assume you're Google on day one. Most systems never leave Postgres, and that's a feature.
:::
