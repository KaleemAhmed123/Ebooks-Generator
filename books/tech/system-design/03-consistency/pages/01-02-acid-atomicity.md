## Atomicity is abortability

- **Atomicity** in ACID means: if the transaction cannot finish, every write it made is undone. It says nothing about other transactions seeing a half-finished state; that is isolation (page 4)
- The mechanism is the abort. A crash before `COMMIT` leaves no commit record in the write-ahead log, so recovery discards the writes. An error in the middle lets the client say `ROLLBACK`

```typescript
async function transfer(db: Client, from: string, to: string, amount: number) {
  await db.query("BEGIN");
  try {
    await db.query("UPDATE accounts SET balance = balance - $1 WHERE id = $2", [amount, from]);
    // a crash here leaves no commit record; recovery discards the debit
    await db.query("UPDATE accounts SET balance = balance + $1 WHERE id = $2", [amount, to]);
    await db.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK");
    throw err;
  }
}
```

- The point of abortability is that a failed attempt leaves nothing behind, so the caller can run it again from a clean state

### The failure

- Retrying an operation that is not atomic. "Charge the card and record the order" times out; the charge ran, the record did not; the retry charges again. Atomicity guarantees a failed attempt left nothing. It does not tell the client whether the attempt failed or only the reply was lost; that is the idempotency-key problem, booklet 01
