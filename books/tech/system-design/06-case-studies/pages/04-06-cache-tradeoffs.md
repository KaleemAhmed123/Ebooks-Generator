## What the interviewer probes

- **Replication of cache nodes:** Do you replicate the cache data? For small caches, no. If a node dies, the traffic hits the database and repopulates the new node. But for massive systems, a lost cache node drops 30% of your data at once. The database will melt. In this case, you must configure Redis replicas or use a highly available cluster topology
- **The cold start problem:** If you deploy a new cluster in a new region, it has 0% hit ratio. All traffic hits the database. You must "warm" the cache before routing traffic, either by replaying access logs or writing a script to fetch the top 10% most popular items
- **Memory fragmentation:** Storing 10-byte strings in Redis is wildly inefficient due to pointer overhead and metadata. If memory is tight, compressing JSON blobs or using efficient data structures (like Redis Hashes for grouping small fields) is required
- **Geographic distribution:** A global API needs a global cache. A user in Tokyo should not wait for a cache lookup in New York. You need cache clusters in every region, which makes the delete-on-write consistency problem much harder (often solved via asynchronous pub/sub invalidation across regions)

### The failure

- The failure mode is treating the cache as a database. Caches are transient. If you restart the entire caching layer, your system should degrade gracefully (or use rate limiting to protect the backend), not suffer catastrophic data loss
- Never store authoritative data in a cache. If a cache miss cannot be fully reconstructed from the primary database, you have built an in-memory database, not a cache

:::interview
**The restart test**
"What happens if I reboot your entire cache cluster?" is the ultimate test. If your answer involves data loss or a permanent outage, your architecture is broken.
:::
