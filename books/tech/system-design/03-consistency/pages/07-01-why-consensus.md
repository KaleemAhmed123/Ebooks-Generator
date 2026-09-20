# Module 7 - Consensus

## Why consensus exists, and what it must guarantee

- **Consensus**: several nodes agree on one value, once, despite crashes and lost messages. The value is small: who leads, what the next log entry is, whether a transaction commits. Replication (booklet 02) copies decisions; it cannot make one, because a copy cannot tell a slow leader from a dead one
- The hand-rolled version fails the same way every time: "the live node with the lowest id is leader". Under a partition each side has a lowest live id. Two leaders

| Property | Meaning | If it is lost |
|---|---|---|
| **agreement** (safety) | no two nodes decide different values | two leaders, two logs, split brain (Module 8) |
| **validity** (safety) | the decided value was proposed by someone | a leader nobody nominated; a log entry from nowhere |
| **termination** (liveness) | every live node eventually decides | the cluster hangs; no leader, no writes |

- Safety must hold always; liveness only eventually. That split is forced. FLP (Fischer, Lynch and Paterson, 1985): in a fully asynchronous system, no deterministic protocol can guarantee agreement if even one node may crash, because a crashed node and a slow one look the same. Real protocols escape by assuming timeouts: they stay safe no matter what, and make progress whenever the network is calm for long enough
- So a consensus cluster does not promise to progress during a partition. It promises never to decide twice, and to resume when a majority can talk (page 10)

### The failure

- Expecting a consensus system to keep accepting writes while the network is split. It cannot on the minority side, by design; that is safety winning over liveness. A service that needs writes on both sides of a partition needs a mergeable data type and no consensus, not a better consensus
