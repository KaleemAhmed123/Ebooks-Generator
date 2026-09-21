## Moving objects

- A driver's position is a value overwritten every 4 s and read by cell. It goes into memory, keyed by cell, with a TTL of a few reports, so a driver who goes silent leaves the index by himself. Nothing on this path touches a disk

<svg viewBox="0 0 460 174" role="img" aria-label="Ride matching, whole design. Driver apps, 1 million online, stream 250 000 position updates a second over held-open connections to the location gateway, which upserts driver to cell in an in-memory cell index, sharded by H3 cell, with a 12-second TTL per driver. A rider app posts a trip, 1 700 a second at peak, to the matching service, which reads the rider's cell and its rings from the index, ranks the k nearest by ETA, and makes an offer: a TTL lock on the driver row and trip row in one transaction against the trip store, Spanner at Uber, replicated. The offer is pushed back to the driver over the same stream. Note: H3's 16 resolutions let matching use a fine cell and surge a coarse one. An orange cross marks writing 1 million drivers times 15 updates a minute into Postgres: 250 000 durable updates a second of values dead in 4 seconds." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="6" y="20" width="58" height="32" rx="3" fill="#fff" stroke="#333"/><text x="35" y="33" text-anchor="middle">driver apps</text><text x="35" y="45" text-anchor="middle" font-size="7">1 M online</text>
  <rect x="98" y="16" width="72" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="134" y="30" text-anchor="middle">location</text><text x="134" y="41" text-anchor="middle">gateway</text><text x="134" y="51" text-anchor="middle" font-size="7">held-open stream</text>
  <line x1="64" y1="36" x2="98" y2="36" stroke="#333" marker-end="url(#d)"/><text x="81" y="30" text-anchor="middle" font-size="7">250 000/s</text>
  <rect x="204" y="10" width="92" height="54" rx="3" fill="#e6f2ff" stroke="#333"/><text x="250" y="23" text-anchor="middle">cell index</text><text x="250" y="34" text-anchor="middle" font-size="7">in memory, no disk</text><text x="250" y="45" text-anchor="middle" font-size="7">sharded by H3 cell</text><text x="250" y="56" text-anchor="middle" font-size="7">driver → cell, TTL 12 s</text>
  <line x1="170" y1="36" x2="204" y2="36" stroke="#333" marker-end="url(#d)"/><text x="187" y="30" text-anchor="middle" font-size="7">upsert</text>
  <rect x="6" y="104" width="58" height="32" rx="3" fill="#fff" stroke="#333"/><text x="35" y="117" text-anchor="middle">rider app</text><text x="35" y="129" text-anchor="middle" font-size="7">POST /trips</text>
  <rect x="92" y="98" width="84" height="44" rx="3" fill="#fff" stroke="#1d4e89"/><text x="134" y="112" text-anchor="middle">matching</text><text x="134" y="123" text-anchor="middle" font-size="7">read cell + rings</text><text x="134" y="134" text-anchor="middle" font-size="7">→ k nearest, by ETA</text>
  <line x1="64" y1="120" x2="92" y2="120" stroke="#333" marker-end="url(#d)"/><text x="78" y="114" text-anchor="middle" font-size="7">1 700/s</text>
  <line x1="170" y1="98" x2="216" y2="64" stroke="#1d4e89" marker-end="url(#b)"/><text x="222" y="78" font-size="7" fill="#1d4e89">index read:</text><text x="222" y="87" font-size="7" fill="#1d4e89">cell + rings</text>
  <rect x="204" y="102" width="92" height="40" rx="3" fill="#fff" stroke="#1d4e89"/><text x="250" y="115" text-anchor="middle">offer</text><text x="250" y="126" text-anchor="middle" font-size="7">TTL lock: driver row +</text><text x="250" y="136" text-anchor="middle" font-size="7">trip row, one txn (page 5)</text>
  <line x1="176" y1="122" x2="204" y2="122" stroke="#333" marker-end="url(#d)"/>
  <rect x="330" y="102" width="70" height="40" rx="3" fill="#e6f2ff" stroke="#333"/><text x="365" y="115" text-anchor="middle">trip store</text><text x="365" y="126" text-anchor="middle" font-size="7">Spanner at Uber</text><text x="365" y="136" text-anchor="middle" font-size="7">replicated, durable</text>
  <line x1="296" y1="122" x2="330" y2="122" stroke="#333" marker-end="url(#d)"/>
  <line x1="204" y1="110" x2="160" y2="56" stroke="#333" stroke-dasharray="3 3" marker-end="url(#d)"/><text x="100" y="70" font-size="7">offer pushed on</text><text x="100" y="79" font-size="7">the driver's stream</text>
  <text x="330" y="24" font-size="7">H3: 16 resolutions</text><text x="330" y="34" font-size="7">matching at a fine cell,</text><text x="330" y="44" font-size="7">surge at a coarse one (page 7)</text>
  <text x="6" y="158" font-size="7.5" fill="#bf4c28">✕ 1 M drivers × 15 updates/min into Postgres: 250 000 durable UPDATEs/s of values dead in 4 s</text>
  <text x="6" y="169" font-size="7.5">Uber's first design sharded this in the app: "20 online drivers per core" (page 7)</text>
  <defs>
    <marker id="d" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#333"/></marker>
    <marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 z" fill="#1d4e89"/></marker>
  </defs>
</svg>

- The index is sharded by cell (booklet 02): every update for a cell lands on the shard that owns it, so "drivers in this cell and its rings" is a local read. Redis `GEO` commands or an in-process index by H3 cell both give this shape
- The transport is a held-open connection per driver app, WebSocket or a gRPC stream: an update is a frame on an open socket, not a new HTTPS request with a handshake, 250 000 times a second. Module 6, page 2 owns the connection-registry problems, and they apply here unchanged
- Nearby-friends is the same index read the other way: each cell is a pub/sub topic, a device subscribes to its cell and ring, every update is published to its cell. The index becomes a fan-out, and a cell with 10 000 people in it is the hot key of Module 6, page 5

### The failure

- 1 M drivers × 15 updates a minute into Postgres. 250 000 `UPDATE`s a second, each made durable, each rewriting an index entry, for a value that is dead in 4 s. Even sharded, the store spends its budget persisting stale data, and the matching query still has to scan it
