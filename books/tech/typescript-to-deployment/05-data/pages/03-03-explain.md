## Reading a query plan

- Adding indexes by guessing is how a table ends up with eleven of them and no faster queries
- The database will tell you exactly what it did, and `EXPLAIN ANALYZE` is how you ask
- `EXPLAIN` alone shows the plan it would use. `ANALYZE` runs the query and reports what actually happened

```sql
EXPLAIN ANALYZE
SELECT id, total_paise FROM orders
WHERE seller_id = 's1' AND status = 'paid'
ORDER BY created_at DESC LIMIT 20;
```

```
Limit  (cost=0.43..8.61 rows=20 width=24)
       (actual time=0.031..0.084 rows=20 loops=1)
  ->  Index Scan Backward using idx_orders_seller_created on orders
        (actual time=0.029..0.079 rows=20 loops=1)
        Index Cond: (seller_id = 's1')
        Filter: (status = 'paid')
        Rows Removed by Filter: 6
Planning Time: 0.169 ms
Execution Time: 0.114 ms
```

### What to look at, in order

- **`Seq Scan` on a large table.** The index is missing, or the query is written so it cannot be used
- **`actual time` against `cost`.** Cost is the planner guessing. Actual is the truth
- **Estimated `rows` against actual `rows`.** A tenfold gap means the planner is choosing badly because its statistics are stale
- **`Rows Removed by Filter`.** Reading a hundred thousand rows to return twenty means the index lands in the wrong place
- **`loops`.** Anything above one means this step ran once per outer row, which is how a nested loop becomes a slow query

```sql
ANALYZE orders;   -- refresh the statistics the planner reads
```

- Run this against realistic data volumes. On a hundred rows the planner picks a sequential scan and teaches you nothing
