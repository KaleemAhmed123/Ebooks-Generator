## PACELC — the trade you make every day

- CAP's blind spot is that it only speaks during a **partition**, which is rare. **PACELC** completes it: **if Partition, trade Availability vs Consistency; Else, trade Latency vs Consistency.** The second half is the one you live with every single request, partition or not.
- Why there's a latency-vs-consistency trade even on a healthy network: **strong consistency requires coordination**, and coordination costs round trips. For a linearizable write, the system must confirm with a quorum before acknowledging — extra network hops (Module 1's latency ratios) on every operation. Want the read to see the latest write? Someone has to check with the other replicas first. **Stronger consistency = more waiting**, even when nothing is broken.

- Classifying real systems in PACELC makes their personality clear:
  - **DynamoDB, Cassandra = PA/EL** — stay available under partition, and in normal operation favour **low latency** over strong consistency (eventual by default, tunable up).
  - **Spanner = PC/EC** — consistent under partition, and even normally pays the **latency** (TrueTime commit-wait) to stay strongly consistent.
  - **Most SQL databases (single region) = PC/EC** — they'd rather error than serve inconsistent data, and accept coordination latency for correctness.
- The practical habit this builds: when someone says "make it strongly consistent," hear **"add coordination latency to every request"** and ask whether the feature actually needs it. A like-count can be eventual (EL); a payment balance cannot (EC). Choosing per-feature, not per-system, is a senior move — and many stores (Cassandra, DynamoDB) let you pick the consistency level **per query** for exactly this reason.

### Module 5 — checkpoint
- **Key concepts:** consistency ladder (linearizable → sequential → causal → eventual) · linearizability (recency) vs serializability (isolation) · CAP = C-vs-A **only during a partition** (P is a given) · CP vs AP systems · PACELC adds the everyday **latency-vs-consistency** trade · per-query consistency.
- **Task + questions:** classify a system you use in PACELC; then explain why strong consistency costs latency even with no partition, and give one feature that should be EL and one that must be EC.
- **Next:** Module 6 — consensus and Raft.
