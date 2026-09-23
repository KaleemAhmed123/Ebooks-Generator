## Glossary: R

| Term | Means | Where |
|---|---|---|
| **Read Committed** | the isolation level promising only no dirty reads and no dirty writes, with a fresh snapshot per statement | 3 · 2-03 |
| **ReadIndex** | confirming leadership with a heartbeat round before answering a read, so the answer cannot come from a deposed leader | 3 · 7-07 |
| **readiness probe** | the check asking whether this instance can take traffic right now. A failure stops routing to it without restarting it | 5 · 4-09 |
| **read model** | a local table built from other services' events and shaped for exactly one screen | 5 · 2-05 |
| **read repair** | the coordinator returning the newest of the versions it collected, and writing it back to the replicas that were behind | 2 · 7-04 |
| **read skew** | seeing half the state from before a change and half from after | 3 · 2-03 |
| **read-your-writes** | a read after your own write sees it | 3 · 5-08 |
| **rebalance** | a consumer group reassigning partitions after a member joins, leaves, or is declared dead | 4 · 3-05 |
| **reconciliation** | reading the state to find out whether a request succeeded, before deciding what to do next | 1 · 10-06 |
| **Redlock** | the Redis multi-instance lock algorithm, in which a client claims a lock on a majority of independent instances | 3 · 8-08 |
| **reliability** | absorbing faults so they never become failures | 1 · 1-01 |
| **replica** | a copy of the data, usually read-only | 1 · 1-04 |
| **replication** | every copy holding all of the data | 1 · 3-04 |
