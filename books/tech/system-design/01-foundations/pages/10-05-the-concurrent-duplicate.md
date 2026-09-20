## The concurrent duplicate

- A client times out and retries. A network delay clears, and both requests hit the server at the exact same millisecond
- A naive idempotency implementation is vulnerable to the **check-then-act** race condition:

```typescript
// BAD: check then act. Two concurrent requests both see no record.
const existing = await db.query('SELECT * FROM idempotency WHERE key=?', key);
if (existing) return existing.response;

const result = await chargeCard(amount);
await db.query('INSERT INTO idempotency (key, response) VALUES (?,?)', key, result);
```

### The fix

- You must atomically reserve the key *before* doing the work using a `UNIQUE` constraint:

```typescript
// GOOD: reserve then act
try {
  await db.query('INSERT INTO idempotency (key, status) VALUES (?, "IN_FLIGHT")', key);
} catch (err) {
  if (err.code === 'UNIQUE_VIOLATION') return handleExistingKey(key);
}

const result = await chargeCard(amount);
await db.query('UPDATE idempotency SET status="DONE", response=? WHERE key=?', result, key);
```

### The failure

- Testing idempotency sequentially instead of concurrently. A sequential test passes the bad code. You must fire two requests simultaneously to catch the check-then-act bug
