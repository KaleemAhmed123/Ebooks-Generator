## When Kafka, when a queue

- With both models clear, the choice is mechanical. Reach for a **queue (RabbitMQ / SQS)** when:
  - work is **discrete tasks**, each processed **once** by one of many workers (image resize, email send, a background job);
  - you need **per-message** control — individual ack/retry, **dead-letter queues** for poison messages, priorities, per-message TTL;
  - processing time is **variable or long**, and you want work to spread to whichever worker is free;
  - you need **rich routing** (topic/fanout/direct).
- Reach for a **log (Kafka)** when:
  - **multiple independent consumers** need the same events (billing + inventory + analytics + search all react to "order placed");
  - you need **replay / reprocessing** (new service reads history; fix a bug and re-consume; rebuild a read model);
  - you need **ordering per key** and **very high throughput**;
  - the stream itself is a **source of truth** (event sourcing, CDC, stream processing), retained for days.

:::warn
Both misuses are common and painful. **Kafka as a task queue:** Kafka tracks a single per-partition **offset**, not per-message acks, so there's no natural per-message retry or DLQ — one slow or poison message **blocks its whole partition** behind it, and you can't easily "skip and come back." You end up rebuilding RabbitMQ's features badly on top. **A queue as an event log:** once a message is acked it's **gone**, so you can't add a second consumer that needs the same events, and you can't **replay** history for a new service or a reprocess — the data you needed is already deleted. Match the model to the need; don't force one to do the other's job.
:::

### Module 5 — checkpoint
- **Key concepts:** queue (one consumer, consumed-and-gone) vs log (retained, offsets, multi-consumer, replay) · RabbitMQ (exchanges, acks, DLQ, prefetch) · Kafka (partitions, offsets, consumer groups, ISR, retention, EOS boundary, compaction) · misuse anti-patterns.
- **Task + questions:** queue vs log for (a) resize images, (b) "user signed up" consumed by 4 services with replay; why is a poison message worse in Kafka?
- **Next:** Module 6 — the coordination store.
