### 3. Optimistic locking

```ts
const { count } = await db.wallet.updateMany({
  where: { sellerId, version: currentVersion },
  data: { balance: { decrement: amount }, version: { increment: 1 } },
})
if (count === 0) throw new ConflictError("changed underneath, retry")
```

- No locks. The write fails if the row changed since you read it, and the caller retries
- Better under low contention, worse under high contention where retries pile up

### 4. Serializable isolation

- The database detects the conflict and aborts one transaction with a serialization failure
- Correct, and it requires retry logic everywhere, so it is the heaviest option
