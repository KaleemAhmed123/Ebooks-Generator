## Zero-downtime schema changes

- A deploy is not atomic. For a few minutes old code and new code are both running against one database
- Any migration that only the new code can tolerate breaks the old instances still serving traffic
- **Expand and contract** solves it by never having a moment where one version cannot work

### Renaming a column, done safely

| Step | Change | Deployed with |
|---|---|---|
| 1 expand | add `total_paise`, nullable | migration only |
| 2 | write to both columns, read the old one | code |
| 3 backfill | copy `total` into `total_paise` in batches | script |
| 4 | read the new column, still write both | code |
| 5 contract | drop `total` | migration only |

- Five deploys instead of one, and at no point does either version of the code see a schema it cannot handle
- The same shape covers splitting a table, changing a type, or moving a field to another service

### Index creation

```sql
CREATE INDEX CONCURRENTLY idx_orders_seller ON orders (seller_id);
```

- A plain `CREATE INDEX` takes a lock that blocks every write for the duration
- `CONCURRENTLY` does not, at the cost of being slower and needing its own transaction
- It can also fail and leave an invalid index behind, so check `pg_index.indisvalid` afterwards and drop it if so

### Adding a NOT NULL column

- Add it nullable, backfill, add the constraint as `NOT VALID`, then validate it separately
- Each of those steps takes a short lock instead of one long one
