## Idempotent consumers

- Because we must use At-least-once delivery, we must design our applications to survive being handed the exact same message twice.
- This is called an **Idempotent Consumer**. An operation is idempotent if applying it multiple times has the same result as applying it once. 

```typescript
// BAD: Non-idempotent operation
async function handlePayment(event) {
  // If redelivered, we subtract $100 again! The user goes into debt.
  await db.query(
    'UPDATE accounts SET balance = balance - 100 WHERE id = ?', 
    [event.userId]
  );
}

// GOOD: Idempotent operation
async function handlePayment(event) {
  // If redelivered, we update to the exact same absolute value. No harm done.
  await db.query(
    'UPDATE accounts SET balance = 400, updated_at = NOW() WHERE id = ?',
    [event.userId]
  );
}
```

- When possible, you should design your system to use absolute state changes (setting a specific value) rather than relative state changes (adding or subtracting).

### The failure

- Relative state changes applied twice. The classic example is a wallet system. A user deposits $50. The `DepositEvent` is processed, the balance is increased by $50, and the database commits. The consumer crashes before Acking. The broker redelivers the `DepositEvent`. The consumer processes it again, increasing the balance by another $50. The user now has $100 from a $50 deposit. You must never use relative `UPDATE col = col + X` queries in a message consumer unless you have a deduplication layer protecting it
