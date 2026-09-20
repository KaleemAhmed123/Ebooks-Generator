## Sharding Postgres

- By 2020, Figma was growing exponentially. Their single Postgres database, which stored every checkpoint and action log for every file in the world, reached its maximum physical disk size and CPU limit. They had to Shard
- Remember from Module 5: Replication is for reads, Sharding is for writes. Figma needed write capacity
- Because Figma files are completely independent (you rarely need to join the data of File A with File B), they sharded the database by `file_id`

<svg viewBox="0 0 460 140" role="img" aria-label="Sharding Postgres by file ID. The router looks at the File ID. File 42 goes to Shard 1. File 99 goes to Shard 2. Each shard is an independent Postgres database." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="50" width="80" height="40" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="65" text-anchor="middle" font-weight="bold">Multiplayer</text>
  <text x="60" y="80" text-anchor="middle" font-weight="bold">Server</text>
  
  <rect x="150" y="50" width="60" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="180" y="74" text-anchor="middle" font-weight="bold">Router</text>
  
  <rect x="260" y="10" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="300" y="30" text-anchor="middle" font-weight="bold">Shard 1 (DB)</text>
  
  <rect x="260" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="300" y="75" text-anchor="middle" font-weight="bold">Shard 2 (DB)</text>
  
  <rect x="260" y="100" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="300" y="120" text-anchor="middle" font-weight="bold">Shard 3 (DB)</text>
  
  <path d="M100 70 L150 70" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M150 70 l-6 -3 v6 z" fill="#1a1a1a"/>
  
  <path d="M210 60 L260 30" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M260 30 l-6 1 v5 z" fill="#1d4e89" transform="rotate(-20 260 30)"/>
  <text x="215" y="40" font-size="6">File ID: 42</text>
  
  <path d="M210 70 L260 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M260 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="235" y="65" text-anchor="middle" font-size="6">File ID: 99</text>
  
  <path d="M210 80 L260 110" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M260 110 l-6 -3 v5 z" fill="#1d4e89" transform="rotate(20 260 110)"/>
</svg>

- Figma split their data across dozens of physical Postgres databases. When a Multiplayer Server wants to save a checkpoint for File 42, a routing proxy hashes the ID `42`, determines that it belongs to Shard 1, and forwards the SQL query to that specific database

### The failure

- Joining across files. Once you shard a database, you completely lose the ability to write SQL `JOIN` queries across shards. If Figma wanted to query "Show me all components used in File 42 and File 99", they could not do it in Postgres. They would have to query Shard 1, query Shard 2, and stitch the JSON blobs together in Node.js
