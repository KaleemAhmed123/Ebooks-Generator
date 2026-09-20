## Avoid the conflict

- The cheapest conflict resolution is never having one. Give every record a **home leader** and route all its writes there: a user's data to the region they signed up in, a document to the region of its owner
- Reads can still go anywhere. Only writes are pinned, and only per record, so most requests stay local and the write for a given record has exactly one leader, which is single-leader replication in disguise

<svg viewBox="0 0 460 108" role="img" aria-label="Two regions, each with a leader. User A's records are homed in region 1, user B's in region 2. Writes for A from anywhere are routed to region 1; writes for B to region 2. No two leaders accept writes for the same record." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="40" y="30" width="120" height="44" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="100" y="48" text-anchor="middle" fill="#1d4e89">region 1 leader</text><text x="100" y="63" text-anchor="middle" font-size="7">home of user A</text>
  <rect x="300" y="30" width="120" height="44" rx="3" fill="#e2fcf3" stroke="#1d4e89"/><text x="360" y="48" text-anchor="middle" fill="#1d4e89">region 2 leader</text><text x="360" y="63" text-anchor="middle" font-size="7">home of user B</text>
  <path d="M160 46 L300 46" stroke="#1d4e89" fill="none"/><path d="M300 58 L160 58" stroke="#1d4e89" fill="none"/>
  <text x="230" y="42" text-anchor="middle" font-size="7">replicate A's changes</text><text x="230" y="70" text-anchor="middle" font-size="7">replicate B's changes</text>
  <text x="100" y="96" text-anchor="middle" font-size="7.5">write to A, from region 2 → routed here</text>
  <text x="360" y="96" text-anchor="middle" font-size="7.5">write to B, from region 1 → routed here</text>
  <path d="M300 88 L170 76" stroke="#b8541a" fill="none" stroke-dasharray="2 2"/><path d="M160 88 L290 76" stroke="#b8541a" fill="none" stroke-dasharray="2 2"/>
</svg>

- The rule holds as long as the home does not move. Records rarely change hands; so this covers most of a multi-region system, and the pages after this one handle the rest

### The failure

- The home moves. The region fails, or the user relocates, and for the window in which two leaders both believe they own the record, writes conflict exactly as if there had been no rule. Migration of a home is a conflict window; make it short, make it explicit, and stop writes to the record while it happens
