## Range partitioning

- **Range partitioning** assigns each partition a contiguous range of sorted keys, like the volumes of an encyclopedia: A–C, D–F, G–I
- Bigtable tablets, HBase regions and CockroachDB ranges all work this way. The router holds the boundary keys; a read for `B` goes to the partition that owns A–C

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

- Adjacent keys sit on one node in sorted order, so a range scan is one sequential read, or a few, on neighbouring partitions
- The boundaries are not picked by hand. A partition that grows past a size limit splits in two (page 8); one that shrinks merges with its neighbour

### The failure

- A time-ordered key. Every new write has a timestamp larger than the last, so every new write lands on the last range, on one node, while the rest of the cluster serves reads of the past. Write throughput is one machine's, however many you own
- The fix keeps the range but changes what leads the key: `(sensor_id, timestamp)` spreads the writes across sensors and keeps each sensor's history in one sorted run (page 4)
