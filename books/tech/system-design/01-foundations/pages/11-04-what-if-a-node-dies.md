## 3. What if a node dies?

- The first two modules taught that hardware fails constantly. You must declare what happens when it does. Every component needs an answer

| Strategy | When to use it | The cost |
|---|---|---|
| **Stateless Replica** | API servers, workers. Load balancer routes around the dead node | N+1 over-provisioning |
| **Stateful Failover** | Relational databases, brokers. Promote a standby to primary | A blip during promotion, split-brain risk |
| **Quorum** | NoSQL databases, consensus. Require N of M nodes to agree | High latency, storage multiplier |
| **Replay** | Batch processing, analytics. Rerun the job from the start | Time (job takes twice as long) |
| **Downtime** | Internal tools, reports. Let it be down | User trust |

- You do not need to use active-active multi-region replication for everything. "It stays down until a human restarts it" is a perfectly valid answer for a monthly reporting job

### The failure

- "We have a read replica, so the database is highly available." A read replica without a failover procedure (automated or manual) does not provide write availability. If the primary dies, writes fail until a human intervenes. The replica only protects read availability
