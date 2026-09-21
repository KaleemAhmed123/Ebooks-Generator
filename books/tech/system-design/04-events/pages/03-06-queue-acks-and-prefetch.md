## Queue acks and prefetch

- On a queue there are no offsets. Every delivery is acknowledged on its own, and the broker pushes as fast as the consumer lets it. **Prefetch** is the limit on unacknowledged deliveries per channel; RabbitMQ's docs put the usual best throughput at 100 to 300

```typescript
const ch = await conn.createChannel();
await ch.prefetch(100);                       // at most 100 unacked deliveries on this channel
await ch.consume("invoices", async (msg) => {
  if (!msg) return;                           // consumer cancelled by the broker
  try {
    await processInvoice(msg.content);
    ch.ack(msg);                              // delete it
  } catch {
    ch.nack(msg, false, true);                // reject this one, requeue it
  }
}, { noAck: false });                         // manual acks; the safe default
```

- **ack** removes the message. **nack** with requeue puts it back for another delivery; without requeue it is dropped or dead-lettered (Module 6, page 3). A channel that closes with deliveries outstanding has them all requeued, flagged `redelivered`
- The three calls are the whole delivery contract, and the order inside the handler is the point: the effect first, the ack after. Ack first and a crash loses the message, which is auto-ack by another route

### The failure

- `prefetch(0)`. Zero means unlimited. The first consumer to connect is handed the whole queue, 50,000 messages into one process's memory; the second consumer, started to help, receives nothing. Adding workers changes nothing until the first one acks or dies. A missing brake looks exactly like a slow consumer
