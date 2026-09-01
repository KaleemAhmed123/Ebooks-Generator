## Expand and contract - continued

| Change | Safe in one deploy |
|---|---|
| Add a nullable column | Yes |
| Add a table | Yes |
| Add an index concurrently | Yes |
| Add a `NOT NULL` column with no default | **No.** Blocks writes on a large table |
| Rename a column | No. Three deploys |
| Drop a column | No. Only after nothing reads it |
| Change a column type | No. New column, backfill, swap |

### Indexes

```sql
CREATE INDEX CONCURRENTLY idx_orders_seller ON orders (seller_id);
```

- Without `CONCURRENTLY`, Postgres locks the table against writes for the duration. On a large table that is a full outage
