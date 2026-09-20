## Retrying aborted transactions

- When two transactions conflict at a high isolation level (like Repeatable Read or Serializable), the database resolves the conflict by safely aborting one of them. The aborted transaction receives a serialization failure (SQLSTATE `40001`)
- **A serialization failure is not a bug**. It is the database doing exactly what you paid it to do. Your application is expected to catch the error, discard the aborted state, and re-run the entire transaction from the beginning

```typescript
async function safeTransfer() {
  const MAX_RETRIES = 3;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await db.query('BEGIN ISOLATION LEVEL SERIALIZABLE');
      // Read balances, verify funds, write new balances...
      await db.query('COMMIT');
      return; // Success, exit the loop
      
    } catch (err) {
      await db.query('ROLLBACK');
      
      // 40001 is the standard SQLSTATE for serialization failure
      if (err.code === '40001' && attempt < MAX_RETRIES) {
        continue; // Try the whole transaction again
      }
      throw err; // Real error, or out of retries
    }
  }
}
```

- Notice that the `BEGIN` statement is *inside* the retry loop. You must re-read all the data, because the underlying rows have changed since your first attempt

### The failure

- Putting side-effects inside a retriable transaction. If your transaction code sends a "Payment Successful" email, and then the database throws a `40001` serialization failure on `COMMIT`, your code will loop and run again. The user will receive two emails for one transaction
- Only database writes can be safely rolled back. Side-effects (emails, analytics, API calls) must happen *after* the `COMMIT` returns successfully
