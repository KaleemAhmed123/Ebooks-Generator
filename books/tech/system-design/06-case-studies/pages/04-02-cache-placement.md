## Client-side sharding by consistent hashing

- A cache node owns keys, so the request for a key must reach the node that owns it. Nothing sits between the application and the nodes: the application's client library holds the node list, hashes the key, and opens a connection straight to the owner. A load balancer in front of a cache would route each read to a random node and turn the hit ratio into 1/N

<svg viewBox="0 0 460 150" role="img" aria-label="Left: application servers, each holding the ring in its client library, connecting directly to cache nodes. Centre: a hash ring with 32 nodes, each drawn as several virtual points; a key hashed to a point on the ring is owned by the next node clockwise. Right: adding node 33 moves about 3 percent of keys under consistent hashing; under hash modulo N it moves about 97 percent, marked with an orange cross as the miss storm." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="8" y="30" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="43" y="41" text-anchor="middle">app server</text><text x="43" y="52" text-anchor="middle" font-size="7.5">ring in the client</text>
  <rect x="8" y="64" width="70" height="26" rx="3" fill="#fff" stroke="#333"/><text x="43" y="75" text-anchor="middle">app server</text><text x="43" y="86" text-anchor="middle" font-size="7.5">same ring</text>
  <text x="43" y="106" text-anchor="middle" font-size="7.5">hash(key) → owner,</text>
  <text x="43" y="117" text-anchor="middle" font-size="7.5">direct TCP, no router</text>
  <circle cx="190" cy="78" r="52" fill="none" stroke="#333"/>
  <circle cx="190" cy="26" r="3" fill="#1d4e89"/><text x="190" y="18" text-anchor="middle" font-size="7">A</text>
  <circle cx="235" cy="52" r="3" fill="#333"/><text x="244" y="50" font-size="7">B</text>
  <circle cx="235" cy="104" r="3" fill="#1d4e89"/><text x="244" y="110" font-size="7">A</text>
  <circle cx="190" cy="130" r="3" fill="#333"/><text x="190" y="143" text-anchor="middle" font-size="7">C</text>
  <circle cx="145" cy="104" r="3" fill="#333"/><text x="130" y="110" font-size="7">B</text>
  <circle cx="145" cy="52" r="3" fill="#333"/><text x="130" y="50" font-size="7">C</text>
  <circle cx="222" cy="36" r="2.5" fill="#bf4c28"/>
  <text x="212" y="68" text-anchor="middle" font-size="7" fill="#bf4c28">key k</text>
  <path d="M226,40 A52,52 0 0,1 233,48" fill="none" stroke="#bf4c28" marker-end="url(#e)"/>
  <text x="190" y="76" text-anchor="middle" font-size="7.5">32 nodes ×</text>
  <text x="190" y="87" text-anchor="middle" font-size="7.5">~100 virtual points</text>
  <text x="190" y="98" text-anchor="middle" font-size="7.5">k → next node clockwise: B</text>
  <line x1="78" y1="43" x2="140" y2="52" stroke="#333" marker-end="url(#d)"/>
  <line x1="78" y1="77" x2="138" y2="80" stroke="#333" marker-end="url(#d)"/>
  <text x="270" y="30" font-size="8.5" font-weight="bold">add node 33</text>
  <text x="270" y="46" font-size="7.5" fill="#1d4e89">ring: 1/33 of keys move ≈ 3 %</text>
  <text x="270" y="57" font-size="7.5">the new node takes a slice from each</text>
  <text x="270" y="68" font-size="7.5">neighbour; the rest keep their owner</text>
  <text x="270" y="90" font-size="7.5" fill="#bf4c28">✕ hash(key) mod N: 32/33 move ≈ 97 %</text>
  <text x="270" y="101" font-size="7.5">nearly every key is now on the wrong node;</text>
  <text x="270" y="112" font-size="7.5">hit ratio → 0; 500 000 reads/s hit the DB</text>
  <text x="270" y="132" font-size="7.5">a lost node: its 3 % of keys miss once</text>
  <text x="270" y="143" font-size="7.5">and are re-cached on the next node round</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="e" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#bf4c28"/></marker>
  </defs>
</svg>

- **Consistent hashing** (booklet 02 owns it) places both nodes and keys on the same ring; a key belongs to the first node clockwise from its hash. Adding or removing a node moves only the keys in that node's arc, about 1/N of them
- **Virtual nodes** are the fix for unlucky arcs: each physical node is placed on the ring at a hundred or so points, so its share of keys is the average of a hundred arcs and a lost node's keys spread across every neighbour instead of landing on one
- The ring is data the client must have. It comes from a small config service or from the nodes themselves, and every client must agree on it; two clients with different rings put the same key on different nodes and each sees the other's writes as misses

### The failure

- `hash(key) % N`. It works until the first node is added or lost, and then nearly every key maps somewhere else at once. The cache is not down, it is empty, and the database receives the reads it was sized to never see. Scaling the cache is what caused the outage
