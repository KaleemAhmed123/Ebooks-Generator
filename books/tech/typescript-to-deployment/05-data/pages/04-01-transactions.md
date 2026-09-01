# Module 4 - Transactions, isolation and locking

## What a transaction is

- Moving money is two writes: take it from one balance and add it to another
- If the process dies between them, the money has left one place and arrived nowhere, and no amount of careful coding prevents a machine losing power
- A **transaction** groups writes so the database applies all of them or none of them
- Nothing outside sees the half-finished state, and a crash rolls the whole group back
- The guarantees are usually named **ACID**
- **Atomic**, all or nothing. **Consistent**, constraints hold at the end. **Isolated**, concurrent transactions do not see each other partway. **Durable**, once committed it survives a crash

```sql
BEGIN;
UPDATE wallets SET balance_paise = balance_paise - 50000 WHERE seller_id = 's1';
UPDATE wallets SET balance_paise = balance_paise + 50000 WHERE seller_id = 's2';
COMMIT;
```

### The rule that matters in a Node service

- A transaction holds locks and a connection for as long as it is open
- **Never await a network call inside one.** A payment provider taking four seconds means four seconds of held locks, and with a pool of ten, ten such requests stop the whole service

```ts
// wrong
await prisma.$transaction(async (tx) => {
  await tx.order.update(...)
  await razorpay.capture(paymentId)   // holds the transaction open
})

// right
const captured = await razorpay.capture(paymentId)
await prisma.$transaction(async (tx) => {
  await tx.order.update(...)
})
```

- Keep transactions short, local and free of anything that can hang
