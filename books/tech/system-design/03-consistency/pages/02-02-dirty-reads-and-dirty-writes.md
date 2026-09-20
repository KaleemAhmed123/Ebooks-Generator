## Dirty reads and dirty writes

- A **dirty read** is seeing another transaction's write before it commits. If that transaction then rolls back, the reader acted on a value that never existed
- A **dirty write** is overwriting another transaction's uncommitted write. Every real isolation level prevents it, because the database could not roll back a transaction whose writes have already been overwritten

<svg viewBox="0 0 460 140" role="img" aria-label="Dirty write. Tx A updates Car to Alice. Tx B updates Car to Bob, overwriting Alice's uncommitted write. Tx A then updates Invoice to Alice, while Tx B updates Invoice to Bob. The final state is mixed." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="80" y="34" text-anchor="middle" font-weight="bold">Tx A (Buyer: Alice)</text>
  <rect x="20" y="45" width="120" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="59" text-anchor="middle" font-size="7">1. UPDATE Car SET owner=Alice</text>
  
  <rect x="260" y="20" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="320" y="34" text-anchor="middle" font-weight="bold">Tx B (Buyer: Bob)</text>
  <rect x="260" y="65" width="120" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="79" text-anchor="middle" font-size="7">2. UPDATE Car SET owner=Bob</text>
  
  <rect x="20" y="85" width="120" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="80" y="99" text-anchor="middle" font-size="7">3. UPDATE Invoice SET buyer=Alice</text>
  
  <rect x="260" y="105" width="120" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="320" y="119" text-anchor="middle" font-size="7">4. UPDATE Invoice SET buyer=Bob</text>
  
  <path d="M145 55 L255 75" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M255 75 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-10 255 75)"/>
  <text x="200" y="62" text-anchor="middle" font-size="6">Dirty write</text>
</svg>

- The diagram is the reason dirty writes matter beyond one row. Two buyers race on a car and its invoice; without the row lock the car goes to one and the invoice to the other. Read Committed holds a lock on each updated row until commit, so the second writer waits, then overwrites both
- Databases prevent dirty reads without locks: a reader is handed the old committed value while the writer's new value waits (page 4)

### The failure

- The dirty read that happens outside the database. A service updates the row, writes the new value into a cache, then `COMMIT` fails. The database rolled back; the cache did not. Every reader is now dirty-reading from a cache, and no isolation level applies. Fill caches after the commit returns
