## Update is not in-place (MVCC)

- The B-tree page is updated in-place, but the data itself is not. If two transactions try to read and write the same row at the same time, an in-place update would tear the row (Module 3)
- Instead, databases like Postgres use Multi-Version Concurrency Control (MVCC). An `UPDATE` does not overwrite the old row. It writes a completely new row (with a new transaction ID) and marks the old one for deletion

<svg viewBox="0 0 460 120" role="img" aria-label="MVCC in Postgres. Updating Alice's balance writes a new row (XID 50) and leaves the old row (XID 40) intact for concurrent readers, until VACUUM reclaims it." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="50" y="20" width="160" height="30" rx="3" fill="#fce4e2" stroke="#b8541a" stroke-dasharray="2 2"/>
  <text x="130" y="39" text-anchor="middle">XID: 40 | Alice | Balance: $5</text>
  <text x="220" y="39" font-size="7" fill="#6b6b6b">Read by old transactions</text>
  
  <rect x="50" y="70" width="160" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="130" y="89" text-anchor="middle">XID: 50 | Alice | Balance: $9</text>
  <text x="220" y="89" font-size="7" fill="#6b6b6b">Read by new transactions</text>
  
  <path d="M130 50 L130 70" stroke="#1a1a1a" fill="none"/><path d="M130 70 l-3 -6 h6 z" fill="#1a1a1a"/>
  <text x="140" y="63" font-size="7">UPDATE</text>
</svg>

- This means readers never block writers, and writers never block readers. A long-running report reading from the database sees a consistent snapshot of the past
- The database eventually runs a background process (`VACUUM` in Postgres) to delete the old, dead row versions once no active transaction can see them

### The failure

- Table bloat. If you update rows faster than `VACUUM` can delete the old versions, the table grows on disk forever
- Transaction-ID wraparound. Postgres uses 32-bit transaction IDs. After 2 billion transactions, the IDs wrap back to zero, and the database suddenly believes all recent rows are from the distant past. Postgres will shut itself down to prevent corruption if `VACUUM` fails to run
