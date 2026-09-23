## Glossary: D–E

| Term | Means | Where |
|---|---|---|
| **distributed monolith** | services that look independently deployable but cannot ship separately, because every event is a shared struct | 4 · 14-02 |
| **DNS** | the name-to-address lookup whose answers are cached by resolvers the operator does not control | 5 · 7-09 |
| **document store** | a store holding self-contained entities read whole, with structure enforced on read | 2 · 9-03 |
| **double-entry ledger** | recording every movement of money as a debit and a credit that sum to zero, so no write can create or destroy money | 6 · 11-03 |
| **downsampling** | replacing a run of samples with one summary per coarser interval, keeping min, max, sum and count so spikes and rates survive | 6 · 15-05 |
| **dual write** | committing to two systems with no shared transaction — a database and a broker, or an old store and its replacement — either can fail after the other succeeded | 4 · 8-01 |
| **durability** | once the commit returns, the write survives a crash. The promise ends at **fsync** | 3 · 1-05 |
| **dynamic partitioning** | letting the data decide the partition count: one past a size limit splits at its median key, small neighbours merge | 2 · 8-08 |
| **efficiency lock** | a lock whose absence only wastes work — two nodes rebuilding the same cache | 3 · 8-06 |
| **election restriction** | the Raft rule that a node refuses its vote to a candidate whose log is less up to date than its own | 3 · 7-06 |
| **election storm** | a cluster that spends its time voting, because timeouts fire faster than heartbeats arrive | 3 · 7-04 |
| **election timeout** | how long a follower waits without a heartbeat before standing for election | 3 · 7-04 |
| **error budget** | the gap between the SLO and 100 %, spent deliberately on deploys and risky changes | 1 · 1-05 |
