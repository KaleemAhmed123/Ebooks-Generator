## Queue acks and prefetch

- If you are using a Queue (like RabbitMQ) instead of a Log, you don't have partitions or offsets. You have per-message state.
- Because the broker pushes messages to the consumer, you must set a brake to avoid overwhelming the consumer's memory. This is called the `prefetch` count (or `basic.qos`). It limits the number of un-Acked messages the broker is allowed to push down the TCP socket

```typescript
// RabbitMQ Consumer with Prefetch and Manual Acks
const channel = await connection.createChannel();

// The Brake: Do not give me more than 100 un-acked messages
await channel.prefetch(100);

channel.consume('invoice-queue', async (msg) => {
  try {
    await processInvoice(msg.content);
    // Success: Tell broker to delete the message
    channel.ack(msg);
  } catch (error) {
    // Failure: Tell broker we failed. 
    // Requeue=true puts it back at the head of the queue
    channel.nack(msg, false, true);
  }
}, { noAck: false }); // noAck: false enforces manual acks
```

- RabbitMQ's documentation notes that a prefetch value in the 100–300 range usually offers optimal throughput. 

### The failure

- `prefetch=0` means unlimited. One consumer hoards the queue. If you set `prefetch=0`, the broker interprets it as "no limit". It will instantly push all 50,000 pending messages into the RAM of the first consumer that connects. If you spin up a second consumer to help with the load, it will sit completely idle because the first consumer has already downloaded (but not yet processed) every message. Your horizontal scaling is defeated by a missing brake
