## Glossary: K–L

| Term | Means | Where |
|---|---|---|
| **key salting** | adding a suffix to spread one hot key across many partitions, at the cost of fanning every read out | 2 · 8-11 |
| **key-value store** | a store addressed by key only, with no second access pattern unless you build the index yourself | 2 · 9-03 |
| **k-sorted** | roughly ordered by time rather than strictly. All a distributed id generator can promise | 5 · 11-03 |
| **L4** | a balancer forwarding packets by their five-tuple, never parsing HTTP, deciding once per connection | 5 · 7-02 |
| **L7** | a balancer that terminates TLS, reads the request, and decides per request | 5 · 7-02 |
| **Lambda architecture** | a batch pipeline for the correct answer and a stream pipeline for the fast one, reconciled. Two implementations of the same logic | 4 · 13-02 |
| **Lamport timestamp** | a counter that orders events by causality, with no clock at all | 3 · 9-04 |
| **last mile** | the access network's own latency floor, before any distance is travelled | 1 · 4-03 |
| **last write wins (LWW)** | resolving a conflict by timestamp. Deterministic, convergent, and silently lossy | 2 · 6-03 |
| **latency** | how long one operation takes | 5 · 1-05 |
| **leaderless replication** | every replica accepts writes, with quorums rather than a special node deciding what counts | 2 · 7-01 |
| **leaky bucket** | a limiter that smooths instead of allowing: a queue drained at a fixed rate, paying in latency | 6 · 3-02 |
| **learner** | the Paxos role that finds out what was decided | 3 · 7-09 |
