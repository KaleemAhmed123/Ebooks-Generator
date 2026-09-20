## Double-entry ledger

- You never store a user's balance in an updatable `balance` column. It is mathematically unsafe and un-auditable
- **Double-entry bookkeeping:** Every transaction involves moving money *from* one account *to* another. It requires two database rows that must sum to exactly zero
- If Alice buys a $10 book from Bob:
  - Row 1: Alice's account, amount: -10
  - Row 2: Bob's account, amount: +10
- **Append-only:** The ledger is immutable. You never UPDATE or DELETE a row. If you need to refund Alice, you write two *new* rows: Alice +10, Bob -10

### The failure

- Updating a balance directly: `UPDATE accounts SET balance = balance - 10`. If the database crashes, or a bug subtracts the wrong amount, you have no history of how that number was calculated

:::interview
Your database crashed. You restore from a backup, but the `balance` columns look wrong. How do you fix them?

Because the ledger is strictly append-only double-entry rows, you can rebuild any user's exact balance at any point in time by simply summing all their historical ledger rows.
:::\n