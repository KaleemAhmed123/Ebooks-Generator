## Consensus in the Cloud era

- Operating a ZooKeeper cluster is notoriously difficult. It requires an odd number of nodes, highly tuned JVM settings, and specialized storage. 
- Because it is so hard, **almost no one runs their own consensus cluster anymore**.

| Era | How we achieved consensus |
|---|---|
| **2010s** | Companies deployed their own 3-node or 5-node ZooKeeper clusters on EC2 instances. |
| **Today: Managed Services** | Cloud providers offer Consensus-as-a-Service. You use DynamoDB's Conditional Writes, or Google Cloud Spanner, which handle the Paxos/Raft clusters invisibly for you. |
| **Today: Kubernetes** | Every Kubernetes cluster has a highly-tuned `etcd` (Raft) cluster built into the control plane. Applications use the Kubernetes API for leader election and service discovery instead of running their own. |

- If you are building a system today, you should rely on the strong consistency guarantees provided by your cloud provider's managed database, or by Kubernetes.

### The failure

- Running your own 5-node ZooKeeper cluster in 2026. Unless you are building infrastructure software (like a new database engine or a message queue like Kafka), deploying ZooKeeper into your application stack is massive over-engineering. You are taking on the operational burden of a distributed consensus engine just to elect a leader, when you could have just used a Kubernetes Lease object
