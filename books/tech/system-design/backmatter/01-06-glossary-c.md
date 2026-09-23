## Glossary: C

| Term | Means | Where |
|---|---|---|
| **consumer-driven contract** | each consumer records what it actually reads, and the provider runs every consumer's recording in its own build | 5 · 5-04 |
| **consumer group** | the set of readers sharing a topic's partitions, each partition read by exactly one member at a time | 4 · 2-05 |
| **consumer lag** | the end offset of a partition minus the group's committed offset: how much is written and not yet done | 4 · 3-09 |
| **content-defined chunking** | cutting a file at boundaries chosen by a rolling hash of its content, so an insert shifts only the block it lands in | 6 · 10-02 |
| **contract test** | a CI check that a producer's output still satisfies what a consumer's schema declares | 4 · 14-04 |
| **control plane** | the machinery that starts, stops and routes the machines, as distinct from the traffic they serve | 1 · 2-05 |
| **Conway's law** | organisations produce designs that copy their own communication structures | 5 · 1-06 |
| **coordinated omission** | a load generator hiding a stall by pausing with the system, so the slowest requests are never measured | 1 · 1-07 |
| **coordinator** | the node carrying out a read or write on the client's behalf in a leaderless store, or driving a two-phase commit | 2 · 7-01 |
| **correctness lock** | a lock whose absence breaks an invariant — two nodes both charging the card | 3 · 8-06 |
| **correlation id** | one identifier attached to every log line, span and message for a single request or saga | 4 · 1-05 |
| **count-min sketch** | a grid of counters with one hash per row, estimating frequencies in fixed space and never under-counting | 6 · 17-03 |
| **covering index** | an index carrying the columns a query returns, so the heap is never visited | 2 · 3-04 |
