## Dead-letter queues and replay

- A **dead-letter queue** is where a message goes after its last attempt: a normal queue or topic, named for the purpose, read by people and tools instead of the handler. SQS: a redrive policy with `maxReceiveCount`. RabbitMQ: a dead-letter exchange on the source queue. Kafka: nothing on the broker; the consumer publishes to a `.dlq` topic itself, and since 4.2 Kafka Streams' exception handlers can do it for you

```typescript
async function deadLetter(rec: Rec, err: Error, attempts: number) {
  await producer.send({ topic: `${rec.topic}.dlq`, messages: [{
    key: rec.key, value: rec.value,               // untouched, so it can be replayed as-is
    headers: {
      "x-source-topic": rec.topic, "x-source-partition": String(rec.partition),
      "x-source-offset": String(rec.offset), "x-attempts": String(attempts),
      "x-error": err.message, "x-failed-at": new Date().toISOString(),
    },
  }] });
}
```

- The envelope is the point of the code. Source topic, partition and offset say where it came from; the error and attempt count say why it is here; the payload is unchanged. Without those, a dead-lettered record is a blob with no way home
- **Replay** is a re-publish to the source topic with the original key, after the cause is fixed. It is a new record at a new offset, not a move, so the consumer sees it in today's order, not yesterday's
- One dead-letter topic per consumer group, not per source topic and not one for everything: the group that failed is the team that fixes it, and replay goes back to the right topic from the header

### The failure

- Nobody reads it. A dead-letter topic with no alert on its depth is a place records go to be forgotten with a clean conscience; the system reports success while data leaves it. Alert at one record, and treat the replay as part of the incident, not a chore for later
