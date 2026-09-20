## Composite index and the leftmost rule

- You can index multiple columns together (a composite index). The database sorts the index by the first column, then sorts identical values by the second column
- Because of this physical sorting, a composite index on `(a, b)` can be used to query `a = ?` or `a = ? AND b = ?`. It **cannot** be used to query `b = ?` alone, because the values of `b` are scattered across the tree, grouped under `a`

```sql
-- Creates an index sorted by last_name, then first_name
CREATE INDEX idx_name ON users (last_name, first_name);

-- Fast: Hits the index
SELECT * FROM users WHERE last_name = 'Smith';
SELECT * FROM users WHERE last_name = 'Smith' AND first_name = 'Alice';

-- Slow: Ignores the index, sequential scan
SELECT * FROM users WHERE first_name = 'Alice';
```

- Postgres states the leftmost rule formally: "equality constraints on leading columns, plus any inequality constraints on the first column that does not have an equality constraint, will always be used to limit the portion of the index that is scanned"

### The failure

- Creating a composite index in the wrong order for the query you actually run. If you index `(tenant_id, created_at)` but the query asks for `created_at > '2026-01-01'` without specifying a tenant, the index is useless
- A common, expensive mistake is building a second index on `(created_at, tenant_id)` to compensate, rather than analyzing which query is actually important
