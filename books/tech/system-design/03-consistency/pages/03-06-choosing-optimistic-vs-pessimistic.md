## Choosing optimistic vs pessimistic

- The choice between optimistic and pessimistic concurrency control comes down entirely to **contention rate**: the probability that two transactions will try to modify the exact same row at the exact same time

| Metric | Optimistic Concurrency | Pessimistic Locking |
|---|---|---|
| **Contention rate** | Low (users editing their own profiles). | High (users buying tickets to a concert). |
| **Performance when safe** | High. No lock wait time. | Medium. Locking adds latency. |
| **Performance under heavy load** | **Terrible**. Wasted work and infinite retry loops. | **Great**. Threads queue up gracefully. |
| **Supported across systems** | Yes. Works across stateless HTTP. | No. Only inside a single DB transaction. |

- If you don't know your contention rate, a good rule of thumb is: use optimistic concurrency for human-driven edits (profiles, wiki pages, settings), and use pessimistic locking (or atomic database operations) for machine-driven events (counters, inventory, financial ledgers)

### The failure

- Measuring neither and picking by taste. Many teams choose optimistic concurrency simply because they don't like the syntax of `SELECT FOR UPDATE`, or they are using an ORM that defaults to versions. When their startup goes viral, their database spends 99% of its CPU aborting and retrying doomed transactions
