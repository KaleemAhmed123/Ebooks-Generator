## Share groups: queues on a log

- For a decade, the standard system design interview question was "Why is Kafka not a Queue?" The answer was that Kafka partitions restrict parallelism, and you cannot individually Ack and delete single messages out of order.
- In 2026, Kafka 4.2 made **Share Groups** production-ready, effectively building a Queue on top of a Log

| | Consumer Group | Share Group |
|---|---|---|
| **Max parallelism** | Bounded by partition count. | Unbounded. Consumers can exceed partition count. |
| **Tracking** | One integer offset per partition. | Per-message acknowledgements. |
| **Locks** | Exclusive lock on the partition. | 30-second acquisition lock on individual records. |
| **Failure handling** | Halts the partition until resolved. | Un-acked records are released for other consumers. |
| **Ordering** | Guaranteed per-partition. | **None.** |

- Share groups are perfect for simple job queues where ordering doesn't matter (e.g. sending batch emails) but you still want to use your existing Kafka cluster's disk durability and replication, rather than spinning up a separate RabbitMQ cluster

### The failure

- You give up per-partition ordering the moment you use them. The fundamental trade-off of a Share Group is that you gain horizontal scalability at the complete expense of ordering. If you use a Share Group to process `UserCreated` and `UserDeleted` events, they will be handed to different consumers simultaneously. The `UserDeleted` event might finish processing first, resulting in a system where the user exists when they shouldn't. Never use a Share Group for state-machine events
