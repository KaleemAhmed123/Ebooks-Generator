## Finding the slow query

- `EXPLAIN ANALYZE` tells you why a query is slow. It cannot tell you **which** query is slow
- That answer lives in the database itself, and both engines record it if you ask

### PostgreSQL

```sql
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

SELECT calls, mean_exec_time, total_exec_time, query
FROM pg_stat_statements
ORDER BY total_exec_time DESC
LIMIT 20;
```

- **Sort by total time, not mean time.** A 2ms query run four million times costs more than a 5 second report run twice
- That distinction is why the worst offender is usually a query nobody thought was slow

```
log_min_duration_statement = 500    # log anything over 500ms
```

### MongoDB

```js
db.setProfilingLevel(1, { slowms: 100 })
db.system.profile.find().sort({ millis: -1 }).limit(10)

db.orders.find({ sellerId: "s1" }).explain("executionStats")
```

### What to look at first

- The top five by total time. Fixing those usually recovers most of the database load
- `calls` climbing far faster than traffic, which is the signature of an N+1
- Rows examined against rows returned. A large ratio means the index is wrong, not missing

### Numbers worth having on a dashboard

- Connection count against `max_connections`, replication lag, cache hit ratio, and slow query count per minute
- All four are cheap to collect and each one predicts a specific incident
