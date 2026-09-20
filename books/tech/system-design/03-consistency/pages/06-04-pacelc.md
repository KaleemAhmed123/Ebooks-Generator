## PACELC

- **PACELC** (Abadi, 2012): if there is a **P**artition, choose **A**vailability or **C**onsistency; **E**lse, choose **L**atency or **C**onsistency. The second trade-off is the one that runs all day. A replicated write is either acknowledged after every replica has it (consistency, at the cost of the slowest replica's round-trip) or before (latency, at the cost of a reader seeing an older copy)
- Four combinations exist and all are shipped. Abadi's classification of the systems he examined

| Class | Under partition | Normally | Abadi's examples |
|---|---|---|---|
| **PA/EL** | keep answering, diverge | answer fast, replicate later | Dynamo, Cassandra, Riak |
| **PC/EC** | refuse rather than diverge | wait for replicas before acknowledging | VoltDB/H-Store, Megastore, BigTable, HBase |
| **PA/EC** | keep answering | wait for replicas | MongoDB, as classified in the paper |
| **PC/EL** | refuse | answer fast | PNUTS |

- The second letter pair is what the client feels every day. A PA/EL store's read may be stale during ordinary operation, not just during an outage; that is what makes it fast. The paper's point about quorum tuning stands: `R + W > N` does not reach the consistency in Gilbert and Lynch's sense (booklet 02 and Module 5, page 2 agree)
- The classification is for a default configuration. Most of these systems have knobs that move them: Cassandra's per-query consistency level, MongoDB's write concern. The class is a fact about the setting in use, so name the setting

### The failure

- Copying a PA/EL design for a ledger because it is the fashionable one. The ledger's invariant ("balance never below zero") needs C on both sides of the slash. Dynamo's own paper is about shopping carts, where a merge is a union and a stale read costs nothing
