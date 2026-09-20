## Data model decision table

- At the start of this booklet, we stated that the workload decides the data model. Now that you understand the underlying mechanisms—how B-trees update in place, how LSMs merge, how indexes fan out—you can make that decision

| Model | Underlying engine | When to choose it | When to avoid it |
|---|---|---|---|
| **Relational** (Postgres, MySQL) | B-tree + Heap | You have complex, unpredictable relationships. You need ACID guarantees across multiple entities. Schema is rigid. | Highly nested data. Rapidly changing schema. Write-heavy IoT firehoses. |
| **Document** (MongoDB) | B-tree | Self-contained entities. You read the whole document at once. Schema is fluid (schema-on-read). | Deeply connected data (joins are slow). Unbounded arrays inside the document. |
| **Wide-column** (Cassandra) | LSM tree + Bloom filter | Massive write throughput. Time-series data. Queries are known in advance. | Unpredictable ad-hoc queries. Heavy updates to existing rows. |
| **Key-Value** (Redis, DynamoDB) | Hash index / LSM | Extreme speed. Lookups by primary key only. Session state, caching, shopping carts. | You need to query by secondary attributes and don't want to build GSIs. |
| **Graph** (Neo4j) | Index-free adjacency | Relationships are the primary data. Fraud rings, social networks, recommendation engines. | The data is mostly tabular. Updates are massive batch jobs. |
| **Columnar** (Parquet) | Column chunks | OLAP analytics. Aggregating `SUM(price)` across a billion rows. | OLTP workloads. Reading a single complete row. |

### The failure

- Picking a model based on fashion, or picking "NoSQL" simply because you heard relational databases don't scale. A sharded Postgres cluster handles scale perfectly well. The table above is the only valid way to choose
- If your system does not fit neatly into one row, that is perfectly normal. Most modern architectures use Postgres as the source of truth, Redis for the hot read cache, and Parquet in S3 for analytics
