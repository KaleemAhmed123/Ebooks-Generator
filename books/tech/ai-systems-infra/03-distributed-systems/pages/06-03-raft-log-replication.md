## Raft: log replication and safety

- Once elected, the leader is the **only** node that accepts client commands. It appends each command to its **log** as an entry (with its term and index) and sends it to followers via **AppendEntries** messages (which double as heartbeats). An entry becomes **committed** the moment a **majority** of nodes have stored it — and only then does the leader apply it to its state machine and reply to the client. Committed means durable: it will survive any future leader change.

:::mint
```text
index:   1      2      3      4
leader   x=1    x=2    y=7    z=3   ← appends here, replicates down
follower x=1    x=2    y=7    (…)   ← caught up to 3, entry 4 in flight
follower x=1    x=2    (…)           ← lagging; leader backfills from 3

entry committed once a MAJORITY holds it → then applied
```
:::

- Consistency comes from the **Log Matching** property: each AppendEntries includes the term+index of the **preceding** entry, and a follower **rejects** it if its own log doesn't match there. On rejection the leader walks backwards and **re-sends** from the last agreed point, overwriting any divergent tail. So every log converges to the leader's — no follower can silently hold a different history.
- Safety across crashes rests on the **election restriction**: a node will only vote for a candidate whose log is **at least as up-to-date** as its own. That guarantees a new leader already contains **every committed entry** (a committed entry is on a majority, and any winning candidate needed a majority's votes, so the two majorities overlap on a node that has it). A committed decision can therefore never be lost to a leader change — the core safety promise.
- This *is* how **etcd** keeps Kubernetes' state consistent across control-plane nodes: the API server's writes are Raft log entries, committed by majority, applied in identical order on every member. Lose one of three control-plane nodes and the cluster runs on; lose two (no majority) and etcd correctly **stops accepting writes** rather than risk divergence.
