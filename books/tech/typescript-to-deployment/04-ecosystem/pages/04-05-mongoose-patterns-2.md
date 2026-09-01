### Transactions

```ts
const session = await mongoose.startSession()
await session.withTransaction(async () => {
  await Order.updateOne({ _id: id }, { status: "paid" }, { session })
  await Wallet.updateOne({ sellerId }, { $inc: { balance: total } }, { session })
})
session.endSession()
```

- Requires a replica set. A single standalone `mongod` cannot do transactions
