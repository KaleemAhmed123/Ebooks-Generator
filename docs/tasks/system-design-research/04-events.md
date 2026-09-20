# 04 — Messaging & Event-Driven — research output

Booklet folder: `04-events`. Rough-file sections read: §34–48, §57.
Researched 2026-09-19 against the primary sources in §6. Latest versions seen
that day: Apache Kafka 4.3.1 (docs "AK 4.3.X", modified 2026-05-22), RabbitMQ
4.x docs, Debezium "stable" docs, Apache Flink 2.3.0, PostgreSQL 18, Avro
1.12.0, CloudEvents 1.0.3-wip.

Scope hand-offs: booklet 03 owns the transactional reasoning behind sagas, 2PC
and isolation; this booklet owns the message flow. Booklet 05 owns sync-vs-async
as a service-communication choice; this booklet keeps only the "why a broker"
half and says so on the page.

---

## 1. Modules and pages

107 pages. One A5 page = one idea, one example, one failure mode.

### Module 01 — Why a broker at all (6 pages)

- `01-01-the-request-that-does-too-much` — The request that does too much — a `POST /orders` that also emails, bills and reindexes fails if any of them fails — failure: p99 latency is the sum of every downstream p99 — svg (one request fanning to four sync calls, latencies stacking)
- `01-02-temporal-decoupling` — Temporal decoupling — a broker lets the producer finish before the consumer starts; a dead consumer is a backlog, not an outage — failure: "the queue is now the outage", backlog grows silently — svg (producer / broker buffer / greyed-out consumer)
- `01-03-load-levelling` — Load levelling — a queue absorbs a 10× burst and drains it at the consumer's rate — failure: drain time longer than the burst interval means the queue never empties — svg (spiky input, flat output)
- `01-04-fan-out-without-knowing-who-listens` — Fan-out — one event, N consumers the producer never learns about — failure: the payload becomes an implicit contract for consumers the producer cannot see — svg
- `01-05-what-async-costs-you` — What async costs — eventual consistency, duplicates, reordering, no return value, a second system to run — failure: "we went async and now nobody can answer 'did it happen yet?'" — table (sync vs async)
- `01-06-the-request-reply-trap` — Request-reply over a queue — correlation ids and reply queues rebuild RPC on a broker and inherit both failure sets — failure: waiting on a reply that never comes because the reply queue was recreated — code (TS: correlationId + replyTo)

### Module 02 — Three broker models (8 pages)

- `02-01-queue-model` — The queue model — one message, one consumer, broker tracks delivery, delete on ack (RabbitMQ, SQS) — failure: competing consumers destroy ordering — svg
- `02-02-pub-sub-model` — The pub/sub model — one message copied to every subscription; exchange/topic decides who gets a copy — failure: a subscription nobody reads fills the broker (SNS→SQS, RabbitMQ fanout) — svg
- `02-03-partitioned-log-model` — The partitioned log — append-only, consumers keep a position, nothing deleted on read (Kafka, Pulsar, Kinesis, Redis Streams) — failure: reading is cheap so people forget retention deletes under them — svg (log with two consumer cursors)
- `02-04-broker-tracks-vs-consumer-tracks` — Who tracks "consumed" — per-message ack state on the broker (queue) vs one integer per partition (log), Kafka's own reasoning — failure: per-message ack state is what caps a queue broker's throughput — table
- `02-05-push-vs-pull` — Push vs pull — brokers push to queue consumers (prefetch is the brake); log consumers pull with long-poll — failure: push overwhelms a slow consumer with no prefetch; pull busy-loops with no long-poll — svg
- `02-06-rabbitmq-in-one-page` — RabbitMQ model — exchange → binding → queue; ack / nack / requeue; quorum queues are Raft-replicated — failure: auto-ack is at-most-once and the docs call it unsafe — svg (exchange, bindings, two queues)
- `02-07-kafka-in-one-page` — Kafka model — topic → partitions → replicas → ISR; key → partition; consumer group → offsets — failure: `acks=all` means "all *in-sync* replicas", and with `min.insync.replicas=1` that can be one — svg
- `02-08-the-model-decides-the-guarantees` — Choosing the model — queue for work distribution, pub/sub for notification, log for replay / ordering / many independent readers; Kafka 4.2 share groups blur the line — failure: picking Kafka for a job queue and then fighting partition-bound parallelism — table (ordering / replay / parallelism / delete-on-read per model)

### Module 03 — Producers, consumers, groups, offsets, acks (10 pages)

