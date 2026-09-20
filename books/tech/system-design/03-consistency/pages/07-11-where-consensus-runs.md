## Where consensus runs in your stack

- Consensus is expensive per decision (page 12), so systems run it where a decision must be single and rarely, and keep bulk data on cheaper replication

| System | Protocol | What the log decides | What stays outside it |
|---|---|---|---|
| **etcd** | Raft | every key write; Kubernetes stores all cluster objects here | pod traffic, images, volumes |
| **ZooKeeper** | Zab | znode writes: config, membership, locks, leader | the data the coordinated services serve |
| **Kafka** since 4.0 | KRaft, a Raft-derived metadata quorum (KIP-595); ZooKeeper removed | topics, partitions, which broker leads each one | the messages: leader-to-follower replication, in-sync replica acks (booklet 04) |
| **CockroachDB** | Raft per range of keys | every write to that range | nothing; the data path is consensus, paid for in latency |
| **Spanner** | Paxos per split | every write to that split | the same trade; TrueTime orders writes across splits |
| **Postgres / MySQL** | none | nothing; failover is an external tool's job | everything; the tool (Patroni uses etcd) is where consensus lives |

- The pattern in the first three rows is **control plane** (the small, must-be-single state: who owns what) through consensus, **data plane** (the bulk) through ordinary replication with a fencing number from the control plane (Module 8, page 5). Kafka's leader epoch is that number
- The last row is most teams. A Postgres primary does not know whether it is still primary; something else decides, with a consensus store or wrongly (Module 8, page 1)

### The failure

- Putting the data path through a consensus store because it is "the consistent one". Every order written to etcd is a majority round-trip plus a disk sync on each member, and etcd's key space is sized for cluster metadata, not for a business database. Decide who owns the data in etcd; write the data elsewhere
