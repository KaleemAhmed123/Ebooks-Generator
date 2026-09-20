## Request routing

- When a client wants to read key `X`, how does it know which physical IP address to connect to? This is the service discovery problem applied to data, known as **request routing**
- There are three common approaches to storing the cluster map

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

- **1. Any node forwards**: The client connects to any node in the cluster. That node acts as a coordinator, looks up the key in its own copy of the map, and forwards the request to the correct node. Cassandra uses this, keeping the map synchronized via a gossip protocol
- **2. Routing tier**: The client connects to a load-balanced pool of stateless routing proxies. The proxies read the map from a centralized consensus store (like ZooKeeper) and forward the request. MongoDB uses this (`mongos`)
- **3. Smart client**: The client library downloads the cluster map directly and talks to the correct nodes itself

### The failure

- Treating the routing cache as perfectly accurate. When a rebalance occurs, the map changes. A client might send a write to Node B, only to discover Node B just handed that partition to Node C
- The routing layer must be built to handle "Wrong Node" exceptions gracefully, refresh its map from the source of truth, and retry the request transparently against the new owner
