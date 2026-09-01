## Transactions and change streams

- A single document write is always atomic, and for a long time that was all MongoDB offered
- Multi-document transactions arrived in version 4 and behave close to snapshot isolation

```js
const session = client.startSession()
await session.withTransaction(async () => {
  await orders.updateOne({ _id: id }, { $set: { status: "paid" } }, { session })
  await wallets.updateOne({ sellerId }, { $inc: { balancePaise: total } }, { session })
})
await session.endSession()
```

- Every operation must be passed the `session`, and forgetting it silently runs that write outside the transaction
- **A replica set is required.** A single standalone server cannot do transactions at all
- They are more expensive here than in Postgres, which is part of why embedding is preferred where it fits

### Change streams

```js
const stream = db.collection("orders").watch([
  { $match: { "fullDocument.status": "paid" } }
])

for await (const change of stream) {
  await publish("order.paid", change.fullDocument)
}
```

- A live feed of writes, read from the same replication log the database uses internally
- It lets a service react to a change without the writer knowing it exists
- Store the `resumeToken`, or a restart re-reads from now and silently drops everything that happened while it was down
