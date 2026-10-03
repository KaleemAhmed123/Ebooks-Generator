## Hash vs range partitioning

- Two ways to map a key to a partition, with opposite strengths:
- **Range partitioning** keeps keys **in sorted order**, each partition owning a contiguous range (`A–I`, `J–R`, `S–Z`; or time ranges). **Range scans are cheap** — "all orders from March" is one partition, read sequentially. The danger is **hot spots**: if keys arrive in order (timestamps, auto-increment IDs), **every new write lands in the same last partition**, so one node takes all the write load while the rest idle.
- **Hash partitioning** runs the key through a hash function and assigns by the result, **scattering** keys uniformly. Load spreads evenly even for sequential keys — but you **lose range scans**: "all orders from March" is now smeared across every partition, so that query must hit them all (a scatter-gather).

<svg viewBox="0 0 360 86" role="img" aria-label="Range partitioning keeps sorted ranges, good for scans but sequential writes hot-spot one partition; hash partitioning scatters keys evenly but loses range scans" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.3" fill="#1f487e">range</text>
  <rect x="24" y="20" width="44" height="16" fill="#eef2f8" stroke="#1f487e"/><text x="46" y="31" text-anchor="middle" font-size="5.4">A–I</text>
  <rect x="70" y="20" width="44" height="16" fill="#eef2f8" stroke="#1f487e"/><text x="92" y="31" text-anchor="middle" font-size="5.4">J–R</text>
  <rect x="116" y="20" width="44" height="16" fill="#fdecea" stroke="#c0392b"/><text x="138" y="31" text-anchor="middle" font-size="5.4">S–Z ←all writes</text>
  <text x="90" y="52" text-anchor="middle" font-size="5.3" fill="#777">scans easy · sequential keys hot-spot</text>
  <text x="270" y="12" text-anchor="middle" font-size="6.3" fill="#1f487e">hash</text>
  <rect x="204" y="20" width="44" height="16" fill="#eef2f8" stroke="#1f487e"/><text x="226" y="31" text-anchor="middle" font-size="5.4">p0</text>
  <rect x="250" y="20" width="44" height="16" fill="#eef2f8" stroke="#1f487e"/><text x="272" y="31" text-anchor="middle" font-size="5.4">p1</text>
  <rect x="296" y="20" width="44" height="16" fill="#eef2f8" stroke="#1f487e"/><text x="318" y="31" text-anchor="middle" font-size="5.4">p2</text>
  <text x="270" y="52" text-anchor="middle" font-size="5.3" fill="#777">even spread · scans hit all partitions</text>
</svg>

- The real world uses a **compound key** to get both: hash a **partition key** to pick the node, then **range-sort within** it by a **sort key**. DynamoDB's partition-key/sort-key and Cassandra's partition-key/clustering-column are exactly this — even distribution across nodes, ordered scans *within* a partition. "Get this user's last 20 messages" is then one partition, sorted — fast and balanced.
- The design takeaway: **pick the partition key for even load, pick the sort key for your query's range.** A partition key with few distinct values (e.g. `status`) or a monotonic one (e.g. `timestamp`) re-creates the hot-spot you were avoiding — which is the next page's failure mode.
