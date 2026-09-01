### The health checks worth watching

```sql
SELECT count(*), state FROM pg_stat_activity GROUP BY state;
SELECT pg_size_pretty(pg_database_size('app'));
SELECT relname, n_dead_tup FROM pg_stat_user_tables ORDER BY n_dead_tup DESC LIMIT 10;
SELECT * FROM pg_stat_activity WHERE state='idle in transaction' AND now()-state_change > interval '5 min';
```

- **`idle in transaction` is the one that kills a database.** It holds locks and blocks vacuum. Set `idle_in_transaction_session_timeout` to a few minutes
- **Dead tuples growing means autovacuum is not keeping up**, and the table will bloat until queries slow down
