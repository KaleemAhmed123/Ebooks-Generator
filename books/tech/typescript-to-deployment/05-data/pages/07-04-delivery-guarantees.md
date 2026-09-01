## Delivery guarantees

- Three guarantees are possible in theory, and only two are available in practice

| Guarantee | Means | Reality |
|---|---|---|
| At most once | never duplicated, may be lost | acknowledge before working. Fast and lossy |
| **At least once** | never lost, may be duplicated | acknowledge after working. What everyone uses |
| Exactly once | never lost, never duplicated | not achievable across a network |

### Why exactly once does not exist

- A consumer finishes the work and then acknowledges. If it dies between those two steps, the broker never heard the acknowledgement
- The broker cannot tell that apart from a consumer that died before doing the work, so it redelivers
- Moving the acknowledgement earlier does not help. Now a crash during the work loses the message instead
- There is no ordering of those two operations that is safe, because they are on different machines

### What people mean when they say exactly once

- At-least-once delivery plus an **idempotent consumer**
- The message may arrive twice, and processing it twice has the same effect as once
- That combination is achievable, and it is the entire reason the next module exists

```ts
await channel.consume(queue, async (msg) => {
  await handle(JSON.parse(msg.content.toString()))
  channel.ack(msg)          // after the work, never before
}, { noAck: false })
```
