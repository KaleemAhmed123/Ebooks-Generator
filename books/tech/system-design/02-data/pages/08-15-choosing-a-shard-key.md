## Choosing a shard key

- The shard key decides where every row lives and which queries can be answered by one shard. Changing it later is page 18. MongoDB's docs judge a candidate on three things:

| Criterion | What it means | Good key | Bad key |
|---|---|---|---|
| **Cardinality** | How many distinct values; the ceiling on how many partitions are possible | `user_id`, millions | `status`, four values |
| **Frequency** | How evenly the values occur; one dominant value is one hot partition | `device_id` across a fleet | `tenant_id` where one tenant is most of the traffic |
| **Monotonicity** | Whether the value always grows; under range partitioning that is the last-range hotspot | A hashed key, or `(tenant_id, created_at)` | `created_at`, an auto-increment |

- DynamoDB's list of good partition keys is the same table in other words: user ID, device ID; bad: a status code, a date rounded to a period, one dominant device
- The usual winner is the tenant or user: Notion sharded by workspace ID, so every query a workspace makes stays on one shard and joins inside a workspace stay local. The frequency risk, one giant tenant, is the price, and page 11 is the mitigation

### The failure

- An always-increasing key under range sharding. MongoDB: "if the shard key value is always increasing, all new inserts are routed to the chunk with `maxKey`", one chunk, one shard, all the writes. Its own fix is hashed sharding on that key, which buys the spread by giving up the range scan (page 3)
