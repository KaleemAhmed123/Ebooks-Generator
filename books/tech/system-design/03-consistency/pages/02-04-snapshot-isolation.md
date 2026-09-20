## Snapshot isolation

- **Snapshot isolation**: the transaction sees the database as it was when the transaction started, for every statement, no matter what commits meanwhile
- The mechanism is **MVCC**, multi-version concurrency control (Module 3, page 1): a write does not overwrite the row, it adds a version tagged with the writer's transaction id. A reader filters versions by its snapshot

<svg viewBox="0 0 460 140" role="img" aria-label="Snapshot isolation using MVCC. The database stores multiple versions of the Bob row, tagged with Transaction IDs. Tx 42 sees the old version, while Tx 44 sees the new version." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="60" y="34" text-anchor="middle" font-weight="bold">Tx 42 (Reader)</text>
  <rect x="20" y="45" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="59" text-anchor="middle" font-size="6">Snapshot: xid < 42</text>
  
  <rect x="140" y="20" width="140" height="80" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="210" y="35" text-anchor="middle" font-weight="bold">Table: users</text>
  
  <rect x="150" y="45" width="120" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="210" y="59" text-anchor="middle" font-size="7">Bob | $100 | created_by=10</text>
  
  <rect x="150" y="70" width="120" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="210" y="84" text-anchor="middle" font-size="7">Bob | $200 | created_by=43</text>
  
  <rect x="320" y="70" width="80" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="360" y="84" text-anchor="middle" font-weight="bold">Tx 43 (Writer)</text>
  <text x="360" y="94" text-anchor="middle" font-size="6" fill="#1d4e89">COMMIT</text>
  
  <path d="M105 55 L145 55" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M145 55 l-3 -3 v6 z" fill="#1a1a1a"/>
  
  <rect x="20" y="80" width="80" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="60" y="94" text-anchor="middle" font-weight="bold">Tx 44 (Reader)</text>
  <rect x="20" y="105" width="80" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="119" text-anchor="middle" font-size="6">Snapshot: xid < 44</text>
  
  <path d="M105 115 L145 80" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M145 80 l-6 -1 v6 z" fill="#1a1a1a" transform="rotate(-30 145 80)"/>
</svg>

- No locks are involved in reading, so readers never block writers and writers never block readers. Long reports and short updates share a table without queueing
- Postgres calls this level Repeatable Read; so does InnoDB, with a difference that gets its own page (page 5)

### The failure

- Assuming the snapshot is taken at `BEGIN`. Postgres takes it at the first statement that is not transaction control; InnoDB at the first consistent read. Open a transaction, wait five minutes, then read: the snapshot includes those five minutes of commits
