## Leader Election

Choosing exactly one node to coordinate, and noticing quickly when it dies.
Every "only one instance should do this" problem is this problem wearing
different clothes.

Three schedulers run and, without election, all three fire the same job. With a
lease in Redis or etcd, only the holder acts and the others stand by. When the
holder dies its lease expires, and one of the standbys takes over.

The tuning knob is the lease duration. Too long and failover is slow; too short
and a GC pause hands the lease to someone else while the original still thinks
it is in charge — which is exactly why the work behind it needs a fencing token.

## LSM Tree vs B-Tree

Two ways a storage engine can organise data on disk, and the reason one database
is good at writes and another is good at reads.

| | B-tree | LSM tree |
|---|---|---|
| Write path | update in place, random I/O | append to memory, flush sorted files |
| Read path | one lookup | may check several files |
| Best at | reads, mixed workloads | sustained write throughput |
| Ongoing cost | page splits, bloat | compaction, in the background forever |
| Used by | Postgres, MySQL InnoDB | Cassandra, RocksDB, LevelDB |

A write-heavy time-series workload on a B-tree thrashes, because every insert
lands on a different page. On an LSM the same workload is sequential — and pays
for it later, in compaction, which is work you do not schedule and cannot skip.