- `03-01-producer-acks` — Producer acks — `acks=0/1/all`; committed = all ISR replicas have it; ~10 ms to wait for commit per Kafka docs — failure: `acks=1` loses data on leader failover — svg (leader + 2 followers, ack point)
- `03-02-min-insync-replicas` — `min.insync.replicas` — RF=3, min ISR=2, `acks=all` gives majority durability; default min ISR is 1 — failure: RF=3, min ISR=1, two brokers down: writes to one replica are silently accepted — table
- `03-03-producer-batching-and-linger` — Batching and `linger.ms` — the producer groups records per partition; latency traded for throughput — failure: `linger.ms=0` at volume floods the broker with tiny requests — code (TS producer config)
- `03-04-consumer-groups` — Consumer groups — each partition is read by exactly one consumer in a group; groups are independent — failure: more consumers than partitions = idle consumers — svg (6 partitions, group A × 3, group B × 1)
- `03-05-offsets-and-commits` — Offsets and commits — the offset is the next record to read; committing is the ack; `enable.auto.commit=true` every 5 s by default — failure: auto-commit after poll, before processing = at-most-once you did not ask for — code (TS: commit after process)
- `03-06-rebalances` — Rebalances — a member joins or dies, partitions move, processing pauses; static membership (`group.instance.id`) avoids it on deploy — failure: `max.poll.interval.ms` (5 min default) exceeded → consumer evicted → rebalance storm — svg (timeline)
- `03-07-queue-acks-and-prefetch` — Queue acks and prefetch — manual ack, nack with requeue, `basic.qos` caps unacked deliveries (RabbitMQ: 100–300 usually optimal) — failure: prefetch 0 = unlimited, one consumer hoards the queue — code (TS amqplib: prefetch + ack)
- `03-08-visibility-timeout` — Visibility timeout — SQS hides a received message for 30 s by default, up to 12 h; not deleting it means redelivery — failure: processing outlives the timeout → a second consumer gets the same message mid-flight — svg (timeline)
- `03-09-share-groups-queues-on-a-log` — Share groups: queues on a log — production-ready in Kafka 4.2: per-record acks, delivery counting, 30 s acquisition lock, consumers may exceed partition count — failure: you give up per-partition ordering the moment you use them — table (consumer group vs share group)
- `03-10-consumer-lag` — Consumer lag — end offset minus committed offset per partition is the one metric that says "we are falling behind" — failure: alerting on the sum hides one stuck partition — svg (bar per partition, one tall)

### Module 04 — Partitions, keys, ordering (8 pages)

- `04-01-why-partition` — Why partition — a partition is the unit of parallelism and of ordering; one partition lives on one server — failure: one partition = one consumer = your ceiling — svg
- `04-02-key-to-partition` — Key → partition — `hash(key) % partitions` by default; no key → sticky partition per batch — failure: low-cardinality keys (country, tenant) make a hot partition — code (TS: choosing the key)
- `04-03-ordering-is-per-partition` — Ordering is per partition — Kafka guarantees a partition is read in write order; nothing across partitions — failure: two events for one order with different keys land on different partitions and arrive swapped — svg
- `04-04-per-key-ordering-elsewhere` — Per-key ordering in other brokers — SQS FIFO `MessageGroupId`, Pub/Sub ordering keys (1 MBps per key), Kafka key — failure: an ordering key is a serial lane; Pub/Sub redelivers everything after an unacked message in that key — table
- `04-05-global-ordering-kills-scale` — Why global ordering kills scale — total order needs one lane; one lane = one writer, one reader, one disk — failure: "just use one partition" until it cannot keep up and cannot be split — svg (one lane vs many)
- `04-06-adding-partitions-breaks-keys` — Adding partitions re-maps keys — existing data is not moved; the same key may now go elsewhere; partitions cannot be reduced — failure: ordering for in-flight keys breaks during expansion — svg (hash mapping before / after)
- `04-07-producer-side-reordering` — Producer-side reordering — retries with `max.in.flight > 1` and idempotence off can reorder; idempotence on (default) keeps order up to 5 in flight — failure: turning idempotence off "for performance" reintroduces reordering — code (TS config)
- `04-08-choosing-partition-count` — Choosing a partition count — max consumers you will ever want, per-partition throughput, cannot shrink so over-provision — failure: thousands of partitions per topic × many topics slows controller failover — table (qualitative; see §5)

### Module 05 — Delivery semantics (10 pages)

