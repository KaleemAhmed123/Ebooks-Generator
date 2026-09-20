## Partitioning decision table

- The scheme follows the shard key, and the shard key follows the most frequent, most latency-sensitive query. In that order

| Strategy | How it routes | Hotspots | Range queries | Rebalancing |
|---|---|---|---|---|
| **Range** (Bigtable, HBase, CockroachDB, MongoDB ranged) | Boundary keys in a map | Yes: any monotonic key hits the last range | One sequential run | Dynamic split and merge; pre-split empty tables |
| **Hash** (Cassandra, MongoDB hashed) | Hash of the key onto a ring | Only from one hot key | Scatter-gather | Consistent hashing with vnodes; minimal movement |
| **Compound** (DynamoDB, Cassandra) | Hash the partition key, sort inside it | One hot partition key; salt it | Inside one partition key | Internal splits (DynamoDB) or the ring (Cassandra) |
| **Fixed slots** (Redis Cluster, Elasticsearch, Kafka) | `CRC16(key) mod 16384`, or shard count at creation | Only from one hot key | Scatter-gather | Move whole slots; the count is permanent |

### The failure

- The scheme chosen before the key. `hash(user_id)` is decided, and then the product's main screen turns out to be "everyone who signed up in March": a scatter-gather for the primary access pattern, forever. The key comes from the query list of Module 1, page 1; the scheme comes from the key; the global index (Module 8, page 13) covers the second query, not the first
