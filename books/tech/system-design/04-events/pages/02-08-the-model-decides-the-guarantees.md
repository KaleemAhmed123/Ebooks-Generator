## Choosing the model

- The tool you pick dictates the guarantees you get.

| | Queue (RabbitMQ) | Partitioned Log (Kafka) |
|---|---|---|
| **Best for** | Distributed work distribution | Event sourcing, replay, analytics pipelines |
| **Ordering** | Broken the second you add Consumer B. | Guaranteed *per-partition*. |
| **Parallelism** | Infinite. Just add more workers. | Hard-capped by the number of Partitions. |
| **Replay** | No. Messages are deleted instantly. | Yes. Rewind the offset. |
| **Multiple Readers** | You must pre-configure an Exchange to fan-out to separate Queues. | Any new Consumer Group can start reading from offset 0 at any time. |

- *Note: In version 4.2 (2026), Kafka introduced "Share Groups" which allow queue-like semantics over a partitioned log, blurring the lines.*

### The failure

- Picking Kafka for a job queue and fighting partition-bound parallelism. Because Kafka is famous, teams often use it for simple job queues (e.g. sending emails). They create a topic with 5 partitions. When they get a spike in traffic, they spin up 50 Kubernetes pods to process the emails. But because Kafka assigns one partition to exactly one consumer, 45 of those pods sit completely idle, doing zero work, while the 5 active pods drown. If you need dynamic work distribution without ordering constraints, use a Queue, not a Log
