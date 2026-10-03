# Partitioning

## Why partition

- Replication (Module 3) puts the **whole** dataset on every node — great for reads and availability, useless once the data or the **write** rate outgrows a single machine, because every node still holds everything and every write still hits one leader. **Partitioning** (a.k.a. **sharding**) is the other axis: **split** the dataset so each node holds only a **subset**, and writes spread across nodes.
- The two are **orthogonal and combined in practice**: partition to scale, then replicate each partition to survive node loss. A real cluster is a grid — partition P1 lives on nodes A (leader) + B (replica), P2 on B (leader) + C, and so on. You get both scale and durability.

<svg viewBox="0 0 360 80" role="img" aria-label="Partitioning splits a dataset into subsets across nodes, and each partition is also replicated to another node for durability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="180" y="12" text-anchor="middle" font-size="6.3" fill="#1f487e">keys A–Z split into 3 partitions, each replicated</text>
  <rect x="24" y="24" width="90" height="42" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="69" y="38" text-anchor="middle" font-size="6">node 1</text><text x="69" y="50" text-anchor="middle" font-size="5.6">P1 (A–I) leader</text><text x="69" y="60" text-anchor="middle" font-size="5.6" fill="#777">P3 replica</text>
  <rect x="135" y="24" width="90" height="42" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="180" y="38" text-anchor="middle" font-size="6">node 2</text><text x="180" y="50" text-anchor="middle" font-size="5.6">P2 (J–R) leader</text><text x="180" y="60" text-anchor="middle" font-size="5.6" fill="#777">P1 replica</text>
  <rect x="246" y="24" width="90" height="42" rx="3" fill="#eef2f8" stroke="#1f487e"/><text x="291" y="38" text-anchor="middle" font-size="6">node 3</text><text x="291" y="50" text-anchor="middle" font-size="5.6">P3 (S–Z) leader</text><text x="291" y="60" text-anchor="middle" font-size="5.6" fill="#777">P2 replica</text>
</svg>

- The whole game of partitioning is **assigning a key to a partition** well, and "well" means two things at once:
  - **even load** — no single partition gets disproportionate data or traffic (a **hot partition** melts one node while others idle);
  - **efficient lookups** — given a key, you (and the router) can find its partition cheaply, and common queries don't have to hit *every* partition.
- Those two goals fight each other, and the next three pages are the trade-offs: how you map keys (hash vs range), how you keep the mapping stable as nodes come and go (consistent hashing), and what to do when one key is simply too popular.
