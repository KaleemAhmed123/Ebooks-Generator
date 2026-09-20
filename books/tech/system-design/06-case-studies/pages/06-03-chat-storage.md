## Message storage

- Relational databases (PostgreSQL/MySQL) are not built for trillions of tiny, immutable inserts. You need a Wide-Column store like Cassandra or ScyllaDB
- A wide-column store uses a Partition Key (how data is distributed across nodes) and a Clustering Key (how data is sorted on disk)
- **The naive key:** `Partition: channel_id`. `Clustering: message_id`.
- **The problem:** A Discord server with 100,000 active members will hammer a single `channel_id`. That one partition will grow unbounded and create a massive "hot partition," bringing down a single database node while the others sit idle
- **The solution (Discord's approach):** Bucket by time. `Partition: (channel_id, bucket_id)`. `Clustering: message_id`. A bucket is roughly 10 days of time. This bounds the size of any one partition to < 100 MB and distributes load over time

```typescript
interface MessageRow {
  channel_id: string; // Partition key part 1
  bucket_id: string;  // Partition key part 2 (e.g. '2026-W38')
  message_id: string; // Clustering key (Snowflake ID)
  content: string;
}
```

### The failure

- Using a UUID for `message_id`. UUIDs are random. They do not sort chronologically. You must use a Snowflake ID (→05) which embeds a timestamp in the ID itself, ensuring messages sort natively on disk

:::interview
You partitioned your Cassandra table purely by `channel_id`. The interviewer asks: what happens when Taylor Swift creates a public chat channel with 5 million fans?

That single `channel_id` becomes a hot partition. All reads and writes for that channel are routed to a single Cassandra node, which will immediately melt down due to CPU/IO exhaustion, while the rest of the cluster does nothing.
:::
