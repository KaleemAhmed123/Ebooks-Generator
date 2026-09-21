## The idempotent consumer

- The last boundary is the handler. If applying a record twice has the same effect as once, every duplicate path on page 1 is harmless. Booklet 01, Module 10 is the general theory; this page is what it looks like on a consumer

```typescript
// natural: the record carries the whole state, the write is an upsert
await db.query(
  `INSERT INTO orders (id, status, version) VALUES ($1, $2, $3)
   ON CONFLICT (id) DO UPDATE SET status = EXCLUDED.status, version = EXCLUDED.version
   WHERE orders.version < EXCLUDED.version`, [ev.orderId, ev.status, ev.version]);

// no natural key: a dedup row in the same transaction as the effect
await db.tx(async (t) => {
  const r = await t.query(
    `INSERT INTO processed (consumer, message_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
    ["billing", ev.id]);
  if (r.rowCount === 0) return;                       // seen before: skip
  await t.query(`UPDATE accounts SET balance = balance + $1 WHERE id = $2`, [ev.amount, ev.accountId]);
});
```

- Prefer the first form. `status = 'paid'` applied twice is `paid`; `balance += 10` applied twice is wrong. A version on the record, from the producer's side (Module 8, page 3), lets the upsert also refuse an older event that arrives late
- The second form is for effects that cannot be phrased as state: an increment, a call out. The dedup row and the effect commit together, which is the whole trick. Give the table a retention; it only needs to outlive the longest redelivery
- Neither form needs the broker's help. This is why at-least-once plus an idempotent consumer is the standard answer, and why "exactly-once" at the broker rarely buys anything the handler did not already have

### The failure

- The dedup check in a separate store. `SETNX processed:<id>` in Redis, then the database write: crash between them and the message is marked done but never applied. Reverse the order and a crash duplicates. Only the same transaction closes both gaps, so the dedup row lives in the same database as the effect
