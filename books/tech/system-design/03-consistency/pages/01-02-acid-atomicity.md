## Atomicity is abortability

- The word "atomic" in concurrent programming usually means "something that cannot be broken down into smaller parts" (e.g., atomic variables in Java). In the context of ACID databases, it means something entirely different
- **Atomicity means abortability**. It guarantees that if a transaction fails halfway through, the database will safely undo all the writes that occurred before the error. The transaction is either committed in its entirety, or rolled back in its entirety (all or nothing)

```typescript
async function transferMoney(db: Client, fromId: string, toId: string, amount: number) {
  try {
    await db.query('BEGIN'); // Start transaction
    await db.query('UPDATE accounts SET balance = balance - $1 WHERE id = $2', [amount, fromId]);
    
    // If the server crashes here, the database will automatically ROLLBACK 
    // when it restarts, because the transaction never COMMITted.
    
    await db.query('UPDATE accounts SET balance = balance + $1 WHERE id = $2', [amount, toId]);
    await db.query('COMMIT'); // Success: persist all changes
  } catch (err) {
    await db.query('ROLLBACK'); // Safety: undo all changes
    throw err;
  }
}
```

- Atomicity has nothing to do with concurrent transactions. (The guarantee that a concurrent user won't see half your transaction is **Isolation**, not Atomicity)

### The failure

- Retrying a non-atomic operation. If a client calls an API to charge a credit card, and the network drops the connection before the server can reply "Success", the client will try again
- If the API is not atomic, the second request charges the card a second time. Atomicity ensures that the first attempt either fully rolled back or fully succeeded, making retries safe to reason about
