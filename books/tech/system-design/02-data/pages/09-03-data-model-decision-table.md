## Data model decision table

- Module 1's table, with the mechanisms filled in

| Model | Underlying engine | When to choose it | When to avoid it |
|---|---|---|---|
| **Relational** (Postgres, MySQL) | B-tree, heap or clustered | Dense, changing relationships; transactions across entities; queries not known in advance | Deeply nested entities read whole; a schema that changes weekly; a write firehose |
| **Document** (MongoDB) | B-tree, one document per read | Self-contained entities read whole; schema-on-read | Many-to-many relationships; arrays that grow without bound |
| **Wide-column** (Cassandra) | LSM tree, partition + clustering | Writes far above reads; time-series; every query known in advance | Ad-hoc queries; heavy updates and deletes (tombstones) |
| **Key-value** (Redis, DynamoDB) | Hash or LSM, key only | One known entity per request; sessions, carts, caches | Any second access pattern without an index you build yourself |
| **Graph** (Neo4j) | Native relationship storage | Multi-hop traversals; the connections are the data | Tabular data; bulk analytical scans |
| **Columnar** (Parquet, warehouses) | Column chunks in row groups | Aggregates over a few columns of many rows | Reading or updating single rows |

### The failure

- A row chosen for the whole system. Systems rarely fit one row: a relational source of truth, a key-value cache in front of it, a columnar copy for analytics is the common shape, and Module 1, page 8 is how the copies are kept honest. The table has no "it depends on the query" row because every row is that row
