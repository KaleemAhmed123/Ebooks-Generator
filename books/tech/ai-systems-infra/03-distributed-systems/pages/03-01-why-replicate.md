# Replication

## Why replicate

- **Replication** keeps copies of the same data on more than one node. You do it for three reasons, and it helps to be clear which one you're buying, because they pull in different directions:
  - **Availability** — if one node dies, a copy on another serves the data. The system survives machine, rack, or whole-datacentre loss.
  - **Read throughput** — many replicas can serve reads in parallel, so you scale reads far past one machine.
  - **Locality** — a copy near the reader (same region) answers in 1 ms instead of 100 ms (Module 1's latency ratios). CDNs are replication for static data.
- The price is the entire rest of this module: **the instant you have two copies, a write has to reach both, and while it's in flight the copies disagree.** Everything about replication is managing that window — how writes propagate, what a reader sees during propagation, and what happens when two writes race.

<svg viewBox="0 0 360 78" role="img" aria-label="One logical dataset kept as copies on three nodes gives availability, read scaling, and locality, at the cost of keeping the copies consistent" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="140" y="8" width="80" height="18" rx="3" fill="#e6edf5" stroke="#1f487e"/><text x="180" y="20" text-anchor="middle" font-size="6.3">one dataset</text>
  <rect x="24" y="48" width="84" height="20" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="66" y="60" text-anchor="middle" font-size="6">copy · node 1</text>
  <rect x="138" y="48" width="84" height="20" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="180" y="60" text-anchor="middle" font-size="6">copy · node 2</text>
  <rect x="252" y="48" width="84" height="20" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="294" y="60" text-anchor="middle" font-size="6">copy · node 3</text>
  <path d="M168 26 L72 48" stroke="#999" marker-end="url(#rp)"/><path d="M180 26 L180 48" stroke="#999" marker-end="url(#rp)"/><path d="M192 26 L288 48" stroke="#999" marker-end="url(#rp)"/>
  <defs><marker id="rp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The design axis that organises the next three pages is **who may accept a write**: exactly one node (**leader-follower**), several nodes (**multi-leader**), or any node (**leaderless**). Each choice trades write simplicity against availability and conflict risk — there is no option with all three.
