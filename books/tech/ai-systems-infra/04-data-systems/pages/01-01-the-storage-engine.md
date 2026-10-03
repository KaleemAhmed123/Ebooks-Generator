# How a Database Stores Bytes

## The storage engine

- Under every database — SQL or NoSQL — sits a **storage engine**: the layer that actually writes bytes to disk, reads them back, and keeps them durable through a crash. The query language, the planner, the network protocol all sit **above** it. Two databases with identical SQL can behave completely differently because their storage engines make opposite trade-offs — so "which database?" is, underneath, mostly "which storage engine, and does its trade-off match my workload?"
- Almost every engine is one of two families, and this booklet opens with them because the choice colours everything else (latency, write throughput, disk cost):
  - **B-tree** — keeps data in sorted, fixed-size pages and **updates them in place**. Read-optimised and range-friendly. The engine of **Postgres, MySQL/InnoDB**, and most relational databases.
  - **LSM-tree** (Log-Structured Merge) — **never updates in place**; it appends writes and merges them in the background. Write-optimised. The engine of **Cassandra, RocksDB, ScyllaDB, LevelDB**, and many time-series and KV stores.
- The engine is often literally **pluggable**: MySQL can run InnoDB (B-tree) or MyRocks (LSM); many systems embed **RocksDB** as their engine. So the same product can wear either trade-off.

:::note
Why an infra engineer cares, not just a DBA: the storage engine determines whether a database **loves or hates your workload**. Point a write-heavy, append-mostly workload (events, metrics, logs) at a B-tree and you fight write amplification and random I/O; point a read-heavy, range-scan workload at an LSM and you pay read amplification chasing data across files. Picking the wrong engine is a performance ceiling no amount of hardware fully buys back — which is exactly what the next four pages let you reason about.
:::
