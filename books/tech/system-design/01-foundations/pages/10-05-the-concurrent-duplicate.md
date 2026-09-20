## The concurrent duplicate

- A client times out and retries. The delayed original clears at the same moment. Both requests hit the server in the same millisecond
- The obvious implementation has a **check-then-act** race: both look, both find nothing, both charge

```typescript
// BAD: check, then act. Two concurrent requests both see no row
const { rows } = await db.query('SELECT response FROM idempotency WHERE key = $1', [key])
if (rows[0]) return rows[0].response
const result = await chargeCard(amount)
await db.query('INSERT INTO idempotency (key, response) VALUES ($1, $2)', [key, result])
```

### The fix

- Reserve the key *before* doing the work, atomically, with a `UNIQUE` constraint. The database serialises the two inserts; exactly one wins

```typescript
// GOOD: reserve, then act
try {
  await db.query("INSERT INTO idempotency (key, status) VALUES ($1, 'IN_FLIGHT')", [key])
} catch (err) {
  if ((err as { code?: string }).code === '23505') return handleExistingKey(key) // pg: unique_violation
  throw err
}
const result = await chargeCard(amount)
await db.query("UPDATE idempotency SET status = 'DONE', response = $2 WHERE key = $1", [key, result])
```

- `handleExistingKey` is the next two pages: replay the stored response, or answer `409` if the first attempt is still running

### The failure

- Testing idempotency sequentially. A sequential test passes the bad code every time. Only two requests fired at the same instant catch the check-then-act bug
- `chargeCard` throws after the reserve. The row stays `IN_FLIGHT` forever and every retry gets a `409`. Delete the row, or mark it failed, in the `catch`
