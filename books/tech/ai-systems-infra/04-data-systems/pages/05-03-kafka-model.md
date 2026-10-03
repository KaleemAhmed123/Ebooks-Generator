## Kafka

- **Kafka** is a distributed, append-only **log** built for high throughput and replay. A **topic** is split into **partitions**, and a partition is the unit of order, parallelism, and storage: records are appended in order and each gets a monotonic **offset** (Booklet 3's Lamport-style sequence). Order is guaranteed **within** a partition, not across — so the **key** decides the partition (all events for `order-42` land in the same partition and stay ordered).

<svg viewBox="0 0 360 96" role="img" aria-label="A Kafka topic has partitions, each an ordered offset sequence; a consumer group splits partitions among its members, and each group tracks its own offsets independently" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="12" font-size="6.3" fill="#6a4c93">topic: orders</text>
  <text x="14" y="30" font-size="5.6">P0</text><rect x="30" y="22" width="110" height="12" fill="#f7f4fa" stroke="#6a4c93"/><text x="85" y="31" text-anchor="middle" font-size="5">0 1 2 3 4 5 →</text>
  <text x="14" y="48" font-size="5.6">P1</text><rect x="30" y="40" width="110" height="12" fill="#f7f4fa" stroke="#6a4c93"/><text x="85" y="49" text-anchor="middle" font-size="5">0 1 2 3 →</text>
  <text x="14" y="66" font-size="5.6">P2</text><rect x="30" y="58" width="110" height="12" fill="#f7f4fa" stroke="#6a4c93"/><text x="85" y="67" text-anchor="middle" font-size="5">0 1 2 3 4 →</text>
  <rect x="180" y="20" width="80" height="22" rx="3" fill="#ece4f3" stroke="#6a4c93"/><text x="220" y="30" text-anchor="middle" font-size="5.6">group: billing</text><text x="220" y="39" text-anchor="middle" font-size="5" fill="#777">members split P0–P2</text>
  <rect x="180" y="50" width="80" height="22" rx="3" fill="#e6edf5" stroke="#1f487e"/><text x="220" y="60" text-anchor="middle" font-size="5.6">group: analytics</text><text x="220" y="69" text-anchor="middle" font-size="5" fill="#777">own offsets</text>
  <path d="M140 31 L180 31" stroke="#999" marker-end="url(#kf)"/><path d="M140 55 L180 60" stroke="#999" marker-end="url(#kf)"/>
  <text x="300" y="46" text-anchor="middle" font-size="5.4" fill="#777">each group reads<tspan x="300" dy="9">all records,</tspan><tspan x="300" dy="9">independently</tspan></text>
  <defs><marker id="kf" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **Consumer groups** give both parallelism and independence. Within one group, the partitions are **divided** among members (so N partitions → up to N parallel consumers; more consumers than partitions just idle). Across groups, each group tracks **its own offsets**, so `billing` and `analytics` both read every record without affecting each other — the "many independent consumers" property a queue can't offer.
- **Durability and scale** come from partition **replication**: each partition has a leader broker and follower replicas (the **in-sync replicas**, ISR); a write is acknowledged once enough replicas have it (a quorum-like durability knob, `acks=all` — Booklet 3). Lose the leader and a follower takes over. **Retention** is by time or size, independent of consumption — records stay for, say, 7 days whether or not anyone read them, which is exactly what makes **replay** possible.
