# Module 5 - Consistency models

## A consistency model is a contract about reads

- A **consistency model** names which histories a system may show its clients: given these writes, in this order, which values may a read return. Nothing else. It is a contract about observation, not about storage
- Stronger model = fewer histories allowed = more coordination before a read can be answered. That is the whole trade: every step up the ladder in this module costs a round-trip somewhere
- The word "consistent" already means three things in this series, and a design review mixes them within a sentence

| "Consistent" | Means | Owner |
|---|---|---|
| ACID C | the transaction leaves invariants true; the application's promise | Module 1 |
| CAP C | linearizability: one copy, one order, real time | page 2, Module 6 |
| replica consistency | how far a follower may lag the leader | booklet 02 |

- This module covers the second and third: what a read may return when the data has more than one copy. Module 2 covered what a transaction may see inside one database; the two ladders are different axes (page 3)

### The failure

- "Our database is consistent" in a design doc. It says nothing until it names the model. A Postgres primary with async replicas is ACID-consistent, and a read from a replica may still return a value from a second ago. Ask which reads, from where, may be stale
