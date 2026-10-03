## Raft: leader election

- Raft was designed to be **understandable** where Paxos is notoriously not, and it's what etcd, Consul, CockroachDB, TiKV, and many others actually run. It splits consensus into two parts: electing a leader (this page) and replicating a log (next). Every node is in one of three roles — **follower**, **candidate**, or **leader** — and time is divided into numbered **terms**, each with **at most one leader**. A term is a logical clock (Module 2) for elections.

<svg viewBox="0 0 360 96" role="img" aria-label="Raft roles: a follower that times out becomes a candidate, wins a majority of votes to become leader, and sends heartbeats; it steps down if it sees a higher term" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="18" y="40" width="80" height="22" rx="4" fill="#eef2f8" stroke="#1f487e"/><text x="58" y="54" text-anchor="middle" font-size="6.3">follower</text>
  <rect x="140" y="40" width="80" height="22" rx="4" fill="#e6edf5" stroke="#1f487e"/><text x="180" y="54" text-anchor="middle" font-size="6.3">candidate</text>
  <rect x="262" y="40" width="80" height="22" rx="4" fill="#dfe9d9" stroke="#2f7d4f"/><text x="302" y="54" text-anchor="middle" font-size="6.3">leader</text>
  <path d="M98 51 L140 51" stroke="#1a1a1a" marker-end="url(#rf)"/><text x="119" y="36" text-anchor="middle" font-size="5.3">timeout</text><text x="119" y="72" text-anchor="middle" font-size="5" fill="#777">++term, request votes</text>
  <path d="M220 51 L262 51" stroke="#1a1a1a" marker-end="url(#rf)"/><text x="241" y="36" text-anchor="middle" font-size="5.3">majority</text>
  <path d="M302 62 C302 86, 58 86, 58 62" stroke="#999" marker-end="url(#rf)"/><text x="180" y="92" text-anchor="middle" font-size="5" fill="#777">sees higher term → step down; else heartbeats keep followers calm</text>
  <defs><marker id="rf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The election: a leader sends periodic **heartbeats**. If a follower hears nothing for its **election timeout**, it assumes the leader is gone, becomes a **candidate**, increments the term, votes for itself, and asks everyone for votes. Each node grants **one vote per term**, so a candidate that collects a **majority** becomes leader and starts sending heartbeats; the others fall back to follower.
- The clever bit is **randomized election timeouts** (e.g. 150–300 ms, each node different). This is Raft's answer to the FLP impossibility (Module 1): without randomness, nodes could time out together, split the vote, and loop forever. Randomizing means one node almost always times out first and wins before the others start — breaking the symmetry that pure determinism cannot. If a split vote does happen, no one gets a majority, the term ends with no leader, and new random timeouts try again.
- Because a leader always carries the current **term**, a stale leader that was only partitioned (not dead) discovers a **higher term** the moment it rejoins and immediately **steps down** — the mechanism that quietly prevents the two-leaders problem failover alone couldn't (Module 3).
