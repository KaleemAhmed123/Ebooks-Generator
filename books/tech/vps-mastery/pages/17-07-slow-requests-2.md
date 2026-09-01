### Then look at the database

```sql
SELECT pid, now() - query_start AS duration, state, left(query, 80)
FROM pg_stat_activity
WHERE state != 'idle' ORDER BY duration DESC LIMIT 10;

SELECT count(*), state FROM pg_stat_activity GROUP BY state;
```

- Many connections in `idle in transaction` means the application opens transactions and does not close them. That exhausts the pool and every request waits

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE seller_id = 8812;
```

- `Seq Scan` on a large table is a missing index. Add it with `CONCURRENTLY`, page 12-09

### 504 specifically

- Nginx gave up waiting. Either the backend is genuinely slower than `proxy_read_timeout`, or it is deadlocked
- **Raising the timeout hides the problem.** Raise it only for an endpoint that is legitimately slow, per location, page 07-12
