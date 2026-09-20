## Request routing

- A client holds key `X`. Which node has it? That is **request routing**, and there are three places the partition map can live

<svg viewBox="0 0 460 140" role="img" aria-label="Request routing tier. Clients talk to a stateless Routing Node. The routing node queries Zookeeper (the map) and forwards the request to the correct data node." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle">Client</text>
  
  <rect x="130" y="45" width="100" height="50" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="65" text-anchor="middle" font-weight="bold">Routing Tier</text>
  <text x="180" y="80" text-anchor="middle" font-size="7">(e.g., mongos)</text>
  
  <rect x="145" y="10" width="70" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="180" y="24" text-anchor="middle" font-size="7">Zookeeper / Config</text>
  <path d="M180 45 L180 30" stroke="#1a1a1a" fill="none" stroke-width="1"/><path d="M180 30 l-3 3 h6 z" fill="#1a1a1a"/>
  
  <rect x="300" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="29" text-anchor="middle">Node A</text>
  
  <rect x="300" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="74" text-anchor="middle">Node B</text>
  
  <rect x="300" y="100" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="340" y="119" text-anchor="middle">Node C</text>
  
  <path d="M80 70 L130 70" stroke="#1a1a1a" fill="none"/><path d="M130 70 l-3 -3 v6 z" fill="#1a1a1a"/>
  <path d="M230 70 L300 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M300 70 l-6 -3 v6 z" fill="#1d4e89"/>
</svg>

- **Any node forwards**: connect to anyone; that node is the coordinator and forwards to the owner. Cassandra, with the map kept in step by gossip (Module 7, page 1)
- **A routing tier**: stateless proxies in front of the data nodes hold the map and forward. MongoDB's `mongos` reads it from the config servers; Figma's DBProxy parses each query, plans which shards it touches, and fans it out
- **The client knows**: the driver fetches the map and talks to the owner directly. Redis Cluster clients do this, learning the slot map from `MOVED` replies
- Where the map itself is big, it is a hierarchy: Bigtable's clients go from a Chubby file to the root tablet to the `METADATA` tablets and cache what they find; CockroachDB's `meta1` and `meta2` ranges at the start of the keyspace are the same two-level index

### The failure

- A stale map after a move. The client sends to the node that owned the partition yesterday. The only correct answer from that node is "not mine, and here is who", and the only correct client behaviour is to update the cache and retry: Redis's `MOVED`, or a walk back up Bigtable's hierarchy, which its paper says can cost up to six round trips when every cached level is stale. A router that returns "not found" instead of redirecting turns every rebalance into data loss from the client's point of view
