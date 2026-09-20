## What CAP does not cover

- The theorem is narrow. Its C is one specific model; its A is one specific promise; its P is one specific fault. Most of a design sits outside all three

| CAP says | CAP does not say |
|---|---|
| under a partition, linearizable or every node answers: not both | anything about latency; a linearizable system that answers in 800 ms is "CA" while the network holds |
| the fault is lost messages between nodes | anything about node crashes, disk loss, bugs, overload |
| the models are linearizable or not | anything about the models in between: causal, session guarantees, snapshot isolation |
| the property is per request under partition | which side of the partition keeps working, or whether a client can reach it |

- Kleppmann's 2015 argument: under the strict definitions most real systems are neither CP nor AP. A single-leader database with followers is not CP (a follower serves stale reads) and not AP (a client cut off from the leader gets errors). Labelling it either is not a fact about the system; it is a fact about which definitions were loosened
- The label that survives is the one that names the operation: "stock reservation refuses during a partition; the catalogue serves stale". That is what Module 5, page 11 asked for

### The failure

- A design review that spends its time deciding whether the database is CP or AP. The answer is "neither, strictly, and it depends which read", and the time was owed to the two questions CAP cannot answer: how long is a read allowed to lag, and what does the client see when the system refuses
