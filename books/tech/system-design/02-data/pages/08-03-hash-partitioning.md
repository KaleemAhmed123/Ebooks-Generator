## Hash partitioning

- **Hash partitioning** runs the key through a hash function and partitions on the result. A good hash turns any distribution of keys into an even spread across its output range
- Cassandra's default partitioner is Murmur3; DynamoDB hashes the partition key internally. The boundaries are ranges of hash values, not of keys

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

- Three consecutive timestamps hash to three unrelated places, so the last-range hotspot is gone
- So is the range scan. "Everything between 10:00 and 11:00" is now a question for every partition, because adjacent keys are no longer adjacent anywhere

### The failure

- `node = hash(key) mod N`. It spreads keys evenly and it breaks the moment N changes: going from 10 nodes to 11, a key stays put only when `h mod 10 = h mod 11`, roughly one key in eleven. Adding one server moves about 90% of the data. Pages 5 and 7 are the two ways out

:::interview
"Why not just `hash(key) mod N`?" — Because N is the number of nodes, and changing it remaps nearly every key. Consistent hashing moves only the keys next to the node that changed; a fixed slot count (Redis's 16,384) moves whole slots and never changes N.
:::
