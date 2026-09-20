## Advisory locks

- **Advisory locks** are locks on a number, not a row. The application picks the number (one 64-bit key, or two 32-bit keys such as a job class and a tenant id); Postgres tracks who holds it. They protect things that are not rows: one billing run per tenant, one cron job across many app instances
- Two lifetimes. `pg_advisory_lock(key)` is held by the **session** until `pg_advisory_unlock` or disconnect. `pg_advisory_xact_lock(key)` is held by the **transaction** and released at `COMMIT` or `ROLLBACK`, with no unlock call to forget

```sql
BEGIN;
SELECT pg_advisory_xact_lock(1, 42);   -- (job class 1 = billing, tenant 42)
-- only one worker per tenant gets past this line; the others wait here
-- do the tenant's billing rows
COMMIT;   -- lock released with the transaction
```

- `pg_try_advisory_xact_lock` returns `false` instead of waiting, for "skip if someone else is on it" jobs. The lock itself is only a database-level hint; the resource it guards must be reachable only through code that takes it

### The failure

- A session lock on a pooled connection. The worker takes `pg_advisory_lock`, throws before unlocking, and returns the connection to the pool. The next request that borrows that connection now silently holds the billing lock for tenant 42, and no billing runs until the connection is closed. Use the `xact` form whenever you are inside a transaction, and pair the session form with `finally`
