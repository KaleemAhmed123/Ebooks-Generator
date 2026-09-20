## Fixed number of partitions

- An alternative to vnodes is to create a fixed number of partitions on day one, far exceeding the number of physical nodes. If you have 10 nodes, you might create 1,000 partitions
- Instead of moving individual keys on a ring, the database moves entire partitions from one node to another

<svg viewBox="0 0 460 140" role="img" aria-label="Fixed partitions. Node 1 holds partitions P1, P2, P3. A new Node 2 joins. The cluster moves P3 whole from Node 1 to Node 2." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="120" height="80" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="45" text-anchor="middle" font-weight="bold">Node 1</text>
  
  <rect x="40" y="55" width="30" height="30" rx="3" fill="#fff" stroke="#1a1a1a"/>
  <text x="55" y="73" text-anchor="middle">P1</text>
  
  <rect x="85" y="55" width="30" height="30" rx="3" fill="#fff" stroke="#1a1a1a"/>
  <text x="100" y="73" text-anchor="middle">P2</text>
  
  <rect x="50" y="10" width="30" height="30" rx="3" fill="#fff" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <text x="65" y="28" text-anchor="middle" fill="#6b6b6b">P3</text>
  
  <rect x="320" y="30" width="120" height="80" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="380" y="45" text-anchor="middle" font-weight="bold">Node 2 (New)</text>
  
  <rect x="365" y="55" width="30" height="30" rx="3" fill="#fff" stroke="#1a1a1a"/>
  <text x="380" y="73" text-anchor="middle">P3</text>
  
  <path d="M125 70 L300 70" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M300 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  <text x="210" y="60" text-anchor="middle" font-weight="bold">Moves whole partition</text>
  <text x="210" y="85" text-anchor="middle" font-size="7">P3 transferred over network</text>
</svg>

- **How it works**: Redis Cluster uses exactly this. It pre-creates 16,384 hash slots (using `CRC16(key) mod 16384`). When a new Redis node joins the cluster, the administrator assigns it a range of slots (e.g., slots 1000–2000). The old nodes transfer those exact slots over the network, and the routing table updates
- Elasticsearch also uses this. The number of primary shards is "fixed at index creation"

### The failure

- Choosing too few partitions on day one. If you create an Elasticsearch index with 5 primary shards, that index can *never* scale beyond 5 physical nodes. The ceiling is permanent
- The only way to fix it is to create a brand new index with 50 shards, pause your application, and run a massive reindex job to copy every single document over. Always over-provision the partition count for fixed systems
