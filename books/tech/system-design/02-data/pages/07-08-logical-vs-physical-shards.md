## Logical vs physical shards

- If you decide your system needs 4 physical database servers, you might be tempted to create exactly 4 shards (physical sharding). This is a mistake
- Instead, you should create a large number of **logical shards** (e.g., 400 logical shards) and map those logical shards onto your physical hardware (100 logical shards per server)

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

- **The benefit**: When Server A fills up, scaling out is trivial. You buy Server C, copy Logical Shard 1 to it, and update the routing table to point to Server C. No data needs to be split or rehashed
- Notion sharded their Postgres architecture by creating 480 logical shards and placing them across 32 physical databases

### The failure

- Creating physical shards from day one. If you create exactly 4 Postgres databases and write your code to say `hash(key) % 4`, you have permanently tied your application logic to your physical hardware
- When it is time to scale to 5 servers, you cannot simply move a partition. You must rebuild your entire hashing scheme, rewrite every row to a new location, and coordinate a massive data migration. Always separate the logical partition from the physical machine
