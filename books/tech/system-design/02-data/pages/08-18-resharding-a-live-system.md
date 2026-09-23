## Resharding a live system

- Moving a live dataset from one layout to another, unsharded to sharded or one shard key to another, with the application running. It is expand, migrate, contract (Module 4, page 8) with a database as the column

<svg viewBox="0 0 460 140" role="img" aria-label="Resharding a live system. The app dual-writes to the Old DB and the New Sharded DB. A background script backfills old rows. The app verifies reads, then switches." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="55" width="80" height="30" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="70" text-anchor="middle" font-weight="bold">Application</text>
  <text x="60" y="80" text-anchor="middle" font-size="7">Dual Write</text>
  
  <rect x="180" y="10" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="27" text-anchor="middle" font-weight="bold">Old Monolith</text>
  <text x="230" y="42" text-anchor="middle" font-size="7">Reads served here</text>
  
  <rect x="180" y="90" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="107" text-anchor="middle" font-weight="bold">New Shards</text>
  <text x="230" y="122" text-anchor="middle" font-size="7">Dark reads (verify)</text>
  
  <path d="M100 65 L180 35" stroke="#1a1a1a" fill="none"/><path d="M180 35 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-15 180 35)"/>
  <path d="M100 75 L180 105" stroke="#1a1a1a" fill="none"/><path d="M180 105 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(20 180 105)"/>
  
  <rect x="330" y="55" width="80" height="30" rx="3" fill="#fff" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="370" y="70" text-anchor="middle" font-weight="bold">Backfill</text>
  <text x="370" y="80" text-anchor="middle" font-size="7">Copies old data</text>
  
  <path d="M370 45 L370 55" stroke="#1a1a1a" fill="none"/><path d="M370 55 l-3 -6 h6 z" fill="#1a1a1a"/>
  <path d="M370 85 L370 95" stroke="#1a1a1a" fill="none"/><path d="M370 95 l-3 -3 h6 z" fill="#1a1a1a"/>
</svg>

- **Dual write** (booklet 04 owns the term): the application writes both the old store and the new; only the old one's failure fails the request
- **Backfill**: copy the history into the new layout, in batches, without overwriting anything the dual-writer has already written
- **Verify**: compare. Notion ran a verification job comparing the two, and made sure it was "implemented by different people" than the migration. **Dark reads**: serve from the old store, also read the new one, log every difference
- **Cut over**: flip reads to the new store, then stop the dual write. Figma's first physical shard cutover cost "ten seconds of partial availability", after months of preparation

### The failure

- Dual writes drift. The old write succeeds and the new one times out, or a retry lands twice; nothing in the write path notices. Only an independent comparison finds it, which is why the person who wrote the migration must not be the person who wrote the check: they share the same blind spots. Cutting over on the migration's own "all rows copied" is the failure, and it is silent until a customer reads the missing row
