## An event store is not a message broker

- An event store is organised **per aggregate**: one stream per order, per account, per entity, read back by that entity's id, and written to under **optimistic concurrency** — a write names the version it expects, and is rejected if another write already moved past it. A topic has none of this: partitions are a throughput unit, not an aggregate boundary, and Kafka has no per-key expected-version check on a write

| | Event store | Broker (Kafka) |
|---|---|---|
| Unit | one stream per aggregate | one partition per hash bucket |
| Read | by stream id, from the start | by offset, per partition |
| Concurrency | expected-version check on write | none — last write wins |
| Retention | forever, by design | `retention.ms`, deletable (Module 7) |

- Kafka can carry event-sourced events as a transport, keyed by aggregate id for per-key order (Module 4, page 2) — but reading "give me order 42's full history" means scanning a partition for one key, not a stream lookup, and nothing stops a second writer from racing the first
- Purpose-built event stores exist specifically to add the version check and the per-stream read that a general-purpose log does not have

### The failure

- Using a Kafka topic as the event store because "it's already an append-only log." Two instances of the same service both load order 42, both append an event assuming they hold the latest version, and the log ends up with two histories that both look valid. Nothing in Kafka would have rejected the second write
