## Dynamic partitioning

- For databases using range partitioning, a fixed number of partitions is impossible. If you guess the ranges wrong, one partition might contain zero data while another contains 500 GB
- The solution is **dynamic partitioning**. The database splits a partition in half when it exceeds a configured size limit, and merges it with an adjacent partition when it shrinks

<svg viewBox="0 0 460 140" role="img" aria-label="Dynamic partitioning. A 130 MB chunk (A-Z) splits down the middle into two 65 MB chunks (A-M and N-Z). One chunk is then moved to a new node." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="40" width="80" height="60" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="90" y="65" text-anchor="middle" font-weight="bold">Chunk: A-Z</text>
  <text x="90" y="80" text-anchor="middle" font-size="7">Size: 130 MB</text>
  
  <path d="M150 70 L230 70" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M230 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="190" y="60" text-anchor="middle" font-weight="bold">Splits</text>
  
  <rect x="260" y="20" width="80" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="300" y="38" text-anchor="middle" font-weight="bold">Chunk: A-M</text>
  <text x="300" y="48" text-anchor="middle" font-size="7">Size: 65 MB</text>
  
  <rect x="260" y="80" width="80" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="300" y="98" text-anchor="middle" font-weight="bold">Chunk: N-Z</text>
  <text x="300" y="108" text-anchor="middle" font-size="7">Size: 65 MB</text>
  <text x="350" y="100" font-size="7" fill="#b8541a">Moved to Node 2</text>
</svg>

- **How it works**: Bigtable, HBase, CockroachDB, and MongoDB use dynamic partitioning. MongoDB calls them "chunks". When a chunk grows beyond 128 MB, MongoDB splits it. The cluster balancer then moves one of the new chunks to a less-loaded node
- **The benefit**: The number of partitions adapts directly to the data volume. An empty database starts with exactly one partition

### The failure

- Because an empty database starts with one partition, 100% of the initial write load hits a single physical node. The database cannot utilize the rest of the cluster until enough data is written to trigger a split (which triggers another split, and so on)
- To fix this, you must "pre-split" an empty table. You manually configure the boundaries of 100 empty partitions so the initial load is distributed globally on day one
