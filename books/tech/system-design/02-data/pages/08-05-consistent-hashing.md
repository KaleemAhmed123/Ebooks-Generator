## Consistent hashing

- **Consistent hashing** (Karger et al., 1997) is a hash whose assignment "changes minimally as the range of the function changes": add or remove a node, and only the keys next to it move
- Picture the hash output space as a ring. Each node is hashed onto the ring too; a key belongs to the first node clockwise from its own position

<svg viewBox="0 0 460 140" role="img" aria-label="Consistent hashing ring. Nodes A, B, C are placed on the ring. Keys k1, k2, k3 are placed on the ring. A key belongs to the next node found by moving clockwise." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <circle cx="230" cy="70" r="50" fill="none" stroke="#1d4e89" stroke-width="2"/>
  
  <!-- Nodes -->
  <circle cx="230" cy="20" r="4" fill="#1a1a1a"/>
  <text x="230" y="10" text-anchor="middle" font-weight="bold">Node A</text>
  
  <circle cx="273" cy="95" r="4" fill="#1a1a1a"/>
  <text x="290" y="105" font-weight="bold">Node B</text>
  
  <circle cx="187" cy="95" r="4" fill="#1a1a1a"/>
  <text x="170" y="105" text-anchor="end" font-weight="bold">Node C</text>
  
  <!-- Keys -->
  <circle cx="265" cy="35" r="2" fill="#b8541a"/>
  <text x="275" y="32" font-size="7">k1 (goes to B)</text>
  
  <circle cx="200" cy="110" r="2" fill="#b8541a"/>
  <text x="200" y="125" text-anchor="middle" font-size="7">k2 (goes to A)</text>
  
  <path d="M265 35 A50 50 0 0 1 273 95" fill="none" stroke="#6b6b6b" stroke-dasharray="2 2"/>
  <path d="M273 95 l-2 -5 h4 z" fill="#6b6b6b" transform="rotate(30 273 95)"/>
</svg>

- Add node D between B and C: the keys between B and D, which C used to own, now belong to D. Nothing else moves. Remove C: its arc goes to the next node clockwise; nothing else moves
- Dynamo and Cassandra partition this way. Redis Cluster does not (page 7), and neither does DynamoDB from the outside; the ring is one answer, not the answer

### The failure

- One point on the ring per node. Random points give uneven arcs: one node owns twice its share by chance. And when a node dies, its whole arc lands on one successor, which now carries double load at the worst moment. The next page is the fix Karger's paper already contained: put each node on the ring many times
