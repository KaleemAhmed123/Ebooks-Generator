## Beyond B-tree

- A B-tree is exceptional at sorting, which makes it perfect for range queries (`> 5`). But not all queries are ranges. Postgres provides specialized indexes (via the `USING` clause) for different data shapes

| Index | What it does | When to use it |
|---|---|---|
| **B-Tree** | Sorts keys into a balanced tree. | Default. Equality and range scans (`=`, `<`, `>`). |
| **Hash** | Hashes the key to a bucket. `O(1)` lookup. | Equality only (`=`). Cannot do ranges. |
| **GIN** | Inverted index. Maps elements inside a structure to the row ID. | Full-text search, checking if an element exists inside a JSON array. |
| **BRIN** | Stores min/max summaries for blocks of pages (Block Range Index). | Massive, physically ordered time-series data. |

### The failure

- Using a B-tree to index an array column. The B-tree indexes the entire array as a single string. If you want to find rows where the array *contains* "admin", the B-tree is useless. You must use a GIN index
- Creating a BRIN index on a UUID column. BRIN only works if the data is physically correlated on disk (like an auto-incrementing timestamp). Because UUIDs are random, every block contains a completely random min/max range, making the BRIN useless
