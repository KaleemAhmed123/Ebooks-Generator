## Vector clocks

- A **vector clock** carries one counter **per node**, not a single integer, so it records not just "how many events" but "how many events *I've seen from each participant*." Each node increments its own slot on an event, and on receiving a message takes the element-wise **maximum** of its vector and the sender's. The vector is a complete fingerprint of everything causally behind an event.
- Comparing two vectors now answers the question Lamport clocks couldn't:
  - every element of `V(a)` ≤ `V(b)` and at least one strictly less → **a happened-before b** (causal).
  - every element ≥, one strictly greater → **b happened-before a**.
  - **neither dominates** (each is ahead on some node) → the events are **concurrent** — made without knowledge of each other. That's a **conflict** to resolve.
- This is exactly how **Dynamo-style stores** (Booklet 4) detect that two replicas took conflicting writes: the vectors are incomparable, so the system either keeps both versions (siblings) for the app to merge, or applies a merge rule (CRDTs, Module 3).

- The cost is size: a vector grows with the number of nodes that have ever written, so long-lived systems need pruning. The modern compromise is the **Hybrid Logical Clock (HLC)** — a compact value that combines a physical timestamp with a logical counter, giving causal ordering *and* roughly-real timestamps in 64 bits. CockroachDB and others use HLCs to order transactions without Spanner's atomic-clock hardware.

### Module 2 — checkpoint
- **Key concepts:** clock drift & NTP skew · LWW data loss · monotonic vs wall clock · TrueTime (physical, with hardware) · Lamport clocks (causal total order, can't detect concurrency) · vector clocks (detect concurrent = conflict) · HLC.
- **Task:** on two machines, compare `date +%s.%N` a few times — note they disagree. Then sketch a vector-clock trace for two nodes exchanging one message and identify which events are concurrent.
- **Questions:** Why can LWW silently drop a newer write? What can a vector clock tell you that a Lamport clock cannot? Why measure a timeout with the monotonic clock?
- **Next:** Module 3 — replication.
