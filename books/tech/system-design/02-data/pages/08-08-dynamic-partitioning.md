## Dynamic partitioning

- Range partitions cannot be fixed in advance: the key distribution is not known, so guessed boundaries leave one range empty and another holding everything
- **Dynamic partitioning** lets the data decide. A partition that grows past a size limit splits at its median key; two small neighbours merge. The count follows the data

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

- Bigtable splits a tablet at roughly 100–200 MB; MongoDB splits a chunk at 128 MB by default and its balancer moves chunks to even out the shards; CockroachDB splits ranges the same way. Splitting is local and cheap; it is the move afterwards that costs (page 9)

### The failure

- An empty table is one partition. The launch-day load lands on one node until enough data arrives to split, and split again. Pre-split: create the boundaries up front so day one is spread across the cluster
- A partition that cannot split. MongoDB's **jumbo chunk** is a chunk whose keys all share one shard-key value; the median is that value, so there is no split point, and the chunk grows on one shard forever. The shard key needs enough distinct values that no one value is a chunk (page 15)
