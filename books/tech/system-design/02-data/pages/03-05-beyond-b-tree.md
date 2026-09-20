## Beyond B-tree

- A B-tree answers equality and ranges over one ordering. Other questions have other shapes, and Postgres has an index type for each (`CREATE INDEX … USING gin`)

| Index | What it does | When to use it |
|---|---|---|
| **B-tree** | Sorted keys, balanced tree | The default: `=`, `<`, `>`, `BETWEEN`, `ORDER BY` |
| **Hash** | Hash of the key → bucket | "Can only handle simple equality comparisons"; no ranges, no ordering |
| **GIN** | Inverted index: each element inside a value → the rows containing it | Arrays, `jsonb`, full-text search; "which rows contain X" |
| **BRIN** | Block-range index: min and max per range of pages | Huge tables whose physical order matches the column (append-only timestamps); tiny index |

### The failure

- A B-tree on an array column, then a query for rows whose array contains `'admin'`. The B-tree compares whole arrays; it cannot look inside. GIN can
- A BRIN on a column with no physical order (a UUID, a status). Every page range spans nearly the whole value space, so no range is ever skipped and the index filters nothing
