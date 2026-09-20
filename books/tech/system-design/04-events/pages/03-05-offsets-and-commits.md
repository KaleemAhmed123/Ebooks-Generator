## Offsets and commits

- A consumer reads a batch of messages, processes them, and then tells the broker "I am done up to this point." This is called **committing an offset**. The offset is simply the index of the next record to read
- By default, most Kafka clients use `enable.auto.commit = true`. This runs a background thread that commits your offset every 5 seconds, completely independently of your application logic

```typescript
// The dangerous default: Auto-commit
const consumer = kafka.consumer({ groupId: 'billing' });

await consumer.run({
  autoCommit: true, // Danger!
  eachMessage: async ({ message }) => {
    // If the process crashes here...
    await chargeCreditCard(message);
    // ...the background thread might have already committed the offset!
  },
});
```

- When you commit an offset, you are declaring: "I have successfully processed all messages up to this point, and I never want to see them again."

### The failure

- Auto-commit gives you at-most-once semantics by accident. If your consumer pulls a batch of messages, and the background thread commits the offset before your application has finished writing to the database, a crash will result in permanent data loss. When the application restarts, it will resume from the committed offset, skipping the messages that were in the middle of processing. You must disable auto-commit and commit manually *after* processing is complete
