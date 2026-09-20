## Per-key ordering elsewhere

- Kafka popularized the "order by key" pattern, but modern cloud queues have adopted it as well to solve the exact same problem

| Broker | Ordering Feature | How it works |
|---|---|---|
| **Kafka** | Routing Key | Hashed to a specific partition. One consumer per partition. |
| **Amazon SQS (FIFO)** | `MessageGroupId` | Messages with the same group ID are delivered in strict order. If a message is un-acked, SQS refuses to deliver the *next* message for that specific Group ID. |
| **GCP Pub/Sub** | Ordering Keys | Similar to SQS. If a message fails, all subsequent messages for that key are paused until the first one is acked (or dead-lettered). |

- Notice the difference in failure modes: Kafka partitions are physical lanes. If a message gets stuck, the *entire partition* is blocked. SQS and Pub/Sub are logical lanes. If a message gets stuck, only that specific *key* is blocked; the rest of the queue flows freely.

### The failure

- An ordering key is a serial lane. When using Pub/Sub with Ordering Keys, developers assume it behaves like a normal queue. But if your consumer crashes while processing a message for `userId: 123`, Pub/Sub will strictly hold back all future messages for `userId: 123` until the first one succeeds. It will literally redeliver everything after an unacked message in that key to maintain the contract. If you don't explicitly dead-letter the poison message, that user's account is permanently frozen
