# Module 8 - Leader election, split brain, locks

## Leader election is a consensus problem

- "Exactly one leader" is a uniqueness decision made by nodes that cannot see each other reliably. That is the definition of consensus (Module 7, page 1). Every election scheme is either a consensus protocol or a scheme that produces two leaders on the day the network splits
- The home-made version looks reasonable: each node writes a heartbeat row to a shared database; the node with the freshest row leads; a stale row means "dead, take over"

| Election by | Who decides "dead" | Under a partition | Verdict |
|---|---|---|---|
| heartbeat rows in a database | each node, from a timestamp and its own clock | the old leader, cut off, keeps writing; a new one starts: two leaders | not an election; a race with a clock (Module 9) |
| lowest live node id | each node, from its own view of who is alive | each side has a lowest live id | two leaders |
| a consensus store (etcd, ZooKeeper, Consul) | a majority, via the log | the minority side cannot renew or elect; only one side has a leader | an election |
| a single "election server" | that one server | it is the partition; nobody elects | one leader, one outage |

- The consensus store does not remove the failure modes; it moves them somewhere that has already solved them. The candidate that holds the key in etcd holds it because a majority agreed, and it stops holding it when the lease (page 3) lapses in that same log
- This is what Postgres failover tools do. Patroni does not decide who is primary; it stores the leader key in etcd, ZooKeeper or Consul and lets the store's majority decide

### The failure

- A "leader" chosen by heartbeat timestamps in the application database. It works for a year. Then a network blip makes the standby's clock read the leader's row as 31 s old, the standby promotes itself, and the old leader, which never stopped, keeps taking writes. Page 2 is what that looks like from the data's side
