## Metadata vs block store

- We heavily separate the metadata (names, paths, blocklists) from the actual file bytes (blocks)
- **The Metadata Store:** A relational database (Postgres/MySQL) or a strongly consistent NoSQL store. It holds the file hierarchy, permissions, versions, and the blocklist array. This requires strong ACID guarantees (→03)
- **The Block Store:** An Object Store (S3) that stores the raw 4 MB chunks. The key is the SHA-256 hash
- The metadata database is highly active (queries, joins, locks). The block store is dumb and cheap

<svg viewBox="0 0 460 110" role="img" aria-label="Strict separation of metadata database and dumb object storage" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="35" width="50" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="45" y="55" text-anchor="middle" font-weight="bold">Client</text>
  
  <rect x="150" y="10" width="90" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="195" y="30" text-anchor="middle" font-weight="bold" fill="#1d4e89">Metadata DB</text>
  
  <rect x="150" y="70" width="90" height="30" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="195" y="90" text-anchor="middle" font-weight="bold" fill="#b8541a">Block Store (S3)</text>
  
  <path d="M70 40 L150 25" stroke="#1d4e89" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="110" y="25" text-anchor="middle" font-size="6">1. Update Blocklist</text>
  
  <path d="M70 60 L150 85" stroke="#b8541a" fill="none" stroke-width="1.5" marker-end="url(#arrow)"/>
  <text x="110" y="80" text-anchor="middle" font-size="6">2. Upload missing blocks</text>
  
  <text x="260" y="20" font-family="monospace" font-size="6.5">id: 123</text>
  <text x="260" y="28" font-family="monospace" font-size="6.5">blocks: [A, B]</text>
  
  <text x="260" y="80" font-family="monospace" font-size="6.5">Key: Hash A -> 4MB Bytes</text>
  <text x="260" y="88" font-family="monospace" font-size="6.5">Key: Hash B -> 4MB Bytes</text>
</svg>

### The failure

- Storing file bytes inside the relational database as `BLOB` columns. This explodes the database size, thrashes the buffer cache, and destroys replication performance

:::interview
Your metadata database is 50 TB and crashing daily. You discover it is storing the actual 4 MB file blocks in a BLOB column. Why is this fatal?

Relational databases are optimised for indexing and fast metadata joins, not bulk binary storage. The blocks must be moved to cheap Object Storage (S3), leaving only the pointers (hashes) in the database.
:::\n