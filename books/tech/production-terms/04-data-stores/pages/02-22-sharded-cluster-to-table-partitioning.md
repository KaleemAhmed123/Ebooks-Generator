## Sharded Cluster

Horizontal scaling through a shard key. Choosing that key badly is close to
unfixable, which makes it the decision to get right before any others.

Sharding by a monotonic `ObjectId` sends every insert to the highest chunk. One
shard takes all the writes while the rest idle, and adding shards does not help
because the key still points at the newest one.

A hashed or compound key distributes properly. The trade is that hashed keys
make range queries a scatter-gather across every shard.

**Resharding a live cluster is a project, not a task.** That asymmetry — cheap
to choose, expensive to change — is why this belongs on a whiteboard before it
belongs in a config.

## Table Partitioning

Splitting one logical table into physical children by range or list, so the
planner skips irrelevant partitions and old data can be dropped instantly.

Events partitioned by month: "last seven days" scans one partition instead of
400 million rows.

The bigger win is retention. Archiving becomes
`DROP TABLE events_2024_01` — instant, no bloat, no lock held for hours. The
same cleanup as a `DELETE` over a date range takes hours and leaves the table
larger than it started.

**Partition on the column you filter by**, not the one that feels natural. A
partition key the query planner cannot use gives you all the operational
complexity and none of the pruning.
