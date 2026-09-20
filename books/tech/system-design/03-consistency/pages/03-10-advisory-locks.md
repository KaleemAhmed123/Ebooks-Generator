## Advisory locks

- MVCC and row locks are designed to protect data that lives inside the database tables. But what if you need to coordinate something that *doesn't* live in a table?
- For example, you have a multi-tenant SaaS application, and you want to ensure that only one worker process runs the billing script for "Tenant A" at a time. The billing script hits external APIs (like Stripe), so you don't want to hold a transaction open.
- Postgres provides **Advisory Locks** for this exact scenario. They are application-defined locks that live in the database's memory

```sql
-- The application invents an ID (e.g., a hash of the tenant ID)
-- 42 corresponds to "Tenant A Billing"
SELECT pg_advisory_lock(42);

-- ... the application runs the billing script ...

SELECT pg_advisory_unlock(42);
```

- Advisory locks completely ignore MVCC. They don't lock rows, they don't roll back if the transaction aborts (unless you use `pg_advisory_xact_lock`), and they are incredibly fast because they never touch the disk

### The failure

- Leaking a session-level lock past a pooled connection. If you acquire a session-level lock (`pg_advisory_lock`) in Node.js, and your function throws an error before calling `unlock`, the lock is still held. If you are using a connection pool (like PgBouncer), that database connection will eventually be handed to a completely different user's request, and the lock will still be active
- To fix this, always use transaction-level advisory locks (`pg_advisory_xact_lock`) if you are inside a transaction, because they automatically release on `COMMIT` or `ROLLBACK`
