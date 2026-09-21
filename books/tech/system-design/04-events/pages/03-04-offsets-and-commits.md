## Offsets and commits

- The **offset** is the position of the next record the consumer will read from a partition. **Committing** it stores that number in Kafka under the group's name. It is the log's acknowledgement: everything before it is done
- The default is `enable.auto.commit=true`, which commits the position reached by the last poll every `auto.commit.interval.ms`, 5 s. The commit is on a timer, not on your processing having finished

```typescript
await consumer.run({
  autoCommit: false,
  eachMessage: async ({ topic, partition, message }) => {
    await apply(message);                     // the effect, committed in the database
    await consumer.commitOffsets([{           // then the ack
      topic, partition,
      offset: (BigInt(message.offset) + 1n).toString(), // next record to read, not this one
    }]);
  },
});
```

- Commit after the effect and a crash between the two replays the record: at-least-once, which is the contract (Module 5). Commit before the effect and a crash loses it
- A commit is a write to an internal topic, so committing per record costs a round trip per record. The usual shape is a batch: process N, commit once, accept N replays on a crash

### The failure

- Auto-commit as accidental at-most-once. The consumer polls 500 records, the timer commits offset 500 while record 120 is still being processed, and the process dies. On restart it reads from 500. Records 120 to 499 were never applied and never will be. No error, no lag, no trace
