## Double-entry ledger

- **Double-entry** bookkeeping records every movement of money as two rows, a debit and a credit, that sum to zero: 10 leaves the customer's account and 10 arrives in the merchant's. Money is never created or destroyed by a write, only moved, and the invariant "all rows sum to zero" can be checked at any time over the whole table
- The ledger is append-only. A refund is two new rows in the other direction, never an edit of the original. A balance is not stored; it is the sum of an account's rows, cached where reads need it (page 7)

```typescript
type Entry = { account: string; amount: bigint; currency: string };  // minor units, never floats

async function post(tx: Tx, txnId: string, entries: Entry[]) {
  const sum = entries.reduce((s, e) => s + e.amount, 0n);
  if (sum !== 0n) throw new Error(`unbalanced: ${sum}`);          // the invariant, checked before any write
  for (const e of entries)
    await tx.run("INSERT INTO ledger (txn_id, account, amount, currency) VALUES ($1, $2, $3, $4)",
      [txnId, e.account, e.amount, e.currency]);                    // all rows or none: one transaction
}

// a 1 000-cent capture with a 30-cent fee: three rows, still zero
await post(tx, "txn_9", [
  { account: "customer:42", amount: -1000n, currency: "usd" },
  { account: "merchant:7",  amount:   970n, currency: "usd" },
  { account: "fees",        amount:    30n, currency: "usd" },
]);
```

- Amounts are integers in the currency's minor unit, `bigint` in code and `BIGINT` in the store, one currency per posting. A float cannot represent 0.10 exactly, and a ledger that drifts by rounding fails reconciliation (page 6) on day one
- `txn_id` groups one movement's rows so a transition (page 5) can name them. `UPDATE` and `DELETE` are revoked on the table; the only verb is `INSERT`

### The failure

- An updatable `balance` column. `UPDATE accounts SET balance = balance - 10` has no history: a bug, a double-run or a crash mid-batch leaves a number nobody can explain, and "why is this account short 30 cents" has no answer. The ledger is the answer; the balance is a cache of it
