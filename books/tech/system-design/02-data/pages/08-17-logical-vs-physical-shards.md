## Logical vs physical shards

- Four servers does not mean four shards. Make many **logical shards**, each a separate schema or database with its own tables, and map them onto the physical machines: 400 logical, 100 per server
- The application routes by logical shard. Only the map from logical to physical knows about machines; that map is the fixed-partition idea (page 7) applied to a relational database

<svg viewBox="0 0 460 140" role="img" aria-label="Logical vs physical shards. A router maps Hash 000-099 to Logical Shard 1, which maps to Physical Node A. Later, Logical Shard 1 can be easily moved to Node B." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="60" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="50" y="74" text-anchor="middle">Hash: 42</text>
  
  <rect x="130" y="35" width="100" height="70" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="50" text-anchor="middle" font-weight="bold">Routing Table</text>
  <rect x="140" y="60" width="80" height="15" fill="#fff" stroke="#1d4e89"/><text x="180" y="70" text-anchor="middle" font-size="6">00-49: Shard 1</text>
  <rect x="140" y="80" width="80" height="15" fill="#fff" stroke="#1d4e89"/><text x="180" y="90" text-anchor="middle" font-size="6">50-99: Shard 2</text>
  
  <rect x="280" y="10" width="140" height="50" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="350" y="25" text-anchor="middle" font-weight="bold">Physical Server A</text>
  <rect x="290" y="35" width="40" height="15" fill="#e2fcf3" stroke="#1d4e89"/><text x="310" y="45" text-anchor="middle" font-size="6">Shard 1</text>
  <rect x="340" y="35" width="40" height="15" fill="#e2fcf3" stroke="#1d4e89"/><text x="360" y="45" text-anchor="middle" font-size="6">Shard 3</text>
  
  <rect x="280" y="80" width="140" height="50" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="350" y="95" text-anchor="middle" font-weight="bold">Physical Server B</text>
  <rect x="290" y="105" width="40" height="15" fill="#e2fcf3" stroke="#1d4e89"/><text x="310" y="115" text-anchor="middle" font-size="6">Shard 2</text>
  
  <path d="M80 70 L130 70" stroke="#1a1a1a" fill="none"/><path d="M130 70 l-3 -3 v6 z" fill="#1a1a1a"/>
  <path d="M230 65 L280 45" stroke="#1d4e89" fill="none"/><path d="M280 45 l-6 -1 v6 z" fill="#1d4e89" transform="rotate(-20 280 45)"/>
  <path d="M230 85 L280 105" stroke="#1d4e89" fill="none"/><path d="M280 105 l-6 -3 v6 z" fill="#1d4e89" transform="rotate(20 280 105)"/>
</svg>

- When a server fills, move some of its logical shards to a new one (logical replication, Module 5, page 3, then a cutover) and update the map. Nothing is re-hashed, no row changes shard
- Notion: 480 logical shards over 32 physical Postgres databases, 15 each. Figma went further and tested the logical split first, behind feature flags, with all logical shards still on one physical database, so the application's routing was proven before any hardware moved

### The failure

- Logical equals physical from day one: four databases and `hash(key) mod 4` in the code. The fifth server is a change of N (page 3): every row is re-hashed, most rows move, and the move is a migration of the whole dataset instead of a copy of a quarter of one server. The logical layer costs a lookup table; skipping it costs the next split
