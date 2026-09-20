## Choosing a shard key

- The single most important decision in a distributed database is the shard key. If you pick the wrong key, your queries will fan out, your write throughput will bottleneck, and changing it later requires a complete migration
- You must evaluate candidate keys against three criteria: cardinality, frequency, and monotonicity

| Criterion | What it means | Good key | Bad key |
|---|---|---|---|
| **Cardinality** | How many unique values exist? This sets the absolute maximum number of partitions. | `UserId` (millions) | `Status` (only 4 values). |
| **Frequency** | How evenly distributed is the traffic across the keys? | `DeviceId` (even) | `TenantId` (one enterprise tenant uses 80% of capacity). |
| **Monotonicity** | Does the key constantly increase? | `UUIDv4` (random) | `CreatedAt` (hotspot on the latest partition). |

- **The pragmatic winner**: The most common shard key in B2B SaaS is the `TenantId` (or `WorkspaceId`), combined with an object ID (`TenantId, ProjectId`). This guarantees that all data for one tenant sits on the same physical node, making complex joins and transactions fast and localized

### The failure

- Picking a monotonically increasing key (like an auto-incrementing integer or a timestamp) in a system that uses range partitioning (like MongoDB). 
- MongoDB's own documentation explicitly warns against this: "If the shard key value is always increasing, all new inserts are routed to the chunk with `maxKey`". You will funnel your entire cluster's write load into a single machine, rendering the rest of your hardware useless
