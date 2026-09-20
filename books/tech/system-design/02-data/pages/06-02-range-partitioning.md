## Range partitioning

- The simplest way to divide data is by ranges of the key, like volumes of a physical encyclopedia (A–C, D–F, G–I)
- Bigtable tablets, HBase regions, and CockroachDB ranges use this strategy. The database knows the boundary keys for each partition. If a client wants to read key `B`, the router checks the map and forwards the request to the `A-C` partition

<svg viewBox="0 0 460 140" role="img" aria-label="Range partitioning. Keys are sorted. Node 1 holds 2026-01 to 2026-04. Node 2 holds 2026-05 to 2026-08. Node 3 holds 2026-09 to 2026-12." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="24" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="60" y="66" text-anchor="middle">Range Scan</text>
  
  <rect x="150" y="10" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="24" text-anchor="middle">Node 1</text>
  <text x="200" y="34" text-anchor="middle" font-size="6">Jan - Apr</text>
  
  <rect x="150" y="55" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="69" text-anchor="middle">Node 2</text>
  <text x="200" y="79" text-anchor="middle" font-size="6">May - Aug</text>
  
  <rect x="150" y="100" width="100" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="200" y="114" text-anchor="middle">Node 3</text>
  <text x="200" y="124" text-anchor="middle" font-size="6">Sep - Dec</text>
  
  <path d="M100 62 L150 25" stroke="#1d4e89" fill="none"/><path d="M150 25 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-30 150 25)"/>
  <path d="M100 62 L150 70" stroke="#1d4e89" fill="none"/><path d="M150 70 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(10 150 70)"/>
  
  <text x="270" y="66" font-weight="bold">Benefit: Range Queries</text>
  <text x="270" y="80" font-size="7">"Give me all records from March to June"</text>
  <text x="270" y="90" font-size="7">hits exactly 2 adjacent nodes, in order.</text>
</svg>

- **The benefit**: Because keys are sorted within the partition, range scans are incredibly cheap. If the key is a timestamp, querying "all events from March to June" is a sequential disk read across adjacent partitions
- **The boundaries**: The boundaries are usually not chosen manually. The database splits the range dynamically when a partition grows too large (e.g., beyond 100 MB), adjusting the boundaries to maintain even data sizes

### The failure

- Time-ordered keys are the fatal flaw of range partitioning. If your partition key is a timestamp (e.g., `2026-09-20T10:00:00`), every single new write arriving at this very second will have a timestamp greater than the last one
- This means 100% of your incoming writes are routed to exactly one partition: the one holding the end of the range. The other 99 nodes sit completely idle. The write throughput of the entire cluster is bottlenecked by a single machine
