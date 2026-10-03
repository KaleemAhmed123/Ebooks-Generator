## Leader–follower replication

- The most common scheme: one node is the **leader** (primary) and the only one that accepts writes. It applies each write to its own log and **streams that log to followers** (replicas), which replay it to stay current. Reads can be served by the leader or, to scale, by any follower. This is what Postgres, MySQL, and Redis replication do by default.
- The decisive knob is **when the leader considers a write done**:
  - **Synchronous** — wait for a follower to acknowledge before telling the client "committed." The write survives the leader dying, but you've coupled your latency to the slowest follower, and if that follower stalls, writes **block**.
  - **Asynchronous** — commit as soon as the leader has it; followers catch up after. Fast and non-blocking, but if the leader dies before a write propagates, that **write is lost**.
- Most systems run async (or semi-sync: one sync follower, the rest async) and accept a small loss window for speed.

<svg viewBox="0 0 360 80" role="img" aria-label="A leader accepts a write and streams its log to followers asynchronously; followers lag behind, so a read from a follower may be stale" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="20" y="30" width="70" height="22" rx="3" fill="#e6edf5" stroke="#1f487e"/><text x="55" y="41" text-anchor="middle" font-size="6.3">leader</text><text x="55" y="49" text-anchor="middle" font-size="5.2" fill="#777">writes here</text>
  <rect x="200" y="8" width="80" height="20" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="240" y="20" text-anchor="middle" font-size="6">follower (lag 2ms)</text>
  <rect x="200" y="54" width="80" height="20" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="240" y="66" text-anchor="middle" font-size="6">follower (lag 5s!)</text>
  <path d="M90 38 L200 20" stroke="#1a1a1a" marker-end="url(#lf)"/><path d="M90 44 L200 62" stroke="#1a1a1a" marker-end="url(#lf)"/>
  <text x="150" y="30" font-size="5.4" fill="#555">async log stream</text>
  <text x="300" y="66" font-size="5.4" fill="#c0392b">stale reads</text>
  <defs><marker id="lf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Replication lag** is the gap between leader and follower, and it creates **stale reads**. The classic bug is **read-your-own-writes**: a user updates their profile (write → leader), the page reloads and reads from a lagging follower, and their change **isn't there** — looks like the save failed. Fixes: route a user's reads to the leader for a short window after they write, or track the write's log position and only read from a follower that has reached it.

:::warn
**Failover is where leader-follower bites hardest.** When the leader dies, a follower is promoted — but with async replication, any writes the old leader hadn't yet shipped are **gone**. Worse, if the old leader was only *unreachable*, not dead (Module 1), and comes back still thinking it's leader, you now have **two leaders** accepting divergent writes — **split-brain** (Module 6). Safe failover needs consensus to agree on exactly one leader, which is why etcd/ZooKeeper exist.
:::
