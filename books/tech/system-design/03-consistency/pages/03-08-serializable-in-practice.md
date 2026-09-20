## Serializable in practice

- The level's name is the same everywhere. What it does to your throughput is not

| System | Mechanism | What you sign up for |
|---|---|---|
| Postgres | SSI, optimistic | no blocking; `40001` aborts under contention; a retry loop on every transaction |
| InnoDB | 2PL: plain `SELECT` becomes `FOR SHARE` | no aborts, but readers block writers; long reads stall the write path |
| CockroachDB | its own optimistic protocol; Serializable is the **default** | the same retry contract as Postgres, but from the first line of the app; Read Committed is opt-in |
| DynamoDB | `TransactWriteItems`, prepare then commit inside the service | serializable across the items in one transaction; 100 items, 4 MB, two underlying writes per item; a conflicting transaction fails with `TransactionCanceledException` |

- The choice is between two failure modes, not between fast and slow: aborts you must retry, or queues you must not hold across anything slow

### The failure

- Flipping the pool to `SERIALIZABLE` after reading about write skew. On Postgres the app starts returning 500s at peak, because nothing catches `40001`. On InnoDB nothing errors and the p99 climbs, because every read now holds a shared lock until commit. Each engine needs its own preparation, and neither is a config change
