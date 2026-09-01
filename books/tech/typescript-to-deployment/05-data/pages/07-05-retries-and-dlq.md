## Retries and dead letters

- A consumer fails for two different reasons and they need opposite responses
- **Transient**: the database was restarting, the network blipped. Retrying works
- **Permanent**: the message is malformed, or references a row that no longer exists. Retrying never works
- Treating them the same produces a **poison message**, which fails, requeues, fails again, and occupies a consumer forever

### The shape that handles both

```ts
await channel.consume(queue, async (msg) => {
  const attempts = (msg.properties.headers?.["x-attempts"] ?? 0) + 1

  try {
    await handle(JSON.parse(msg.content.toString()))
    channel.ack(msg)
  } catch (err) {
    if (err instanceof PermanentError || attempts >= 5) {
      channel.nack(msg, false, false)      // straight to the dead letter queue
    } else {
      await republishWithDelay(msg, attempts, 2 ** attempts * 1000)
      channel.ack(msg)
    }
  }
}, { noAck: false })
```

### The rules

- `nack` with requeue set to `true` puts the message back at the head, so it retries instantly and forever. Almost never what you want
- **Backoff** must be exponential. Retrying a struggling database every 100ms is an attack on it
- **Cap the attempts.** Five is a reasonable default
- **A dead letter queue is not a bin.** Alert on its depth. A DLQ nobody looks at is data loss with extra steps
