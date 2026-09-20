## Replication decision table

- Four questions decide the row: how much acknowledged data may be lost on failover (the **recovery point objective**, RPO), what write latency is acceptable, how many regions take writes, and whether a conflict can be resolved

| Strategy | Write latency | Data loss on failover | Conflict handling | Best used for |
|---|---|---|---|---|
| **Leader, async** | Local commit only | Yes: whatever the followers had not received | None | The default; RPO measured in seconds of lag, and written down |
| **Leader, sync** | Plus one round trip to a follower | No | None | Ledgers, billing; one dead follower must not stall writes, so use a quorum (`ANY 2`) |
| **Leader, semi-sync** | Plus the fastest of several | No, until the timeout demotes it to async | None | Most of sync's safety at less latency; alert on the mode |
| **Multi-leader** | Local per region | No, if the region survives; a region's unsent writes are stranded | Yours: LWW, merge, or reject at write time | Multi-region writes, offline clients, collaborative editing |
| **Leaderless** | The W-th of N replies | No, with `W + R > N` and repair running; sloppy quorums weaken it | Version vectors and siblings; LWW; CRDTs | Always-writable stores where a dead node must not block anyone |

### The failure

- Promising zero data loss on an async setup. Zero means the write was durable on a second machine before the client was told; nothing else means zero. If the setup is async, the RPO is the replication lag, and it belongs in the design document as a number the business agreed to, not a surprise on the day of the failover
