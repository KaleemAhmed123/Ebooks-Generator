# Caching

## Redis as more than a cache

- **Redis** is an **in-memory data-structure server**, and "cache" is only its most famous job. Everything lives in RAM, commands execute **one at a time** on a single thread (so each command is atomic — no locking needed), and latency is sub-millisecond. What makes it more than a key-value cache is the **data types**, each enabling a pattern you'd otherwise build badly yourself:
  - **Strings + `INCR` + `EXPIRE`** → a **rate limiter** (count per window, auto-expire).
  - **Sorted sets** → a **leaderboard** or a time-ordered index (score = timestamp), with ranked range queries.
  - **Hashes** → compact objects; **Lists** → simple queues; **Streams** → an append-log with consumer groups (a lightweight Kafka-like, Module 5).
  - **Sets** → membership/dedup; **HyperLogLog** → approximate unique counts in tiny space; **Pub/Sub** → fan-out messaging.
  - A lock (with the **fencing** caveat from Booklet 3 — a Redis TTL lock alone is not safe).
- Persistence is optional because Redis is memory-first: **RDB** (periodic snapshots) and **AOF** (append-only command log) give tunable durability, but you accept that a crash can lose the last window. Treat it as a fast, rebuildable tier, not your system of record.

:::note
Licensing, since it's a real 2026 decision (like Terraform/OpenTofu). Redis went **source-available** (RSALv2/SSPL) in 2024, then **returned to open source under AGPLv3 with Redis 8** (May 2025; current line 8.8). The Linux Foundation forked the last BSD version as **Valkey**, which is wire-compatible, permissively **BSD**-licensed, and now the **default in-memory engine on AWS ElastiCache**. For a new deployment: Redis 8+ (AGPL, copyleft) or Valkey (BSD, permissive) are both open and compatible — pick on licence stance and your managed provider's default, not on features, which are near-identical.
:::
