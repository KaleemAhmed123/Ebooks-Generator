## Retrying aborted transactions

- At Repeatable Read and Serializable, Postgres resolves some conflicts by aborting one transaction with SQLSTATE `40001`, "could not serialize access". The abort is the isolation level working, not a bug
- The contract is on the application: catch `40001`, roll back, and run the **whole transaction** again from `BEGIN`, re-reading every value. The first attempt's reads are exactly what the conflict made stale

```typescript
async function withRetry(db: Client, work: () => Promise<void>, maxAttempts = 3) {
  for (let attempt = 1; ; attempt++) {
    await db.query("BEGIN ISOLATION LEVEL SERIALIZABLE");
    try {
      await work();                      // every read and write, from scratch
      await db.query("COMMIT");          // COMMIT itself can raise 40001
      return;
    } catch (err: any) {
      await db.query("ROLLBACK");
      if (err.code !== "40001" || attempt >= maxAttempts) throw err;
    }
  }
}
```

- The loop wraps the transaction, never one statement. After any error Postgres marks the transaction aborted and rejects every further statement until `ROLLBACK`
- Booklet 01 owns the general retry rules: budget, backoff, jitter. The only addition here is which errors to retry: `40001`, and the deadlock code `40P01` (Module 3, page 3)

### The failure

- A side effect inside the loop. The transaction sends the "payment received" email, `COMMIT` fails with `40001`, the loop runs again: two emails, one payment. Anything that cannot be rolled back happens after `COMMIT` returns, or goes through the outbox (booklet 04)
