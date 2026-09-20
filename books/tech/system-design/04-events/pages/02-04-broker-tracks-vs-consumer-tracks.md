## Broker tracks vs consumer tracks

- The difference between a Queue and a Log is fundamentally about state management. Who tracks what has been consumed?

| | Queue (RabbitMQ / SQS) | Partitioned Log (Kafka / Kinesis) |
|---|---|---|
| **State tracked by** | Broker | Consumer (stored by Broker) |
| **Tracking mechanism** | Per-message Ack state. | One integer (the Offset) per partition. |
| **Deletion** | Instantly, upon successful Ack. | Based on time (e.g., 7 days) or size. |
| **Replay** | Impossible. Messages are gone. | Trivial. Just rewind the integer offset. |
| **Out-of-order Acks** | Fully supported. You can Ack message 5 while leaving message 4 un-Acked. | Impossible by default. Committing offset 5 implies 1-4 are done. |

- Apache Kafka was explicitly designed to reject the Queue model because tracking per-message Acks is incredibly expensive. In a Queue, if you have 1 million messages in flight, the broker must hold 1 million rows of state in its memory/disk tracking exactly which messages are pending, locked, or Acked

### The failure

- Per-message Ack state is what caps a queue broker's throughput. Kafka scales to millions of messages per second on a single machine because acknowledging a batch of 10,000 messages simply requires updating one integer (`offset = 10000`). RabbitMQ caps out much earlier because acknowledging 10,000 messages requires finding and updating 10,000 individual records in its internal database. The model dictates the performance ceiling
