## RabbitMQ, deepened

- **RabbitMQ** is a message **broker** built for flexible routing and reliable work distribution. Producers don't publish to a queue directly — they publish to an **exchange**, which routes the message to queues according to **bindings**. That indirection is the power: the producer doesn't know or care who consumes.
  - **Direct** exchange — route by an exact routing key (`task.pdf` → the pdf queue).
  - **Topic** exchange — route by wildcard patterns (`order.*.eu` → the EU handlers).
  - **Fanout** — copy to every bound queue (broadcast).
- **Reliability** rests on **acknowledgements**. A consumer `ack`s a message only after it has successfully processed it; if the consumer dies first, the broker **redelivers** to another (at-least-once — so your handler must be idempotent, Booklet 3). A message that keeps failing is routed to a **dead-letter queue (DLQ)** after N attempts, so one **poison message** can't block the queue forever.

:::note
Two knobs make RabbitMQ behave in production. **Prefetch (QoS)** bounds how many unacknowledged messages a consumer may hold at once — this is **backpressure** (Booklet 3): set it low and a slow consumer stops hoarding messages it can't process, so work spreads to faster peers; leave it unbounded and one consumer grabs everything then stalls. And **publisher confirms** tell the producer the broker durably accepted a message, closing the dual-write-style gap on the publish side. Default-unbounded prefetch and fire-and-forget publishing are the two most common RabbitMQ foot-guns.
:::

- Where RabbitMQ shines: **task queues** (background jobs, each done once), **RPC/request-reply**, and anything needing **complex routing** or **per-message** handling (priorities, TTLs, DLQs, variable processing time). What it is **not**: a durable event log you replay — once a message is acked it's gone, and it has no offset for a new consumer to re-read history from. For that you want Kafka, next.
