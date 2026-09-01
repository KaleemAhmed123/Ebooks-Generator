## The relay

```ts
await db.$transaction(async (tx) => {
  await tx.order.update({ where: { id }, data: { status: "paid" } })
  await tx.outbox.create({
    data: { id: randomUUID(), topic: "order.paid", payload: { orderId: id } },
  })
})
```

```ts
// a separate process, running on a short interval
const batch = await db.$queryRaw`
  SELECT * FROM outbox WHERE published_at IS NULL
  ORDER BY created_at LIMIT 100
  FOR UPDATE SKIP LOCKED
`

for (const row of batch) {
  await rabbit.publish(row.topic, row.payload, { messageId: row.id })
  await db.outbox.update({ where: { id: row.id }, data: { publishedAt: new Date() } })
}
```

- **`FOR UPDATE SKIP LOCKED`** is what lets several relay instances run at once. Each takes rows the others have not locked, and none of them block
- Publishing before marking means a crash between the two republishes the event, so delivery stays at least once
- That is fine, because `messageId` is the idempotency key consumers use

### What this buys and what it costs

- The event cannot be lost, because it committed with the data that caused it
- The broker being down delays delivery rather than dropping it
- The cost is a table to prune, a process to run, and a little latency between the write and the publish
- **Change data capture** is the alternative, where a tool reads the database replication log directly and no outbox table is needed
