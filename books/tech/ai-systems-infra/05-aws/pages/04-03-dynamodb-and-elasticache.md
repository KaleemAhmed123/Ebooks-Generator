## DynamoDB and ElastiCache

- **DynamoDB** is Booklet 4's key-value store as a **fully serverless** AWS service: no nodes, no patching, no capacity planning in on-demand mode — it scales transparently and bills per request (or per provisioned capacity). On top of the Booklet 4 model (partition/sort key, single-table design, hot-partition caution), AWS layers features worth knowing:
  - **DynamoDB Streams** — a change log of every item modification, consumable by **Lambda**. This is managed **CDC** (Booklet 4's outbox/event-sourcing engine) with zero infrastructure: "when an item changes, trigger this function."
  - **Global Tables** — multi-region, multi-active replication (Booklet 3's multi-leader) for low-latency global reads/writes and regional failover.
  - **DAX** — an in-front microsecond cache for read-heavy workloads (the Module 4 hot-key fix, managed).
- **ElastiCache** is Booklet 4's caching tier as a managed service — **Redis / Valkey** (or Memcached). AWS runs the cluster, replication, failover, and patching; you get the sub-millisecond data-structure store for caching, sessions, rate-limiting, and leaderboards without operating it. Per the verified Booklet 4 facts, **Valkey (the Linux Foundation BSD fork) is now the default engine** on ElastiCache, and it's cheaper than the Redis-branded option while being wire-compatible — so new clusters typically pick Valkey unless you need a Redis-specific feature.

:::note
The pattern these enable, end to end: an app on **EKS** (Module 3) reads and writes **DynamoDB** via an **IRSA** role (Module 1), fronted by **ElastiCache/Valkey** for hot reads (with the stampede protection from Booklet 4), while **DynamoDB Streams → Lambda** propagates changes to other systems (search index, analytics) — the outbox/event-sourcing shape from Booklet 3, built entirely from managed pieces. You're assembling the same distributed-systems patterns you learned from first principles, now as services you configure instead of servers you run.
:::

- When you need a **log** (Booklet 4's Kafka), AWS offers **MSK** (managed Kafka) or **Kinesis** (AWS-native streaming); when you need a **queue or pub/sub**, that's the next page (SQS/SNS/EventBridge). The selection framework from Booklet 4 still drives the choice — AWS just removes the operational burden of running the broker.
