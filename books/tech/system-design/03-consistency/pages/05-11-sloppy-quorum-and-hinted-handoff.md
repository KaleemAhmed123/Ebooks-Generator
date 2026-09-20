## Sloppy quorum and hinted handoff

- One of the biggest selling points of leaderless replication is extreme availability. If a node goes down, the database keeps accepting writes as long as $W$ nodes are alive. But what if a network partition separates you from the database cluster, and only one node is reachable? You can't reach $W=2$, so the write fails
- Some databases offer a feature called **Sloppy Quorum**. If the required nodes are unreachable, the database will temporarily accept the write on *any* random node in the network, even if that node isn't supposed to store that data

| Quorum Type | Behavior on failure | Consistency |
|---|---|---|
| **Strict Quorum** | Write fails if $W$ nodes are unreachable. | Stronger. Reads from $R$ nodes will find the data. |
| **Sloppy Quorum** | Write succeeds by writing to a random neighbor node. | Weaker. Reads will *not* find the data until it is handed off. |

- **Hinted Handoff**: The random node accepts the write and tags it with a "hint" (e.g., "This belongs to Node B"). Once the network heals and Node B comes back online, the random node hands the data over to Node B. This guarantees 100% write availability, but it temporarily destroys read consistency

### The failure

- A network partition causing nodes to accept writes they shouldn't. If you configure a sloppy quorum during a major AWS outage, your application will successfully write millions of records to random standby nodes. When the outage ends, those nodes will attempt a hinted handoff all at once, saturating the network and causing a secondary cascading outage. This is why many teams disable sloppy quorum entirely
