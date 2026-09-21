## Polling publisher

- The simplest relay: poll the outbox table for unsent rows, publish each one, mark it sent. `SELECT ... FOR UPDATE SKIP LOCKED` lets more than one poller run without two pollers grabbing the same row — Postgres's own description: rows "that cannot be immediately locked are skipped," built to "avoid lock contention with multiple consumers accessing a queue-like table"

```typescript
const rows = await db.query(
  `SELECT id, payload FROM outbox WHERE sent_at IS NULL
   ORDER BY id FOR UPDATE SKIP LOCKED LIMIT 100`);
for (const row of rows) {
  await broker.publish(row.payload);
  await db.query(`UPDATE outbox SET sent_at = now() WHERE id = $1`, [row.id]);
}
```

- Crash between the publish and the `UPDATE` republishes the row on the next poll. That is the contract, not a bug: at-least-once, same as every relay in this module
- Poll interval trades latency for load: every 100 ms is close to real time and a hundred queries a second against an otherwise idle table; every 5 s is ten times cheaper and ten times slower. `SKIP LOCKED` is what keeps that query cheap even at the low interval — a poller never blocks on rows another poller already grabbed

### The failure

- No index on `sent_at`. The table grows to millions of rows, most already sent, and the poll query scans them all to find the handful left. Index the column the `WHERE` clause filters on, or move sent rows out of the table entirely
