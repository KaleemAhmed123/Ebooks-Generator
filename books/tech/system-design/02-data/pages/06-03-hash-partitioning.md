## Hash partitioning

- To prevent the hotspot created by range partitioning, you can run the key through a hash function (like MD5 or Murmur3). The hash function takes a skewed distribution of input keys and scrambles them evenly across an output range
- Cassandra (Murmur3) and DynamoDB (internal hash) use this strategy. The partition boundary is no longer the key itself, but the *hash* of the key

<svg viewBox="0 0 460 140" role="img" aria-label="Hash partitioning. Sequential keys 1, 2, 3 are hashed. Their hashes land on completely different nodes. The hotspot is eliminated, but range scans are broken." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="60" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="34" text-anchor="middle">Key: 1</text>
  <rect x="20" y="60" width="60" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="74" text-anchor="middle">Key: 2</text>
  <rect x="20" y="100" width="60" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/><text x="50" y="114" text-anchor="middle">Key: 3</text>
  
  <text x="110" y="34" text-anchor="middle" font-size="6" font-family="monospace">hash() = A9</text>
  <text x="110" y="74" text-anchor="middle" font-size="6" font-family="monospace">hash() = F2</text>
  <text x="110" y="114" text-anchor="middle" font-size="6" font-family="monospace">hash() = 3B</text>
  
  <rect x="180" y="10" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="24" text-anchor="middle">Node 1</text>
  <text x="230" y="34" text-anchor="middle" font-size="6">Hash 00-55</text>
  
  <rect x="180" y="55" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="69" text-anchor="middle">Node 2</text>
  <text x="230" y="79" text-anchor="middle" font-size="6">Hash 56-AA</text>
  
  <rect x="180" y="100" width="100" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="114" text-anchor="middle">Node 3</text>
  <text x="230" y="124" text-anchor="middle" font-size="6">Hash AB-FF</text>
  
  <path d="M140 30 L180 65" stroke="#1a1a1a" fill="none"/><path d="M180 65 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 65)"/>
  <path d="M140 70 L180 115" stroke="#1a1a1a" fill="none"/><path d="M180 115 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 115)"/>
  <path d="M140 110 L180 25" stroke="#1a1a1a" fill="none"/><path d="M180 25 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-30 180 25)"/>
</svg>

- **The trade-off**: The fatal flaw of time-ordered keys is gone. Even if you write timestamps `10:00:01`, `10:00:02`, and `10:00:03` consecutively, their hashes will land on completely different nodes. Write throughput is perfectly distributed
- However, the benefit of range queries is destroyed. If you want to query "all records from 10:00:00 to 11:00:00", you can no longer do a sequential read. Adjacent keys are now scattered across every machine in the cluster

### The failure

- Using modulo arithmetic directly on the hash to pick a node: `node = hash(key) % N`. This is the classic sharding anti-pattern
- If you have 10 nodes, and you add an 11th node ($N$ changes from 10 to 11), the modulo result changes for almost every single key in the database. 90% of your data must physically move over the network just to accommodate one new server. The cluster will stall and collapse under the migration traffic
