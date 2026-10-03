## Resolving conflicts and keeping replicas honest

- Multi-leader and leaderless replication both admit **concurrent conflicting writes** (vector clocks, Module 2, detect them). Three ways to resolve:
  - **Last-write-wins** — keep the one with the highest timestamp. Simple, and **lossy** — it silently discards the other write, with the clock-skew hazard from Module 2. Fine only when losing a write is acceptable.
  - **Keep siblings** — store *both* conflicting versions and hand them to the application to merge (a shopping cart keeps every added item). Correct, but pushes work to the app.
  - **CRDTs** (Conflict-free Replicated Data Types) — data types defined so that **any merge order converges to the same correct result**: grow-only counters, add/remove sets, and so on. Replicas can diverge freely and still reconcile automatically. They power collaborative editors and offline-first apps, at the cost of more metadata.
- There is no universal "right" answer — it's a product decision about what a conflict *means* for that data.

- Replicas also drift from plain missed messages, not just conflicts, so leaderless systems run three repair mechanisms in the background:
  - **Read-repair** — on a read, if replicas disagree, push the newest value to the stale ones. Repairs the data people actually touch.
  - **Anti-entropy** — a background process compares replicas (often via **Merkle trees**, so only differing ranges are exchanged, not everything) and syncs the differences.
  - **Hinted handoff** — if a replica is down during a write, another node stores a "hint" and delivers it when the node returns, so the write isn't lost to a brief outage.

:::note
**Gossip** works at the membership level: each node periodically exchanges state with a few random peers, so knowledge of who's alive, who's down, and ring changes spreads cluster-wide in `O(log N)` rounds with no central coordinator. Cassandra uses it for membership and failure detection — "tell a few friends, they tell a few more."
:::

### Module 3 — checkpoint
- **Key concepts:** replicate for availability/read-scale/locality · leader-follower (sync vs async, lag, read-your-writes, failover) · multi-leader (conflicts) · leaderless + quorum `R+W>N` · LWW/siblings/CRDTs · read-repair, anti-entropy/Merkle, hinted handoff, gossip.
- **Task + questions:** for `N=5`, list the `(R,W)` pairs with `R+W>N` and say which favours fast reads vs writes; then explain why `R+W>N` guarantees the read sees the latest write.
- **Next:** Module 4 — partitioning.
