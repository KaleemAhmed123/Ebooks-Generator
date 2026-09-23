## Glossary: M–O

| Term | Means | Where |
|---|---|---|
| **MTBF** | mean time between failures: how long the system runs before something breaks | 1 · 2-03 |
| **MTTR** | mean time to recovery: how long it stays broken once it has | 1 · 2-03 |
| **multi-leader** | a leader in each region, each a follower of the others, so writes commit locally and conflict later | 2 · 6-01 |
| **multi-object transaction** | writes to several rows or tables committing or aborting together | 3 · 1-06 |
| **Multi-Paxos** | Paxos with a stable leader that runs phase 1 once for a sequence of slots, leaving one round trip per value | 3 · 7-09 |
| **MVCC** | keeping several versions of a row, so readers see the version current when their snapshot began and never block writers | 2 · 2-04 |
| **nack** | a consumer rejecting a message, which the broker then requeues or dead-letters | 4 · 2-04 |
| **network partition** | a split leaving nodes able to talk within groups but not across, each group possibly believing it is the whole system | 1 · 7-04 |
| **non-functional requirements** | how the system behaves — latency, availability, consistency, scale. Each one is a number, or it is not a requirement yet | 6 · 1-03 |
| **non-repeatable read** | reading the same row twice inside one transaction and getting two values | 3 · 2-01 |
| **NOWAIT** | the SQL modifier that fails immediately rather than queueing for a locked row | 3 · 3-04 |
| **NTP** | the protocol correcting a machine's clock drift against a reference | 3 · 9-02 |
| **observability** | being able to answer why a request was slow or wrong from what the system already emits | 5 · 1-05 |
