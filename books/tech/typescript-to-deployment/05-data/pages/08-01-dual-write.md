## The dual write problem

- A handler updates the database, then publishes an event. Two systems, two writes, no transaction spanning both

```ts
await db.order.update({ where: { id }, data: { status: "paid" } })
await rabbit.publish("order.paid", { orderId: id })   // what if this fails
```

- If the publish fails, the order is paid and nobody was told. No email, no stock decrement, no analytics
- Swapping the order does not help. Publish first and a database failure means consumers act on something that never happened
- Wrapping both in a transaction does not help either, because the broker is not part of it
- This is the **dual write problem**, and it has no solution that keeps both writes separate

### Why retrying is not enough

- A retry loop around the publish still loses the event if the process dies mid-loop
- The event exists only in memory. Nothing durable records that it still needs sending

### The shape of the fix

- Stop writing to two systems. Write to **one**, transactionally, and move the second write out of the request
- That single idea is the outbox pattern, on the next page
