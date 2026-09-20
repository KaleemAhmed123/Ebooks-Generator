## Faults come in families

- The tool for tolerating a fault depends on whether the next fault is **independent** of it or **correlated** with it
- Redundancy only helps against independent faults. Two copies of the same bug are one bug

| Family | Shape | Example | What tolerates it |
|---|---|---|---|
| **Hardware** | random, roughly independent | a disk dies, a NIC flaps, a rack loses power | redundancy: replicas, spare capacity, another zone |
| **Software** | systematic, correlated | a bug that crashes on one input, a leak that fills every node at the same rate, a dependency that goes slow and takes its callers with it | isolation, limits, timeouts, testing the assumption that broke |
| **Human** | correlated and total | a bad config pushed to every instance, a migration run against production, a deploy at peak | staging that matches production, gradual rollout, fast rollback, tooling that makes the safe path the easy path |

### The design that only knows one family

- Three replicas in three zones covers the hardware column completely
- Then one deploy ships the same crash to all three at once. Three replicas, zero survivors
- The correlated fault does not care how many copies you have. It cares how many *different* things you have
- Interviewers probe this with one question: "what happens when you deploy a bug?" A design with replicas and no rollout strategy has answered "everything goes down at the same time"

### Hardware is the easy family

- Cloud providers already replicate disks and spread zones. The hardware column is mostly bought, not built
- The software and human columns are yours. Most of this booklet is about them
