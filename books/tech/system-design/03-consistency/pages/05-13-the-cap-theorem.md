## The CAP Theorem

- In 2000, Eric Brewer formalized a rule that governs every distributed system: **The CAP Theorem**. It states that a distributed system can only provide two of the following three guarantees:
  1. **Consistency (C)**: Every read receives the most recent write, or an error.
  2. **Availability (A)**: Every request receives a non-error response, without guaranteeing it contains the most recent write.
  3. **Partition Tolerance (P)**: The system continues to operate despite an arbitrary number of messages being dropped by the network between nodes.

- You cannot choose between all three. **Network partitions are a law of physics**. Cables get cut, routers die. Therefore, Partition Tolerance (P) is mandatory. When the network breaks, you must choose between Consistency (CP) and Availability (AP)
- **CP Systems** (like Zookeeper or a standard Postgres primary): When the network splits, the system refuses writes to avoid state divergence. It chooses Consistency over Availability.
- **AP Systems** (like DynamoDB or Cassandra): When the network splits, the system keeps accepting writes on both sides. It chooses Availability over Consistency, forcing you to resolve the conflicts later (eventual consistency).

:::interview
**Don't over-index on CAP**
In system design interviews, do not say "This database is AP, therefore it is fast." CAP has absolutely nothing to do with latency or performance during normal operations. It only describes how the system behaves *during a network failure*. A database can be strongly consistent (CP) and incredibly fast 99.99% of the time, until a switch dies.
:::

### The failure

- Claiming a database is "CA" on the internet. Marketing teams often claim their database is "CA" (Consistent and Available). This is mathematically impossible on a wide-area network. What they actually mean is "When a partition happens, our database crashes or blocks forever, sacrificing Availability to maintain Consistency (making it CP)."
