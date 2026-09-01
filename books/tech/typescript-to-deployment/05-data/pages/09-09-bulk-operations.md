## Bulk operations

- Importing ten thousand rows with ten thousand `INSERT` statements means ten thousand round trips, and each one costs a millisecond of network before any work happens
- The fix is to send more per trip. Every driver supports it, and almost nobody uses it until something is slow

```ts
// one statement, one round trip
await db.order.createMany({ data: rows, skipDuplicates: true })

// MongoDB, mixed operations in one trip
await Order.bulkWrite(
  rows.map((r) => ({
    updateOne: {
      filter: { externalId: r.externalId },
      update: { $set: r },
      upsert: true,
    },
  })),
  { ordered: false }
)
```

- `ordered: false` lets the rest continue when one document fails, and it parallelizes
- **Batch in chunks of about a thousand.** One statement with 100,000 rows hits query size limits and holds a long lock

### The fastest path for very large loads

```sql
COPY orders (id, seller_id, total_paise) FROM STDIN WITH (FORMAT csv);
```

- `COPY` is an order of magnitude faster than `INSERT` and is what a bulk import should use
- Drop non-essential indexes first and rebuild them after. Maintaining ten indexes during a load costs more than rebuilding them once

### Reading in bulk

- The same problem in reverse is the N+1 from Booklet 4. Collect the ids, issue one `WHERE id IN (...)`, then map the results back
