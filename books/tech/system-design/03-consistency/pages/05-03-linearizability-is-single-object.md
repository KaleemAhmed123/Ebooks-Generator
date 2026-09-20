## Linearizability is per object; serializability is per transaction

- Linearizability is a **single-object** model: one register, one row, one key. It says nothing about a transaction that touches two rows
- Serializability (Module 2) is a **multi-object** model: transactions behave as if run one at a time, in some order. It says nothing about real time: the chosen order may put a transaction that committed at noon before one that committed at 11:00
- **Strict serializability** is both: serializable, and the serial order respects real time. It is what a single-node database with two-phase locking gives (Module 3, page 6), and what Spanner and CockroachDB advertise

| Model | Objects | Respects real time | Typical source |
|---|---|---|---|
| linearizable | one | yes | etcd, ZooKeeper writes, a single-leader store read at the leader |
| serializable | many, per transaction | no | Postgres `SERIALIZABLE` (SSI); the order is chosen by the conflict graph |
| strict serializable | many | yes | 2PL on one node; Spanner; CockroachDB |
| snapshot isolation | many | no; reads see a fixed past | Postgres Repeatable Read, InnoDB default |

- Postgres SSI can commit T1 then T2 in wall-clock order and still choose the serial order T2, T1 when no conflict forbids it. A read-only transaction may then see a state that never existed in real time. That is the gap between serializable and strict

### The failure

- Calling a serializable database "linearizable" and assuming a fresh read of one row. At Repeatable Read the row is as old as the transaction's snapshot; at Serializable the order is consistent but not necessarily current. For a fresh single-row read you need the leader and a real-time guarantee, which is page 5
