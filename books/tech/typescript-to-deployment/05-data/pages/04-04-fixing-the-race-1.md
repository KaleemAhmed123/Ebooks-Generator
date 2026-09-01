## Four ways to close it

### 1. Fold the check into the write

```sql
UPDATE wallets
SET balance_paise = balance_paise - 40000
WHERE seller_id = 's1' AND balance_paise >= 40000;
```

```ts
const { count } = await db.wallet.updateMany({
  where: { sellerId, balance: { gte: amount } },
  data: { balance: { decrement: amount } },
})
if (count === 0) throw new AppError("insufficient", 409, "balance too low")
```

- One statement, so there is no gap to interleave into. The database evaluates the condition and writes atomically
- The **row count** is the answer. Zero means the condition failed, so refuse
- This is the best fix. It is one query, holds no lock beyond the statement, and needs no retry

### 2. Pessimistic locking

```sql
BEGIN;
SELECT balance_paise FROM wallets WHERE seller_id = 's1' FOR UPDATE;
-- other transactions touching this row now wait here
UPDATE wallets SET balance_paise = balance_paise - 40000 WHERE seller_id = 's1';
COMMIT;
```

- `FOR UPDATE` locks the row until commit, so the second reader waits rather than reading a stale value
- Correct, and it serializes everyone touching that row. Use it when the logic between read and write is too complex for one statement