- `05-01-the-three-semantics` — At-most-once, at-least-once, exactly-once — Kafka's own definitions; "breaks down into two problems: publishing and consuming" — failure: people say "exactly-once" and mean four different things — table
- `05-02-where-duplicates-come-from` — Where duplicates come from — producer retry after a lost ack; consumer crash after processing, before commit; broker redelivery after timeout — failure: every "reliable" setting adds a duplicate path — svg (three arrows, three crash points)
- `05-03-at-most-once-by-construction` — At-most-once by construction — retries off, commit before processing (Kafka docs' recipe); RabbitMQ auto-ack — failure: this is what auto-commit gives you by accident — code
- `05-04-at-least-once-by-construction` — At-least-once by construction — retries on, process then commit, manual ack — failure: retries + no idempotence = double charge — code
- `05-05-idempotent-producer` — Idempotent producer — producer id + per-partition sequence number; broker dedupes; on by default — failure: it dedupes retries within one producer session, not your app re-sending a new message — svg (sequence numbers)
- `05-06-kafka-transactions` — Kafka transactions — atomic writes across partitions plus the consumer offset; `transactional.id`; zombie fencing by epoch; `read_committed` — failure: consumer default is `read_uncommitted`, so readers see aborted data unless told otherwise — svg (txn spanning input offset + two output partitions)
- `05-07-what-kafka-eos-actually-guarantees` — What Kafka EOS actually guarantees — exactly-once for read-process-write between Kafka topics (Streams `exactly_once_v2`); external systems "require cooperation"; producer, not consumer, is transactional — failure: an HTTP call inside a Kafka transaction is not in the transaction — table (covered / not covered)
- `05-08-exactly-once-is-effectively-once` — Effectively-once across a database — store the offset in the same transaction as the output (Kafka docs' own advice) — failure: two commit points, two sources of truth — svg (offset + output in one DB txn)
- `05-09-idempotent-consumer` — Idempotent consumer — natural idempotency (upsert by key) beats a dedup table; use one only when there is no natural key — failure: "set status=paid" is idempotent, "balance += 10" is not — code (TS upsert)
- `05-10-dedup-table` — The dedup table — `(consumer, message_id)` unique row inserted in the same DB transaction as the effect; TTL it — failure: dedup row in a separate transaction reopens the gap it was meant to close — code (TS: dedup insert + effect in one tx)

### Module 06 — Retries, poison messages, DLQ, backpressure (10 pages)

- `06-01-retry-in-the-consumer` — Retrying in place — a retry loop blocks the partition (Kafka) or holds the prefetch slot (queue) — failure: one bad message stalls everything behind it — svg (head-of-line block)
- `06-02-retry-topics` — Retry topics with delay — `orders.retry.1m` → `orders.retry.10m` → DLQ; the consumer re-publishes instead of blocking — failure: retry topics break per-key ordering by design — svg (main → retry → dlq)
- `06-03-poison-messages` — Poison messages — fails every time; count deliveries and stop; RabbitMQ quorum queues default `delivery-limit` 20 (since 4.0), `x-delivery-count` header; Kafka share groups count deliveries — failure: infinite requeue with no counter — table
- `06-04-dead-letter-queues` — Dead-letter queues — where messages go after N attempts; SQS redrive `maxReceiveCount`, RabbitMQ DLX, Kafka has no broker DLQ (you publish one; Streams got DLQ handlers in 4.2) — failure: nobody reads the DLQ; it becomes a silent data-loss bucket — svg
- `06-05-dlq-replay-and-triage` — Replaying a DLQ — keep source topic, partition, offset, error, attempt in headers; replay is a re-publish, not a copy — failure: replaying out of order into a keyed topic — code (TS: DLQ envelope)
- `06-06-retriable-vs-terminal` — Retriable vs terminal failures — timeout / 5xx / lock contention retry; validation / 4xx / schema go straight to DLQ — failure: retrying a 400 twenty times before dead-lettering — table
- `06-07-backpressure` — Backpressure — the consumer tells the producer how much it can take (Reactive Streams `request(n)`); pull-based logs get it for free — failure: unbounded in-memory buffers "handle" it until OOM — svg
- `06-08-load-shedding` — Load shedding — when the backlog cannot drain in time, drop or reject at the edge on purpose; bounded queue + `reject-publish` overflow (RabbitMQ) — failure: shedding at random instead of by priority or age — svg
- `06-09-backlog-math` — Backlog math — drain time = backlog ÷ (consume rate − produce rate); negative means no amount of waiting helps — failure: adding consumers past the partition count changes nothing — table (worked numbers)
- `06-10-slow-consumer-isolation` — Isolating slow consumers — one topic, separate groups: a slow analytics reader must not stall billing; on queues, one queue per consumer type — failure: shared queue, shared fate — svg

### Module 07 — Retention, replay, compaction (5 pages)

- `07-01-retention` — Retention — Kafka `retention.ms` default 7 days, `retention.bytes` unlimited; SQS 4 days default, 14 max — failure: a consumer down longer than retention loses data with no error — table
- `07-02-replay` — Replay — reset a group's offset and rerun history into a fixed consumer — failure: replay re-fires side effects unless the consumer is idempotent — svg (cursor moved back)
- `07-03-log-compaction` — Log compaction — keep the last value per key forever; the changelog of a table — failure: tombstones (null value) are removed after `delete.retention.ms` (24 h default), so a slow scan from 0 misses deletes — svg (before / after)
- `07-04-topic-as-table` — A compacted topic as a table — stream/table duality: a stream is a table's changelog, a table is the stream's latest-per-key — failure: reading a compacted topic from 0 is not a consistent snapshot while writes continue — svg
- `07-05-long-retention-and-its-cost` — Long retention — tiered storage moves old segments to object storage; "keep everything" is a storage bill and a replay-time bill — failure: a replay from day 0 takes days — table

### Module 08 — Dual writes, outbox, CDC (9 pages)

- `08-01-the-dual-write-problem` — The dual-write problem — DB commit then publish: crash in between, or publish then DB fails; no transaction spans both — failure: the order exists and payment never hears — svg (two arrows, crash marker)
- `08-02-why-not-2pc-here` — Why not 2PC across DB and broker — most brokers do not support it and it couples availability (booklet 03 owns the protocol) — failure: XA between Postgres and Kafka is not a thing — none
- `08-03-transactional-outbox` — The transactional outbox — business row and outbox row in one local transaction; a relay publishes — failure: the relay is at-least-once, so consumers must be idempotent — svg (txn box with two rows, relay arrow)
- `08-04-polling-publisher` — Polling publisher — `SELECT … FOR UPDATE SKIP LOCKED` pulls unsent rows, publishes, marks sent — failure: crash between publish and mark-sent = duplicate (that is the contract) — code (TS + SQL)
- `08-05-outbox-row-shape` — Outbox row shape — `id, aggregatetype, aggregateid, type, payload, created_at`; `aggregateid` becomes the Kafka key so per-aggregate order survives — failure: no key → one order's events scatter across partitions — table
- `08-06-change-data-capture` — Change data capture — read the DB's own WAL instead of polling; Postgres logical decoding, `pgoutput`, replication slot; Debezium as the example — failure: a slot retains WAL while the connector is down; `max_slot_wal_keep_size` defaults to -1 (unlimited) so the disk fills — svg (WAL → slot → connector → topic)
- `08-07-cdc-event-shape` — The CDC event — `before`, `after`, `op` (c/u/d/r), `ts_ms`; snapshot first, then stream; at-least-once — failure: treating a snapshot `r` like a live `c` and re-firing side effects — code (JSON event)
- `08-08-outbox-via-cdc` — Outbox via CDC — Debezium's outbox event router: insert-only table, route by `aggregatetype`, key by `aggregateid`, delete the row right after insert because the log has it — failure: updating an outbox row breaks the insert-only assumption — svg
- `08-09-listen-to-yourself` — Listen-to-yourself — publish first, apply on consume; when CDC is unavailable; what you lose (read-your-writes) — failure: the API returns 200 before the DB has the row — svg

### Module 09 — Event sourcing and CQRS (8 pages)

- `09-01-state-vs-events` — Store state or store events — a row that overwrites vs an append-only log that explains; state = fold(events) — failure: "we'll add history later" is a rewrite — svg (ledger vs balance)
- `09-02-event-sourcing` — Event sourcing — every change is an event; state is rebuilt by replay; complete rebuild, temporal query, event replay (Fowler) — failure: replay re-runs calls to external systems unless the gateway knows it is replaying — code (TS: reduce over events)
- `09-03-snapshots` — Snapshots — periodic checkpoint so replay starts from the last snapshot — failure: snapshot schema drifts from the fold and nobody notices until a rebuild — svg
- `09-04-event-store-vs-broker` — An event store is not a message broker — per-aggregate streams, optimistic concurrency on expected version, read by stream id; a topic is none of those — failure: Kafka as system of record with no per-key reads or version checks — table
- `09-05-cqrs` — CQRS — separate write model and read models; read models are projections fed by events — failure: read model is eventual and the UI does read-after-write — svg
- `09-06-projections` — Projections — a consumer folds events into a query-shaped table; rebuildable; one per screen if needed — failure: projection needs idempotent, per-aggregate-ordered apply or it drifts — code (TS projection handler)
- `09-07-when-they-pay-off` — When they pay off — audit is the product (ledger, compliance), many read shapes, temporal questions — failure: adopting both for a CRUD admin panel — table (pays / does not)
- `09-08-when-they-do-not` — When they do not — event versioning forever, GDPR delete on an immutable log (crypto-shredding), query-by-anything needs a projection first — failure: "delete my data" against an append-only store — none

### Module 10 — Sagas as message flow (5 pages)

Booklet 03 owns compensation semantics, isolation anomalies and countermeasures. These pages show only the plumbing.

- `10-01-saga-as-a-chain-of-messages` — A saga is local transactions joined by messages — each step commits locally and emits; failure emits compensations backwards — failure: a step that commits but never emits (dual write again) — svg (steps with events between)
- `10-02-choreography-flow` — Choreography — each service reacts to the last event; no coordinator — failure: the workflow exists only in N subscriptions and no one can draw it — svg (ring of services)
- `10-03-orchestration-flow` — Orchestration — one orchestrator sends commands, consumes replies; the workflow is one state machine — failure: orchestrator state must itself go through an outbox or a crash mid-saga strands it — svg (hub and spokes)
- `10-04-commands-vs-events` — Commands vs events — a command is addressed and can be rejected; an event is a fact and cannot — failure: an event that is a command in disguise (`ShipOrderPlease`) — table
- `10-05-saga-message-contract` — Saga message contract — saga id, step, correlation id, causation id on every message; per-step timeouts — failure: no correlation id, no way to find the stuck saga at 3am — code (TS envelope)

### Module 11 — Event schema design and evolution (8 pages)

- `11-01-the-event-envelope` — The envelope — CloudEvents required set `id`, `source`, `specversion`, `type`, plus `time`, `subject`, `data`; `source+id` unique so consumers may dedupe — failure: no id, no dedup — code (JSON)
- `11-02-fat-vs-thin-events` — Fat vs thin — notification ("order 42 changed, go ask") vs state transfer ("here is order 42 now"), Fowler's two patterns — failure: thin events cause a read storm on the producer; fat events copy data everywhere — table
- `11-03-naming-and-granularity` — Naming and granularity — past-tense facts per aggregate (`OrderPlaced`), not table diffs (`OrdersRowUpdated`) — failure: one `EntityChanged` with a `changes` blob every consumer parses differently — table
- `11-04-schema-formats` — Schema formats — Avro, Protobuf, JSON Schema; binary needs a registry, JSON needs discipline — failure: JSON with no schema and a field that changes type — table
- `11-05-schema-registry` — The registry — producer registers, message carries a schema id, consumer fetches; compatibility checked at register time — failure: registry down = producers cannot register new versions — svg
- `11-06-compatibility-modes` — Compatibility modes — BACKWARD (consumers first, the default), FORWARD (producers first), FULL (either), transitive variants — failure: BACKWARD with a required new field breaks old data on replay — table
- `11-07-evolution-rules-by-format` — Evolution rules — Avro: reader default required for new fields, writer's extra fields ignored, aliases; Protobuf: never reuse field numbers, `reserved` removed ones, unknown fields preserved — failure: renumbering a proto field = deleting it — code (proto + avsc snippets)
- `11-08-versioning-the-event` — Versioning strategies — additive-only forever, `v2` type name, new topic, upcasting on read — failure: a breaking change on a topic with 7 days of retention and a replaying consumer — table

### Module 12 — Stream processing basics (10 pages)

- `12-01-what-a-stream-processor-is` — A stream processor — read, keep state, emit; state is local and checkpointed; Kafka Streams and Flink as examples — failure: stateless workers cannot count — svg
- `12-02-event-time-vs-processing-time` — Event time vs processing time — when it happened vs when we saw it; Kafka adds ingestion time — failure: analytics on processing time change answers on every replay — svg (skew plot)
- `12-03-windows` — Windows — tumbling (fixed, non-overlapping), hopping (fixed, overlapping), sliding (by record-time difference), session (gap-based) — failure: hopping windows count each event size/advance times, inflating sums — svg (four timelines)
- `12-04-watermarks` — Watermarks — "event time has reached t; expect nothing older" (Flink); an operator's clock is the min over its inputs — failure: one idle partition holds the watermark back forever — svg
- `12-05-late-events` — Late events — grace period / allowed lateness; after that drop, or side output — failure: grace of 0 drops every mobile event that arrives after a tunnel — table
- `12-06-triggers-and-accumulation` — When to emit — on watermark, early speculative results, late updates (Dataflow: correctness vs latency vs cost) — failure: downstream treats every emission as final — svg
- `12-07-joins-at-a-glance` — Joins — stream-table (enrich with latest), stream-stream (windowed), table-table — failure: stream-stream join with no window is unbounded state — svg
- `12-08-state-and-checkpoints` — State and checkpoints — local RocksDB + changelog topic (Streams) or periodic snapshots (Flink); restart restores — failure: state rebuild time after a crash equals your outage — svg
- `12-09-exactly-once-in-a-pipeline` — Exactly-once inside a pipeline — checkpoint input position and state together; Streams `exactly_once_v2`, Flink checkpoint + transactional sink — failure: the sink is the boundary again (05-07) — table
- `12-10-hot-keys-in-streams` — Hot keys — one key with most of the traffic pins one task; salt the key, pre-aggregate, merge — failure: `null` or `unknown` becomes the hottest key — svg

### Module 13 — Batch vs stream (3 pages)

- `13-01-mapreduce-mental-model` — MapReduce — map emits `(k, v)`, shuffle groups by key, reduce merges; failed tasks re-run (OSDI 2004) — failure: a reduce with one giant key — svg (map / shuffle / reduce)
- `13-02-batch-vs-stream` — Batch vs stream — bounded input, complete answer, high latency vs unbounded, incremental, low latency; a stream engine can replay a bounded log to do batch — failure: batch every 5 minutes called streaming — table
- `13-03-lambda-and-kappa` — Lambda vs kappa — two pipelines that must agree vs one log replayed at two speeds — failure: two implementations of one metric drift — svg

### Module 14 — Event-driven pitfalls (7 pages)

- `14-01-event-chains-nobody-can-trace` — Event chains nobody can trace — five services, twelve topics, the flow exists nowhere in code (Fowler's warning) — failure: a change in A breaks E and the deploy log shows nothing — svg (tangled graph)
- `14-02-correlation-and-causation-ids` — Correlation and causation ids — carry the request id and the id of the event that caused this one — failure: ids not propagated through the outbox — code (TS: copy headers on emit)
- `14-03-notification-vs-state-transfer-in-practice` — Choosing per event type — who needs to act vs who needs the data — failure: state-transfer events leak internal fields that become external API — table
- `14-04-the-distributed-monolith` — The distributed monolith over a broker — services that cannot deploy independently because every event is a shared struct — failure: one schema change, twelve deploys — svg
- `14-05-events-are-public-api` — Events are public API — ownership, deprecation windows, a registry of who consumes what — failure: a "temporary" event consumed by three teams forever — table
- `14-06-eventual-consistency-in-the-ui` — Eventual consistency meets the UI — read-your-writes after an async write: return the write result, poll, or push — failure: user creates, list is empty, user creates again — svg
- `14-07-testing-event-flows` — Testing an event flow — contract tests on the schema, consumer tests with recorded events, no broker in unit tests — failure: the only test is production — code (TS: handler test with a fixture event)

---

## 2. What the rough file missed

- **Share groups (queues for Kafka).** Production-ready in Kafka 4.2 (2026-02-17). Changes the "Kafka is not a queue" answer interviewers still expect. https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/
- **The idempotent producer and its boundary.** On by default; dedupes retries within a producer session per partition, not application re-sends. https://kafka.apache.org/43/configuration/producer-configs/
- **Kafka transactions' real scope.** Read-process-write between Kafka topics; external systems need the offset stored with the output. The rough file says "that's incomplete" and stops. https://kafka.apache.org/43/design/design/
- **`acks=all` vs `min.insync.replicas`.** `acks=all` alone can be one replica; default min ISR = 1. https://kafka.apache.org/43/configuration/topic-configs/
- **Auto-commit as the accidental at-most-once.** `enable.auto.commit=true`, 5 s interval. https://kafka.apache.org/43/configuration/consumer-configs/
- **Rebalances and static membership.** The first operational failure most on-call engineers meet. https://kafka.apache.org/43/design/design/
- **Adding partitions re-maps keys; partitions cannot be reduced.** https://kafka.apache.org/43/operations/basic-kafka-operations/
- **Log compaction and tombstones.** Absent entirely. https://kafka.apache.org/43/design/design/
- **Poison messages with a delivery counter.** RabbitMQ quorum queues default delivery limit 20 since 4.0. https://www.rabbitmq.com/docs/quorum-queues
- **Visibility timeout as the queue-side redelivery mechanism.** SQS default 30 s, max 12 h. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
- **Change data capture.** Absent. Debezium Postgres connector, replication slots, WAL retention risk. https://debezium.io/documentation/reference/stable/connectors/postgresql.html and https://www.postgresql.org/docs/current/logicaldecoding-explanation.html
- **Outbox via CDC and the outbox row shape.** https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html
- **Event sourcing and CQRS.** Absent. https://martinfowler.com/eaaDev/EventSourcing.html
- **Event schema evolution and compatibility modes.** Absent. https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html
- **Format-level evolution rules.** https://avro.apache.org/docs/1.12.0/specification/ and https://protobuf.dev/programming-guides/proto3/#updating
- **The event envelope.** CloudEvents required attributes and the `source+id` dedup rule. https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md
- **Watermarks, windows, late data.** One paragraph on event time, nothing on the mechanism. https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/
- **Window types by name.** https://kafka.apache.org/43/streams/developer-guide/dsl-api/
- **Notification vs state-transfer events; fat vs thin.** https://martinfowler.com/articles/201701-event-driven.html
- **Backpressure as a protocol, not a buffer.** https://github.com/reactive-streams/reactive-streams-jvm/blob/master/README.md
- **Polling publisher with `SKIP LOCKED`.** https://www.postgresql.org/docs/current/sql-select.html
- **Per-key ordering outside Kafka.** Pub/Sub ordering keys, SQS FIFO message groups. https://docs.cloud.google.com/pubsub/docs/ordering

## 3. What the rough file has that should be cut or moved

- **§42 "Future of data systems" polyglot diagram** — cut. A slogan, not a mechanism. One sentence in 13-02 covers it.
- **§43–44 microservices and database ownership** — booklet 05. This booklet assumes per-service databases and starts at the dual-write problem.
- **§47 sync vs async as a communication choice** (latency compounding, "use async where sync coupling isn't necessary") — booklet 05. Module 01 keeps only the broker half and says so.
- **§20 saga transactional reasoning** (compensation, isolation, countermeasures) — booklet 03. Module 10 is plumbing only.
- **§34 batch processing "10 TB of logs"** — keep as one page (13-01), not a module.
- **§40 backpressure solution list** ("more consumers, batch processing, rate limiting, load shedding, buffering, consumer scaling") — wrong as written: more consumers does nothing past the partition count, and buffering is what causes the blow-up. Replaced by 06-07 to 06-09.
- **§38 "at-least-once + idempotent processing is often the practical approach"** — right conclusion, no mechanism. Expanded into Module 05.
- **§57 mental tree** — a module map, not a page.
- **Rare, skip:** KRaft internals, tiered storage tuning, MirrorMaker, Pulsar segment architecture, Redis Streams `XAUTOCLAIM`, NATS JetStream. Named as examples at most.

## 4. Facts to get right

Verified 2026-09-19 unless noted.

**Kafka (docs "AK 4.3.X", modified 2026-05-22; latest release 4.3.1, 2026-06-25)**

- Delivery definitions, verbatim: "At most once – Messages may be lost but are never redelivered. At least once – Messages are never lost but may be redelivered. Exactly once – Each message is processed once and only once." https://kafka.apache.org/43/design/design/
- "Kafka guarantees at-least-once delivery by default, and allows the user to implement at-most-once delivery by disabling retries on the producer and committing offsets in the consumer prior to processing a batch of messages." Same page.
- EOS scope, verbatim: "Kafka supports exactly-once delivery in Kafka Streams, and the transactional producer and the consumer using read-committed isolation level can be used generally to provide exactly-once delivery when reading, processing and writing data on Kafka topics. Exactly-once delivery for other destination systems generally requires cooperation with such systems." Same page.
- External systems: "letting the consumer store its offset in the same place as its output." Same page.
- "In Kafka, the consumer and producer are separate, and it is only the producer which is transactional." Same page.
- Idempotent producer: "the broker assigns each producer an ID and deduplicates messages using a sequence number that is sent by the producer along with every message." Since 0.11.0.0. Same page.
- Committed = "all replicas in the in-sync replicas (ISR) for that partition have applied it to their log." Waiting for commit "can take on the order of 10 ms." Same page.
- `acks=all` "does not guarantee that the full set of assigned replicas have received the message"; with two replicas and one down, writes still succeed. Same page.
- Consumer position: each partition "is consumed by exactly one consumer within each subscribing consumer group at any given time"; the position is "just a single integer." Same page.
- Ordering: "Kafka guarantees that any consumer of a given topic-partition will always read that partition's events in exactly the same order as they were written." https://kafka.apache.org/43/getting-started/introduction/
- Adding partitions: "the default partitioner's mapping logic changes when the partition count increases … Kafka will not attempt to automatically redistribute existing data." "Kafka does not currently support reducing the number of partitions for a topic." https://kafka.apache.org/43/operations/basic-kafka-operations/
- Producer defaults: `acks=all`; `enable.idempotence=true`; `max.in.flight.requests.per.connection=5` (ordering preserved with idempotence for ≤5); `retries=2147483647`; `delivery.timeout.ms=120000`; default partitioner = hash of key if present, else sticky partition per batch; `transactional.id` default null. https://kafka.apache.org/43/configuration/producer-configs/
- Consumer defaults: `enable.auto.commit=true`; `auto.commit.interval.ms=5000`; `max.poll.interval.ms=300000`; `max.poll.records=500`; `session.timeout.ms=45000`; `isolation.level=read_uncommitted`; `group.protocol=classic`; `auto.offset.reset` ∈ earliest / latest / by_duration / none. https://kafka.apache.org/43/configuration/consumer-configs/
- Topic defaults: `retention.ms=604800000` (7 days); `retention.bytes=-1`; `min.insync.replicas=1`. https://kafka.apache.org/43/configuration/topic-configs/
- Broker defaults: `message.max.bytes=1048588`; `log.retention.hours=168`; `offsets.retention.minutes=10080`; `log.cleaner.delete.retention.ms=86400000` (1 day). https://kafka.apache.org/43/configuration/broker-configs/
- Compaction: "A message with a key and a null payload will be treated as a delete from the log … tombstone"; tombstones kept for `delete.retention.ms` (default 24 hours). https://kafka.apache.org/43/design/design/
- Share groups: "partitions may be assigned to multiple consumers"; "The number of consumers in a share group can exceed the number of partitions in a topic"; "Records are acknowledged individually"; "Delivery attempts to consumers in a share group are counted"; lock default 30 seconds (`share.record.lock.duration.ms`); actions acknowledge / release / reject / renew. Same page.
- Share groups "now production-ready" in 4.2.0 (2026-02-17); Kafka Streams DLQ support in exception handlers (KIP-1034) also 4.2.0. https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/
- Kafka Streams: default `processing.guarantee=at_least_once`; `exactly_once_v2` needs brokers ≥ 2.5; stream/table duality; event / processing / ingestion time; grace period "controls how long Kafka Streams will wait for out-of-order data records for a given window." https://kafka.apache.org/43/streams/core-concepts/
- Window definitions: tumbling "Fixed-size, non-overlapping, gap-less"; hopping "Fixed-size, overlapping"; sliding "Fixed-size, overlapping windows that work on differences between record timestamps"; session "Dynamically-sized, non-overlapping, data-driven". https://kafka.apache.org/43/streams/developer-guide/dsl-api/
- Confluent EOS blog (Narkhede & Wang, 2017-06-30, updated 2025-03): idempotent producer "throughput declines only by 3%"; Streams EOS at 100 ms commit interval costs 15–30% throughput. Vendor blog; use only for these figures. https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/

**RabbitMQ (4.x docs)**

- Unacked deliveries are "automatically requeued when the channel (or connection) on which the delivery happened is closed"; redeliveries carry `redelivered=true`. Automatic ack "should be considered unsafe." Prefetch "defines the max number of unacknowledged deliveries that are permitted on a channel"; 0 = unlimited; "Values in the 100 through 300 range usually offer optimal throughput." https://www.rabbitmq.com/docs/confirms
- Quorum queues are "based on the Raft consensus algorithm"; poison handling via `x-delivery-count`; "Starting with RabbitMQ 4.0, the delivery limit for quorum queues defaults to 20"; over the limit the message is dropped or dead-lettered if a DLX exists; dead-letter strategy `at-most-once` (default) or `at-least-once` (needs `overflow=reject-publish`). https://www.rabbitmq.com/docs/quorum-queues

**Amazon SQS**

- Visibility timeout default 30 s, min 0, max 12 h; on expiry the message is visible again; "due to the at-least-once delivery model … there's no absolute guarantee that a message won't be delivered more than once." https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html
- FIFO dedup: `MessageDeduplicationId` works "within a 5-minute deduplication window." https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html
- Retention default 4 days, min 60 s, max 14 days; max message 1,048,576 bytes; FIFO non-high-throughput 300 TPS per API action per partition, 3,000 msg/s with 10-message batches; high-throughput mode up to 70,000 TPS in us-east-1 / us-west-2 / eu-west-1. https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html

**Google Pub/Sub**

- "The publishing throughput on each ordering key is limited to 1 MBps." Redelivering one ordered message redelivers the ones after it. https://docs.cloud.google.com/pubsub/docs/ordering

**Debezium (stable docs) and PostgreSQL 18**

- Postgres connector default plugin `pgoutput`; snapshot then stream; resumes from last recorded offset (at-least-once); event fields `before`, `after`, `op` ∈ {c, u, d, r}, `ts_ms`. https://debezium.io/documentation/reference/stable/connectors/postgresql.html
- Outbox event router: columns `id`, `aggregatetype`, `aggregateid`, `type`, `payload`; `aggregateid` "is used as the key in the emitted outbox message. This is important for maintaining correct order in Kafka partitions"; "All changes in an outbox table are expected to be INSERT operations"; DELETEs filtered. https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html
- Delete-after-insert is safe: "The calls to persist() and remove() will create an INSERT and a DELETE entry in the log once the transaction commits" (Morling, 2019-02-19). https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/
- Replication slots "will prevent removal of required resources even when there is no connection using them … In extreme cases this could cause the database to shut down to prevent transaction ID wraparound." https://www.postgresql.org/docs/current/logicaldecoding-explanation.html
- `max_slot_wal_keep_size` default -1 (unlimited). https://www.postgresql.org/docs/current/runtime-config-replication.html
- `SKIP LOCKED`: "any selected rows that cannot be immediately locked are skipped … can be used to avoid lock contention with multiple consumers accessing a queue-like table." https://www.postgresql.org/docs/current/sql-select.html

**Schemas**

- Confluent Schema Registry default compatibility `BACKWARD`; BACKWARD = upgrade consumers first; FORWARD = producers first; FULL = independent; transitive = checked against all prior versions. https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html
- Avro 1.12.0: reader field missing from writer → default used, else "an error is signalled"; writer field missing from reader → "ignored"; aliases map names. https://avro.apache.org/docs/1.12.0/specification/
- Protobuf: "Changing field numbers for any existing field is not safe"; adding fields is safe; reserve removed numbers; proto3 preserves unknown fields; int32 / uint32 / int64 / uint64 / bool are wire-compatible. https://protobuf.dev/programming-guides/proto3/#updating
- CloudEvents 1.0.3-wip: required `id`, `source`, `specversion`, `type`; "Producers MUST ensure that source + id is unique for each distinct event"; "Consumers MAY assume that Events with identical source and id are duplicates." https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md

**Stream processing**

- Flink 2.3.0: "A Watermark(t) declares that event time has reached time t in that stream, meaning that there should be no more elements from the stream with a timestamp t' <= t"; operator event time = minimum over inputs; allowed lateness + side outputs. https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/
- Dataflow model (VLDB 2015): "one can never fully optimize along all dimensions of correctness, latency, and cost"; assume "we will never know if or when we have seen all of our data." https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/
- MapReduce (OSDI 2004): "a map function that processes a key/value pair to generate a set of intermediate key/value pairs, and a reduce function that merges all intermediate values associated with the same intermediate key." https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/
- Reactive Streams 1.0.4: "A Subscriber MUST signal demand via Subscription.request(long n) to receive onNext signals." https://github.com/reactive-streams/reactive-streams-jvm/blob/master/README.md

**Patterns**

- Fowler (2017): event notification — "It can be hard to see such a flow as it's not explicit in any program text"; event-carried state transfer — "lots of data schlepped around and lots of copies"; event sourcing — "Replaying events becomes problematic when results depend on interactions with outside systems"; CQRS — "balanced against the additional complexity of having separate models." https://martinfowler.com/articles/201701-event-driven.html
- Fowler, Event Sourcing: complete rebuild, temporal query, event replay; snapshots; external updates during replay must be suppressed; external query results logged for consistent replay. https://martinfowler.com/eaaDev/EventSourcing.html
- microservices.io outbox: "2PC is not an option"; "Messages are guaranteed to be sent if and only if the database transaction commits"; "The Message relay might publish a message more than once"; relay = polling publisher or transaction log tailing. https://microservices.io/patterns/data/transactional-outbox.html
- microservices.io saga: "a sequence of local transactions"; choreography "publishes domain events that trigger local transactions in other services"; orchestration "tells the participants what local transactions to execute." https://microservices.io/patterns/data/saga.html

## 5. Could not verify

- **Jay Kreps, "The Log" (LinkedIn Engineering, 2013).** Canonical URL returned HTTP 404 on 2026-09-19 (WebFetch and curl). The "append-only, totally-ordered sequence of records ordered by time" definition is seen only in search snippets. If the page stays down, state the definition in our own words without attribution.
- **Kafka Streams default grace period.** Docs say the grace period bounds out-of-order tolerance; the default value was not on the 4.3 page fetched. Check the `TimeWindows` javadoc before printing a number.
- **SQS standard-queue in-flight limit.** "approximately 120,000" by AWS's own wording; usable only as approximate.
- **Share group delivery-count limit default** and renew semantics — the design page names counting and the 30 s lock; the group-config table was not fetched. Verify before quoting a limit.
- **Partition-count guidance numbers** (e.g. "thousands per broker") — no primary number in 4.3 docs; older Confluent blog figures are stale. 04-08 stays qualitative.
- **Flink allowed-lateness default (0)** — inferred from the API, not read on the concepts page.
- **DDIA chapter 11** — source for the log-as-unifying-abstraction framing, not fetchable. Pages cite Kafka docs and Fowler instead.
- **Greg Young's CQRS document** — not fetched; CQRS definition taken from Fowler.

## 6. Sources

- https://kafka.apache.org/43/design/design/ — semantics, ISR, compaction, share groups
- https://kafka.apache.org/43/getting-started/introduction/ — per-partition ordering guarantee
- https://kafka.apache.org/43/configuration/producer-configs/ — producer defaults
- https://kafka.apache.org/43/configuration/consumer-configs/ — consumer defaults
- https://kafka.apache.org/43/configuration/topic-configs/ — retention, min ISR
- https://kafka.apache.org/43/configuration/broker-configs/ — broker defaults
- https://kafka.apache.org/43/operations/basic-kafka-operations/ — adding partitions caveats
- https://kafka.apache.org/43/streams/core-concepts/ — duality, time, guarantees
- https://kafka.apache.org/43/streams/developer-guide/dsl-api/ — window definitions
- https://kafka.apache.org/blog/2026/02/17/apache-kafka-4.2.0-release-announcement/ — share groups GA
- https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/ — 4.3 release date
- https://www.confluent.io/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/ — EOS overhead figures
- https://www.rabbitmq.com/docs/confirms — acks, prefetch, requeue
- https://www.rabbitmq.com/docs/quorum-queues — delivery limit, Raft, DLX
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-visibility-timeout.html — visibility timeout
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html — FIFO dedup window
- https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/quotas-messages.html — retention, size, FIFO TPS
- https://docs.cloud.google.com/pubsub/docs/ordering — ordering keys
- https://debezium.io/documentation/reference/stable/connectors/postgresql.html — CDC mechanics
- https://debezium.io/documentation/reference/stable/transformations/outbox-event-router.html — outbox router
- https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/ — outbox rationale
- https://www.postgresql.org/docs/current/logicaldecoding-explanation.html — slots, WAL risk
- https://www.postgresql.org/docs/current/runtime-config-replication.html — max_slot_wal_keep_size
- https://www.postgresql.org/docs/current/sql-select.html — SKIP LOCKED
- https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html — compatibility modes
- https://avro.apache.org/docs/1.12.0/specification/ — schema resolution
- https://protobuf.dev/programming-guides/proto3/#updating — field rules
- https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md — envelope attributes
- https://nightlies.apache.org/flink/flink-docs-stable/docs/concepts/time/ — watermarks, lateness
- https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/ — triggers, tradeoff
- https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/ — map/reduce definition
- https://github.com/reactive-streams/reactive-streams-jvm/blob/master/README.md — backpressure protocol
- https://martinfowler.com/articles/201701-event-driven.html — four patterns
- https://martinfowler.com/eaaDev/EventSourcing.html — event sourcing
- https://microservices.io/patterns/data/transactional-outbox.html — outbox pattern
- https://microservices.io/patterns/data/saga.html — saga styles
- https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying — 404 today
