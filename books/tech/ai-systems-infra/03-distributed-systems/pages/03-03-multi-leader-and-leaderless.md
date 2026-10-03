## Multi-leader and leaderless

- Leader-follower has one write bottleneck and one failover point. Two other schemes relax that:
- **Multi-leader.** Several nodes accept writes and replicate to each other. Useful across **regions** (each region writes locally, low latency) or for **offline clients** (each device is a leader, syncing later). The cost is unavoidable: the same record can be edited in two places at once, so you get **write conflicts** that must be detected (vector clocks, Module 2) and resolved (next page). You traded a single bottleneck for a merge problem.
- **Leaderless** (Dynamo-style: DynamoDB, Cassandra). **Any** replica accepts a write. The client (or a coordinator) sends each write to all N replicas and waits for **W** acknowledgements; it reads from **R** replicas and takes the newest. The trick is the **quorum rule**:

<svg viewBox="0 0 360 86" role="img" aria-label="Quorum: with N equal to 3 replicas, writing to 2 and reading from 2 means the write set and read set always overlap on at least one replica, so a read sees the latest write" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <circle cx="90" cy="34" r="16" fill="#e6edf5" stroke="#1f487e"/><text x="90" y="37" text-anchor="middle" font-size="6">R1</text>
  <circle cx="150" cy="34" r="16" fill="#dfe9d9" stroke="#2f7d4f"/><text x="150" y="37" text-anchor="middle" font-size="6">R2</text>
  <circle cx="210" cy="34" r="16" fill="#e6edf5" stroke="#1f487e"/><text x="210" y="37" text-anchor="middle" font-size="6">R3</text>
  <text x="150" y="64" text-anchor="middle" font-size="6.3">N=3,  W=2,  R=2   →   R + W &gt; N</text>
  <text x="150" y="76" text-anchor="middle" font-size="5.8" fill="#2f7d4f">write set and read set must share ≥1 replica → read sees the write</text>
</svg>

- **`R + W > N`** forces the read set and write set to **overlap** on at least one replica, so a read is guaranteed to touch a node that saw the latest write. That single inequality is the tunable: `W=N` makes writes durable but fragile (one slow node stalls writes); `W=1, R=1` is fast but can miss recent writes; `R+W>N` buys consistency without a leader. Leaderless systems stay writable even when nodes are down, which is their whole appeal.
- The subtlety: quorums give you **strong-ish** reads, not linearizability — concurrent writes can still produce conflicts, and a read during a partition can see an older value. Which is why the next page is about resolving the conflicts quorums don't prevent.
