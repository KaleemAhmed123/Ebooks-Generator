## Replication decision table

- Deciding how to replicate your data is fundamentally a trade-off between write latency, data durability, and complexity

| Strategy | Write latency | Data loss on failover | Conflict handling | Best used for |
|---|---|---|---|---|
| **Single-leader Async** | Very fast (local disk only) | Yes (writes not yet streamed to followers are lost) | None (single writer avoids conflicts) | Default for most web apps. Losing a few seconds of data during a catastrophic fire is acceptable. |
| **Single-leader Sync** | Slow (waits for network ack) | No | None | Financial ledgers, billing systems. You cannot afford to lose a single acknowledged write. |
| **Multi-leader** | Fast (local to each region) | No | Nightmare (app must resolve concurrent edits) | Collaborative offline-first apps (Figma, Google Docs). Multi-region active-active setups. |
| **Leaderless** | Varies (fastest of W nodes) | No (if W+R > N and hints deliver) | Read repair, LWW, or CRDTs | Always-on carts (Amazon). Node failures are common and writes must never block. |

### The failure

- Promising zero data loss to the business while running Single-leader Asynchronous replication. It is mathematically impossible to guarantee zero data loss unless the write is physically durable on multiple machines before you reply "Success" to the user
- If your database is async, you must document the Recovery Point Objective (RPO) as "up to 30 seconds of data loss" and get the business to sign off on it
