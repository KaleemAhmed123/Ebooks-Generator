## Three styles, one table

| | Leader-based | Multi-leader | Leaderless |
|---|---|---|---|
| **Writes go to** | The one leader | The local leader of this region | Any W of the N replicas |
| **Reads go to** | Leader, or a follower behind it | Any leader | Any R replicas; newest version wins |
| **Conflicts** | None: one log, one order | The normal case; LWW, merge, or abort | The normal case; version vectors, siblings, read repair |
| **What lag means** | The follower is a past snapshot | Each region is a past snapshot of the others | Each replica may have missed some writes |
| **Failover** | Detect, fence, promote | Lose a region's leader; its writes are queued until it returns | None; a dead replica is one fewer voter |
| **Durability knob** | Sync / semi-sync / async | Per region; cross-region is async unless MRSC-style coordination | W (and the sloppy-quorum caveat) |
| **Cross-region latency** | Every write crosses to the leader | Local | Local for `LOCAL_QUORUM`; global for `QUORUM` |
| **Who** | Postgres, MySQL, Redis, MongoDB | DynamoDB global tables, MySQL Group Replication multi-primary, offline-first apps | Cassandra, Riak, Dynamo |

- The column to choose is decided by two questions from Module 5, page 1: which of availability, read scale and locality you need, and whether a conflict is something you can resolve. If it is not, the first column is the only column

### The failure

- Mixing the styles in one design without saying which guarantees survived. A leader-based Postgres feeding a leaderless cache by async replication has the anomalies of both: replication lag on the way in, stale-read votes on the way out. Name the weakest link; that is the guarantee the system actually has
