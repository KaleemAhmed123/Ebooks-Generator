## Prisma in practice

### Selecting only what you need

```ts
const orders = await prisma.order.findMany({
  where: { sellerId, status: "PAID" },
  select: { id: true, total: true },
  orderBy: { createdAt: "desc" },
  take: 20,
})
```

- `select` and `include` are mutually exclusive
- `select` narrows the return type too, so the compiler knows `orders[0].status` is gone

### Transactions

```ts
await prisma.$transaction(async (tx) => {
  await tx.order.update({ where: { id }, data: { status: "PAID" } })
  await tx.wallet.update({
    where: { sellerId },
    data: { balance: { increment: total } },
  })
})
```

- Everything inside uses `tx`, not `prisma`. Using `prisma` there runs outside the transaction
