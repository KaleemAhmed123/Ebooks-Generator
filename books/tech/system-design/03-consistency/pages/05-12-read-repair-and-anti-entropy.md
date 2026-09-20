## Read repair and anti-entropy

- In a leaderless database, how do nodes ever catch up if a write was missed? There is no WAL stream to replay. The database relies on two mechanisms to heal divergent data
- **Read Repair**: When a client reads from 3 nodes, it might get `Value=5` from Node A and B, and `Value=4` from Node C. The client (or the database coordinator) resolves the conflict, returns `5` to the user, and immediately sends a background write to Node C to update it to `5`. Reading the data automatically fixes it

<svg viewBox="0 0 460 140" role="img" aria-label="Anti-entropy via Merkle Trees. The database builds a tree of hashes. If the root hashes match, the data is identical. If they don't, it traverses down to find exactly which leaf block is missing." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="420" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  
  <text x="120" y="35" text-anchor="middle" font-weight="bold">Node A (Hash: a1b2...)</text>
  <text x="340" y="35" text-anchor="middle" font-weight="bold">Node B (Hash: c9f4...)</text>
  
  <path d="M230 25 L230 110" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/>
  
  <!-- Node A Tree -->
  <circle cx="120" cy="50" r="10" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="80" cy="80" r="10" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="160" cy="80" r="10" fill="#fce4e2" stroke="#b8541a"/>
  <circle cx="140" cy="110" r="10" fill="#fce4e2" stroke="#b8541a"/>
  <circle cx="180" cy="110" r="10" fill="#e2fcf3" stroke="#1d4e89"/>
  
  <path d="M110 55 L85 72" stroke="#1a1a1a" fill="none"/>
  <path d="M130 55 L155 72" stroke="#1a1a1a" fill="none"/>
  <path d="M150 85 L145 102" stroke="#1a1a1a" fill="none"/>
  <path d="M170 85 L175 102" stroke="#1a1a1a" fill="none"/>
  
  <!-- Node B Tree -->
  <circle cx="340" cy="50" r="10" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="300" cy="80" r="10" fill="#e2fcf3" stroke="#1d4e89"/>
  <circle cx="380" cy="80" r="10" fill="#fce4e2" stroke="#b8541a"/>
  <circle cx="360" cy="110" r="10" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <circle cx="400" cy="110" r="10" fill="#e2fcf3" stroke="#1d4e89"/>
  
  <path d="M330 55 L305 72" stroke="#1a1a1a" fill="none"/>
  <path d="M350 55 L375 72" stroke="#1a1a1a" fill="none"/>
  <path d="M370 85 L365 102" stroke="#1a1a1a" fill="none"/>
  <path d="M390 85 L395 102" stroke="#1a1a1a" fill="none"/>
  
  <path d="M150 110 L350 110" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M350 110 l-6 -3 v6 z" fill="#b8541a"/>
  <text x="250" y="105" text-anchor="middle" font-size="6" fill="#b8541a" font-weight="bold">Missing block transferred</text>
</svg>

- **Anti-Entropy**: Read repair only fixes data that is actually read. If data is written once and never read again, it will stay out of sync forever. To fix this, nodes constantly run a background process called Anti-Entropy. They compare their data using **Merkle Trees** (trees of cryptographic hashes). If the root hashes don't match, they traverse down the tree to find exactly which leaf block is different, and copy only that missing data across the network

### The failure

- Relying entirely on read repair for cold data. If you disable the anti-entropy background process to "save CPU", your database will slowly rot. Years later, a user will query an old, unread record, hit a node that missed the write, and receive wildly incorrect historical data
