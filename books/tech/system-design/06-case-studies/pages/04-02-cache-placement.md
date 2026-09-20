## Client-side sharding by consistent hashing

- When you have 30 nodes, the standard pattern is **client-side sharding**: the application server determines the correct node, keeping the router off the critical path
- You cannot use modulo hashing (`hash(key) % N`). If a node dies, N changes, forcing every key to hash to a different node. This causes a 100% cache miss rate, melting your database
- The solution is **consistent hashing**. Nodes and keys are hashed onto a ring. A key is assigned to the first node encountered moving clockwise
- To prevent uneven distribution, each physical node receives dozens of **virtual nodes**. If a node dies, its keys redistribute smoothly among all remaining nodes

<svg viewBox="0 0 400 200" role="img" aria-label="Consistent hashing ring showing virtual nodes distributing the load when a node dies." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="12">
  <circle cx="200" cy="100" r="80" fill="none" stroke="#d4d4d8" stroke-width="2"/>
  
  <circle cx="200" cy="20" r="8" fill="#10b981"/>
  <text x="200" y="12" text-anchor="middle" fill="#065f46" font-size="10">Node A</text>
  
  <circle cx="270" cy="60" r="8" fill="#6366f1"/>
  <text x="290" y="55" text-anchor="middle" fill="#3730a3" font-size="10">Node B</text>
  
  <circle cx="280" cy="115" r="8" fill="#10b981"/>
  <text x="300" y="125" text-anchor="middle" fill="#065f46" font-size="10">Node A2</text>
  
  <circle cx="130" cy="140" r="8" fill="#f43f5e" stroke="#9f1239" stroke-width="2" stroke-dasharray="2"/>
  <text x="110" y="155" text-anchor="middle" fill="#9f1239" font-size="10">Node C (Dead)</text>
  <line x1="125" y1="135" x2="135" y2="145" stroke="#9f1239" stroke-width="2"/>
  <line x1="125" y1="145" x2="135" y2="135" stroke="#9f1239" stroke-width="2"/>
  
  <circle cx="125" cy="70" r="5" fill="#f59e0b"/>
  <text x="105" y="75" text-anchor="middle" fill="#92400e" font-size="10">Key 1</text>
  
  <path d="M 125 70 A 80 80 0 0 1 190 20" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrow-orange)"/>
  
  <circle cx="160" cy="165" r="5" fill="#f59e0b"/>
  <text x="170" y="185" text-anchor="middle" fill="#92400e" font-size="10">Key 2</text>
  
  <path d="M 160 165 A 80 80 0 0 0 270 120" fill="none" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4" marker-end="url(#arrow-orange)"/>
  
  <text x="200" y="95" text-anchor="middle" fill="#52525b" font-weight="bold">Key 2 reroutes</text>
  <text x="200" y="110" text-anchor="middle" fill="#52525b" font-weight="bold">to next node</text>
  
  <defs>
    <marker id="arrow-orange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b"/></marker>
  </defs>
</svg>

### The failure

- The failure mode is putting a load balancer in front of the cache nodes to distribute traffic. A cache is stateful. A load balancer will route the request to a random node, resulting in a cache miss every time
- The application client itself must maintain the consistent hashing ring, hash the key, and open a direct TCP connection to the specific cache node that owns that key

:::interview
**The modulo test**
If an interviewer asks "how do you shard the cache," and you say "hash the key modulo the number of servers," you have failed. Consistent hashing is the only acceptable answer at scale.
:::
