## What consensus costs

- Every committed entry is one round-trip from the leader to a majority, plus a disk sync on each of them. Every linearizable read is one more round-trip (page 7). Every leader change is an election timeout plus a vote, during which no write commits. The protocol is not slow; it is exactly as slow as the promise requires

| Cost | Where it shows | Mitigation |
|---|---|---|
| majority round-trip per commit | write latency floor = slowest member of the fastest majority | keep members in one region; batch entries per `AppendEntries` |
| disk sync per member per commit | fsync latency; etcd's own health check watches it | fast local disks; never a network volume for the log |
| leader bottleneck | every write and every linearizable read crosses one node | shard into independent groups (CockroachDB ranges, Spanner splits) |
| no writes during an election | ~1 s outage per leader loss at etcd defaults (page 8) | tune to the network; make clients retry with backoff (booklet 01) |
| log growth | disk fills; new members replay forever | snapshot and compact; ship the snapshot to newcomers |
| operational surface | membership changes, certificate rotation, quorum loss | few members, one owner, a runbook for "two of five are gone" |

- The multiplier is geography. A majority across three regions commits at the speed of the second-fastest region's round-trip, tens of milliseconds, on every write. That is the price CockroachDB and Spanner charge for global strict serializability; it cannot be tuned away, only sharded so that most ranges have their majority near their writers
- Consensus is the right tool for the small set of decisions in Module 8: who leads, who holds the lock, what the configuration is. Those happen rarely and must be single. Ordinary data needs neither property

### The failure

- A consensus cluster spread across regions "for resilience", then a ticket that its writes take 80 ms. Both facts are the same design. Either the decision needs a global majority and 80 ms is the cost, or it does not and the cluster should live in one region with a replica elsewhere for recovery, not for quorum
