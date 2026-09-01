### Atomic updates instead of read then write

```ts
// race condition
const w = await prisma.wallet.findUnique({ where: { sellerId } })
await prisma.wallet.update({ where: { sellerId }, data: { balance: w.balance - amount } })

// safe
await prisma.wallet.updateMany({
  where: { sellerId, balance: { gte: amount } },
  data: { balance: { decrement: amount } },
})
```

- `updateMany` returns a count. Zero means the condition failed, so refuse the operation
- This is the fix for the read-check-write race on any balance
