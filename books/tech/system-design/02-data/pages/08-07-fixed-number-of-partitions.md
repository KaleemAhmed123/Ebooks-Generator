## Fixed number of partitions

- The other way to keep N out of the hash: fix the number of partitions on day one, far above the number of nodes, and assign whole partitions to nodes. Ten nodes, a thousand partitions, a hundred each
- Adding a node means moving some partitions to it, whole. The key-to-partition mapping never changes; only partition-to-node does

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

- Redis Cluster: 16,384 hash slots, `CRC16(key) mod 16384`, and the docs say plainly that it "does not use consistent hashing". A new node is given a set of slots; the old owners hand them over key by key while serving
- Elasticsearch: "the number of primary shards is fixed at index creation". Kafka topics work the same way; a partition count is a fixed slot count

### The failure

- Too few on day one. An index with 5 primary shards can never spread over more than 5 nodes; the ceiling is set at creation. The way out is a new index with more shards and a reindex of every document into it
- Too many is a cost too: each partition has fixed overhead (files, memory, metadata). The number is a guess about the largest cluster this data will ever need, made on the day the data is smallest
