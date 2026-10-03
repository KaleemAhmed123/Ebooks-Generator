## Kafka delivery and compaction

- A Kafka consumer's progress is just its **committed offset**, and *when* it commits decides the delivery semantics (Booklet 3):
  - commit the offset **after** processing → **at-least-once** (crash between processing and commit → reprocess the record; the default, needs idempotent handlers).
  - commit **before** processing → **at-most-once** (crash → the record is skipped; rarely what you want).
- Kafka also offers **exactly-once semantics (EOS)** — but read the boundary carefully. The **idempotent producer** stops a producer retry from writing a record twice to the log, and **transactions** let a consume-process-produce loop commit its output records **and** its input offsets atomically. That gives exactly-once **within Kafka** (Kafka-to-Kafka pipelines). The moment your consumer writes to an **external** database or calls an API, Kafka's transaction can't cover it, and you are back to **at-least-once + your own idempotency key** (Booklet 3). "Kafka is exactly-once" is true only inside Kafka's own boundary.
- **Retention has two modes.** Time/size retention (keep 7 days, then delete) is the default — a classic event stream. **Log compaction** is the other: keep **only the latest record per key**, forever. That turns a topic into a **durable changelog of current state** — replay it from the start and you rebuild the latest value of every key. It's how Kafka backs **event sourcing** and **state stores** (Booklet 3's CQRS read models, Kafka Streams' state), and how compacted topics like `__consumer_offsets` work.

:::note
The mental model that ties it together: a compacted Kafka topic **is** an event-sourced table (Booklet 3). The log of keyed changes is the source of truth; compaction keeps the current value per key; a consumer that folds the log builds a materialised view. This is why Kafka + CDC (the WAL-tailing from Module 1's outbox) is the backbone of modern event-driven data platforms — the database's change log becomes a replayable, multi-consumer stream, with exactly-once *effect* supplied by idempotent consumers at the edges.
:::
