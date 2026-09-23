## Glossary: C

| Term | Means | Where |
|---|---|---|
| **compaction** | the background merge that keeps the newest value per key and rewrites many files as fewer, larger ones | 2 · 2-08 |
| **compare-and-set** | writing with `WHERE version = $seen`, so zero rows updated means someone else won | 3 · 2-07 |
| **compensating transaction** | a new transaction reversing the business effect of one that already committed | 3 · 4-05 |
| **composite index** | an index sorted by its first column, then by the second inside equal values of the first | 2 · 3-03 |
| **compound key** | a key split in two: a hashed partition key for spread, a sort key for range scans | 2 · 8-04 |
| **conditional write** | a write that names the version it expects and is rejected if anything moved past it | 3 · 8-10 |
| **connection pooler** | a proxy between the application and the database, multiplexing many client connections onto few server ones | 1 · 6-07 |
| **consensus** | several nodes agreeing on one value, once, despite crashes and lost messages | 3 · 7-01 |
| **consistency (ACID)** | the data obeying your rules. The application's invariants, not a database guarantee | 3 · 1-03 |
| **consistency level** | the per-query choice of how many replicas a read or a write waits for | 2 · 7-03 |
| **consistency model** | the contract naming which values a read may return, given these writes in this order | 3 · 5-01 |
| **consistent hashing** | a hash whose assignment changes minimally when nodes are added or removed, so only neighbouring keys move | 2 · 8-05 |
| **consistent prefix** | reads see writes in the order they were made, never out of order | 2 · 5-10 |
