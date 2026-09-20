## Fencing tokens you can get today

- The token must come from the same decision that granted the lock, so it is always a number from the consensus log

| Lock or election from | Token | Where it comes from |
|---|---|---|
| **ZooKeeper** | the `zxid` of the create, or the znode's version | 64-bit `zxid`: epoch in the high 32 bits, counter in the low 32; monotonic across leaders |
| **etcd** | the lock key's revision, or the lease id | every modification gets a monotonically increasing revision; returned in the response header |
| **Kafka** | producer epoch; partition leader epoch | the controller bumps the epoch on each new leader or producer session; brokers reject the old one |
| **Raft-based service** | the term plus the log index | Module 7, page 3: any node in a later term refuses the earlier one |
| a database row used as a lock | a version column you increment | Module 3, page 5; the check is the same conditional `UPDATE` |
| **Redis** `SET NX PX` | none | a random value proves who set the key; it does not order holders (page 7) |

- The second requirement from page 4 is per resource. Postgres, MySQL, DynamoDB (`ConditionExpression`) and Kafka partitions can check a number on every write. Object stores and third-party APIs cannot; the write path then needs a checking layer in front, or the operation must be made idempotent so that a duplicate is harmless (page 10)
- Kafka is the model to copy: the control plane (the controller's metadata log) issues epochs; the data plane (brokers, producers) carries them and refuses the past. Module 7, page 11 is the same split at the cluster level

### The failure

- Reading the random value in a Redis lock as a fencing token. It is a proof of identity ("this key is mine"), not of order ("I am the latest holder"). Two holders after a pause both have a valid-looking random value, and the storage cannot tell which one is stale
