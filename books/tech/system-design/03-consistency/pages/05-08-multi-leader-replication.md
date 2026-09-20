## Multi-leader replication

- Single-leader replication breaks down when you need to run your application in multiple datacenters (e.g., US East and Europe). If the single Leader is in US East, every European user must cross the Atlantic Ocean to write data, adding hundreds of milliseconds of latency
- To fix this, you can set up **Multi-Leader Replication**. You put one Leader in US East, and one Leader in Europe. European users write to the European Leader. US users write to the US Leader. The Leaders then continuously stream their WALs to each other in the background

<svg viewBox="0 0 460 140" role="img" aria-label="Multi-leader replication. Two datacenters, each with a leader. The leaders replicate to each other bidirectionally. A conflict occurs when User 1 and User 2 edit the same row in different datacenters." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Datacenter: US East</text>
  
  <circle cx="110" cy="70" r="25" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="74" text-anchor="middle" font-weight="bold">Leader A</text>
  
  <rect x="260" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="350" y="35" text-anchor="middle" font-weight="bold">Datacenter: Europe</text>
  
  <circle cx="350" cy="70" r="25" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="350" y="74" text-anchor="middle" font-weight="bold">Leader B</text>
  
  <path d="M140 60 L320 60" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M320 60 l-6 -3 v6 z" fill="#1a1a1a"/>
  <path d="M320 80 L140 80" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M140 80 l6 -3 v6 z" fill="#1a1a1a"/>
  
  <circle cx="230" cy="70" r="10" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="73" text-anchor="middle" font-weight="bold" fill="#b8541a">!</text>
  <text x="230" y="55" text-anchor="middle" font-size="6" fill="#b8541a" font-weight="bold">Write Conflict</text>
</svg>

- **The Conflict Problem**: Because writes happen locally first, two users can modify the exact same row at the exact same time in different datacenters. When the databases sync, they realize they have conflicting writes. Because neither transaction holds a global lock, the database cannot prevent the conflict. It must resolve it after the fact
- The most common resolution strategy is **Last Write Wins (LWW)**. The database attaches a timestamp to every write. When a conflict happens, the write with the highest timestamp is kept, and the other is silently discarded

### The failure

- Clocks drift, so LWW silently deletes data. Computer clocks are never perfectly synchronized. If the European server's clock is 50ms ahead of the US server's clock, a European write will always "win" a conflict, even if the US write actually happened a few milliseconds later in the real world. Multi-leader replication with LWW guarantees permanent, silent data loss
