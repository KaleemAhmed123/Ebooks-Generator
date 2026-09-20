## Partitioning decision table

- Deciding how to partition your data is fundamentally a trade-off between range query support, write distribution, and operational complexity

| Strategy | How it routes | Hotspots | Range queries | Rebalancing |
|---|---|---|---|---|
| **Range** (Bigtable) | `key BETWEEN x AND y` | Yes (time-ordered keys funnel writes to one node) | Extremely fast (adjacent keys on disk) | Dynamic (chunks split at size limit) |
| **Hash** (Cassandra) | `hash(key) -> token` | No (hashes distribute evenly) | Impossible (scatter-gather across all nodes) | Vnodes (tokens move, minimal data transfer) |
| **Compound** (DynamoDB) | `hash(pk) + sort(sk)` | Handled via Key Salting | Fast within a single partition key | Vnodes |
| **Fixed Hash** (Redis) | `hash(key) % 16384` | No | Impossible | Move entire hash slots manually |

### The failure

- Designing the partition scheme before choosing the shard key. The shard key dictates the physical location of the data. If you choose `hash(UserId)` but your product manager says the most important feature is querying "all users who signed up in March", you have just doomed the system to execute scatter-gather queries for its primary access pattern
- The golden rule of partitioning: pick your shard key based on your most frequent, latency-sensitive query, and build Global Secondary Indexes for everything else
