## Replication vs Sharding

- As your application grows, a single database server will eventually reach its limits. When you need to add more servers, you must choose between two entirely different strategies: **Replication** and **Sharding** (also known as Partitioning)
- **Replication** means keeping a complete copy of the exact same data on multiple machines
- **Sharding** means splitting the data up, so that different machines hold different subsets of the data

| Goal | Strategy | How it helps |
|---|---|---|
| **High Availability** | Replication | If a server catches fire, another server has an exact copy of the data and can take over immediately. |
| **Read Scalability** | Replication | If you have 10,000 read queries per second, you can spread them across 10 identical replica servers. |
| **Write Scalability** | Sharding | If you have 10,000 *write* queries per second, replication won't help (every server still has to process every write). You must shard the database so Server A handles users A–M, and Server B handles N–Z. |
| **Storage Capacity** | Sharding | If your data is 50 Terabytes, you cannot buy a hard drive big enough. You must shard the data across multiple hard drives. |

### The failure

- Confusing replication with sharding. The most common scaling mistake is setting up three database replicas to "handle high write traffic". Replicas do not increase write capacity. If your primary database is at 100% CPU processing writes, adding a replica actually makes it *slower*, because the primary now has to spend extra CPU sending those writes to the new replica
