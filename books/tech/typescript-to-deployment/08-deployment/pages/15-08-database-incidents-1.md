## Database incidents

- The database is where an incident becomes unrecoverable, so it gets its own page

### Too many connections

```sql
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
SHOW max_connections;

-- kill idle transactions holding locks
SELECT pg_terminate_backend(pid) FROM pg_stat_activity
WHERE state = 'idle in transaction' AND now() - state_change > interval '5 minutes';
```

- **Reduce replicas to restore service**, then fix the pool size using the arithmetic from Module 10
- **Set `idle_in_transaction_session_timeout` permanently**, so this cannot recur

### A lock is blocking everything

```sql
SELECT blocked.pid AS blocked_pid, blocking.pid AS blocking_pid,
       left(blocked.query,50) AS blocked_query, left(blocking.query,50) AS blocking_query
FROM pg_stat_activity blocked
JOIN pg_stat_activity blocking ON blocking.pid = ANY(pg_blocking_pids(blocked.pid))
WHERE cardinality(pg_blocking_pids(blocked.pid)) > 0;

SELECT pg_cancel_backend(<blocking_pid>);      -- ask nicely first
SELECT pg_terminate_backend(<blocking_pid>);   -- then force
```

- **A migration is the usual blocker.** An `ALTER TABLE` waiting on a lock queues every query behind it
