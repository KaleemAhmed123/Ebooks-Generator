## Synchronous vs Asynchronous

- When the Leader commits a transaction, it streams the log to the Followers. But should the Leader wait for the Followers to acknowledge the write before telling the user "Success"?

| | Synchronous Replication | Asynchronous Replication |
|---|---|---|
| **Mechanism** | Leader waits for the Follower to write the data to disk before replying to the client. | Leader replies "Success" immediately after writing to its own disk, without waiting. |
| **Performance** | Slow. Adds network latency to every write. If the Follower crashes, writes block completely. | Fast. Writing is instantaneous. |
| **Durability** | Safe. If the Leader explodes, no committed data is lost (the Follower already has it). | **Data Loss**. If the Leader explodes before the WAL streams, committed data is permanently lost. |

- In practice, almost all databases use **Asynchronous Replication** by default. Performance usually matters more than extreme durability.
- If you need strict durability, you can configure **Semi-Synchronous Replication**: you require exactly one Follower to be synchronous, and the rest asynchronous. This guarantees that at least one backup node has the data if the Leader dies, without waiting for five different nodes to acknowledge

### The failure

- Losing committed data. If a user buys a TV, the Leader commits asynchronously and replies "Success." A split second later, the Leader's motherboard catches fire. The WAL stream never reached the Follower. When the Follower is promoted to the new Leader, the order doesn't exist. The user has a receipt for a TV that the database has completely forgotten about
