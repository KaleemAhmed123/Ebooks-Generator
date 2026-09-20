## What is ZooKeeper?

- Building Raft or Paxos into an application is incredibly hard. Instead, the industry relies on standalone Consensus software. The most famous is Apache ZooKeeper (and its modern equivalent, etcd, which powers Kubernetes)
- ZooKeeper is a highly available, strictly CP (Consistent and Partition-Tolerant) key-value store

| | Standard Database (e.g., Postgres) | Consensus Store (e.g., ZooKeeper/etcd) |
|---|---|---|
| **Primary Goal** | Storing gigabytes or terabytes of user data. | Coordinating distributed systems. |
| **Throughput** | High (Async replication). | Low (Sync quorum replication). |
| **Storage Limits** | Disk-bound. | Memory-bound (Usually holds < 1 GB total). |
| **Key Features** | SQL, indexes, transactions. | Ephemeral nodes, watches, leader election. |

- You do not use ZooKeeper to store your application's `users` table. You use ZooKeeper to store *metadata about your infrastructure*, such as "Which node is the leader of the database cluster?" or "Where are the payment servers located?"

### The failure

- Using ZooKeeper to store application user payloads. If you decide that ZooKeeper's strict consistency is perfect for storing user shopping carts, you will bring the cluster down. ZooKeeper keeps its entire state in RAM for speed, and it maxes out at a few megabytes per node. It is a traffic cop, not a warehouse
