## Choosing a partition count

- Since you cannot easily add partitions later without breaking routing keys, how do you pick a number on day one?

| Factor | Heuristic |
|---|---|
| **Max consumers** | A topic with 50 partitions can support at most 50 concurrent consumer pods. Over-provision this. If you think you'll need 10 pods, use at least 30 partitions. |
| **Throughput per partition** | A single partition on a standard SSD can easily handle 10MB/sec of write throughput. If you expect 500MB/sec, you need at least 50 partitions. |
| **Shrinkability** | You cannot shrink. If you over-provision too wildly (e.g., 10,000 partitions for a low-traffic topic), you waste cluster resources. |

- A common rule of thumb for a mid-sized microservice is to start with 30 or 60 partitions. This provides plenty of headroom for scaling consumers, divides evenly among brokers (3, 5, or 6 nodes), and avoids hitting the cluster-wide limit too early.

### The failure

- Thousands of partitions per topic slows controller failover. Every partition requires a Leader. If one of your brokers dies, the Kafka Controller must elect a new Leader for every single partition that was hosted on that dead broker. If you have 5 topics with 10,000 partitions each, the Controller must instantly process 50,000 leader elections. This process takes time, meaning your partitions are offline and unavailable for writes for several seconds or minutes. Over-provision, but don't go insane
