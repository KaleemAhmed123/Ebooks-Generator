## Consuming safely

```ts
await channel.prefetch(10)

await channel.consume("email-service", async (msg) => {
  if (!msg) return

  try {
    const event = JSON.parse(msg.content.toString())
    await handle(event)
    channel.ack(msg)
  } catch (err) {
    logger.error({ err }, "handler failed")
    channel.nack(msg, false, false)   // do not requeue, send to the DLQ
  }
}, { noAck: false })
```

- **`prefetch`** caps unacknowledged messages per consumer. Without it one consumer grabs the whole queue
- `ack` only after the work succeeded. Acking first loses the message on a crash
- `nack(msg, false, true)` requeues, and a message that always fails then loops forever
