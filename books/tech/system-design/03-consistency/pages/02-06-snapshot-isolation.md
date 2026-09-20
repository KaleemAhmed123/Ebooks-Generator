## Snapshot isolation

- **Snapshot isolation** solves the non-repeatable read anomaly. When a transaction starts, the database takes a "snapshot" of the entire database. For the rest of the transaction, every single statement sees exactly that snapshot, completely ignoring any writes committed by other users in the meantime
- The magic of snapshot isolation is that **readers never block writers, and writers never block readers**. The database does not use locks to enforce the snapshot

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

- To achieve this, the database implements **Multi-Version Concurrency Control (MVCC)**. When Transaction 43 updates Bob's row, it does not overwrite the data on disk. Instead, it creates a brand new copy of the row tagged with its transaction ID (`created_by=43`). The database keeps both versions. Readers simply filter out versions that were created after their snapshot started

### The failure

- Assuming the snapshot begins exactly when you type `BEGIN`. In Postgres, the snapshot is taken at the moment the *first non-transaction-control statement* is executed, not at `BEGIN`. If you open a transaction and sit idle for 5 minutes, your snapshot will include all the writes that happened during those 5 minutes
