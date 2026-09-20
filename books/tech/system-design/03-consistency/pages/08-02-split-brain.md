## Split brain

- **Split brain**: two nodes each believe they are the sole leader, both accept writes, and the two histories cannot be merged. The system was never partitioned from a client's point of view; each client reached a leader that answered
- It needs three ordinary things: a leader that is slow rather than dead; a failover that promotes a replacement; clients that can still reach the old one. All three are common. Booklet 02 saw the replication side; this page is the decision side

<svg viewBox="0 0 460 140" role="img" aria-label="Split-brain problem. A network partition separates Leader A from Follower B. Follower B promotes itself. Clients write to both. Data is corrupted." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="110" y="35" text-anchor="middle" font-weight="bold">Network Zone 1</text>
  
  <circle cx="110" cy="70" r="25" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="110" y="74" text-anchor="middle" font-weight="bold">Leader A</text>
  <text x="110" y="55" text-anchor="middle" font-size="6">"I am Leader!"</text>
  
  <rect x="260" y="20" width="180" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="350" y="35" text-anchor="middle" font-weight="bold">Network Zone 2</text>
  
  <circle cx="350" cy="70" r="25" fill="#fce4e2" stroke="#b8541a"/>
  <text x="350" y="74" text-anchor="middle" font-weight="bold">Leader B</text>
  <text x="350" y="55" text-anchor="middle" font-size="6">"I am Leader!"</text>
  
  <path d="M230 10 L230 130" stroke="#b8541a" fill="none" stroke-dasharray="4 4" stroke-width="2"/>
  <text x="230" y="15" text-anchor="middle" font-weight="bold" fill="#b8541a">Partition</text>
  
  <path d="M50 70 L80 70" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M80 70 l-6 -3 v6 z" fill="#1d4e89"/>
  <text x="65" y="65" text-anchor="middle" font-size="6">Writes</text>
  
  <path d="M410 70 L380 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M380 70 l6 -3 v6 z" fill="#b8541a"/>
  <text x="395" y="65" text-anchor="middle" font-size="6">Writes</text>
  
  <text x="230" y="110" text-anchor="middle" font-size="7" fill="#b8541a" font-weight="bold">Irreparable Data Corruption</text>
</svg>

- The old leader is not misbehaving. It has heard nothing that says it was replaced, because the messages that would say so are the ones the partition dropped. Only a rule that makes it doubt itself stops it: a lease it must renew (page 3), a term it can be out-ranked on (Module 7, page 3), a token the storage checks (page 4)
- Two writes to the same key on two leaders is booklet 02's conflict problem with no version vector to resolve it. Most systems discover the divergence by reading back a value that "cannot" exist

### The failure

- Fixing split brain with a faster failover. Faster detection means more false positives (a slow leader looks dead sooner), so more elections, so more windows with two leaders. The fix is never speed; it is making the old leader's writes fail (pages 3 to 5)
