## Glossary: O–P

| Term | Means | Where |
|---|---|---|
| **offset** | the position of the next record a reader will read in a partition. Small, cheap to commit, and rewindable | 4 · 2-03 |
| **OLAP** | online analytical processing: aggregating a few columns across many rows | 2 · 1-07 |
| **OLTP** | online transaction processing: touching one row at a time, whole | 2 · 1-07 |
| **open-loop** | a load generator sending on schedule whether or not the last reply came back, so a stall is measured rather than hidden | 1 · 1-07 |
| **operational transformation (OT)** | rewriting a concurrent edit against the one that went first, so either order produces the same text | 6 · 18-02 |
| **optimistic concurrency** | letting the work proceed and rejecting the write that names a version something else has moved past | 4 · 9-04 |
| **orchestration** | one component holding a saga's state machine, calling each service and deciding | 3 · 4-08 |
| **orphan work** | work still running after the caller that asked for it has given up | 1 · 8-05 |
| **outbox pattern** | writing the business row and an outbox row in one local transaction, so the change and the fact that it happened commit together | 4 · 8-02 |
| **PACELC** | if there is a Partition, choose Availability or Consistency; Else, choose Latency or Consistency | 3 · 6-04 |
| **PAN** | the card number. What travels decides PCI scope, not what is encrypted afterwards | 6 · 11-07 |
| **parallel change** | expanding an interface to serve both shapes, moving the callers, then contracting it | 5 · 5-03 |
| **Parquet** | a columnar file format storing a column chunk per column inside row groups, so a reader fetches only the columns it wants | 2 · 1-07 |
