## Dead Letter Queues (DLQ)

- To unblock a partition from a poison message, you must extract the message from the primary flow. 
- A **Dead Letter Queue (DLQ)** is simply another queue or topic where unprocessable messages are sent. After the consumer tries and fails to process a message $N$ times, it writes the message to the DLQ, and then *successfully Acks* the original message, allowing the partition to move forward

```typescript
async function processWithDLQ(message) {
  try {
    await processOrder(message);
    await consumer.commitOffsets([message.offset]); // Success!
  } catch (error) {
    if (message.retries >= 3) {
      // 1. Write to the DLQ first
      await producer.send({
        topic: 'orders-dlq',
        messages: [{ value: message.value, headers: { error: error.message } }]
      });
      // 2. Ack the original message to unblock the partition
      await consumer.commitOffsets([message.offset]); 
    } else {
      throw error; // Let it retry
    }
  }
}
```

- Engineers can then manually inspect the DLQ, fix the bug in the code, and replay the messages from the DLQ back into the main topic.

### The failure

- Silently dropping to a DLQ that no one monitors. A DLQ is effectively a trash can. If you route messages to a DLQ and never look at it, you haven't solved the problem; you've just built a system that silently drops user data. You must have strict monitoring and alerting on the depth of your DLQ. If the DLQ has more than 0 messages, an engineer should be paged to investigate why data is failing to process
