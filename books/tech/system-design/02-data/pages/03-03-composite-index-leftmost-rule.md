## Composite index and the leftmost rule

- A **composite index** sorts by the first column, then by the second inside equal values of the first. `(a, b)` serves `a = ?`, `a = ? AND b = ?`, and `a = ? AND b > ?`
- It does not serve `b = ?` alone: every value of `b` is scattered under every value of `a`, so there is no one place to look

```sql
CREATE INDEX users_name ON users (last_name, first_name);

-- served by the index: leading column has an equality
SELECT * FROM users WHERE last_name = 'Smith';
SELECT * FROM users WHERE last_name = 'Smith' AND first_name > 'M';

-- not served: no constraint on the leading column
SELECT * FROM users WHERE first_name = 'Alice';
```

- Postgres states the rule exactly: "equality constraints on leading columns, plus any inequality constraints on the first column that does not have an equality constraint, will always be used to limit the portion of the index that is scanned". Later columns can still filter, but they no longer narrow the scan

### The failure

- The wrong column order for the query that actually runs. `(tenant_id, created_at)` does nothing for `created_at > '2026-01-01'` with no tenant
- The reflex fix, a second index on `(created_at, tenant_id)`, doubles the write cost of page 1. Look at which query matters first; often only one of the two is real
