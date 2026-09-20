## Update is not in-place (MVCC)

- Postgres never overwrites a live row. An `UPDATE` writes a new row version and leaves the old one in place, invisible to transactions that started later
- This is **MVCC**, multi-version concurrency control: readers see the version that was current when their snapshot began, so readers and writers do not block each other. Booklet 03 is the isolation story

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

- Dead versions are reclaimed by `VACUUM` once no transaction can still see them. A **HOT update** (heap-only tuple) skips the index writes when no indexed column changed and the page has room; a lower `fillfactor` leaves that room
- Every `UPDATE` is therefore an insert plus, eventually, a delete. A hot table that updates in place elsewhere bloats here

### The failure

- Bloat: updates outrun `VACUUM` and the table keeps its dead versions on disk. A long-running transaction pins them all
- Wraparound: transaction IDs are 32-bit, so Postgres must "vacuum every table in every database at least once every two billion transactions" or stop accepting writes to protect the data. Notion's Postgres hit this wall in 2021 and sharded to escape it (Module 8, page 17)

:::interview
"Why does Postgres need VACUUM?" — Because updates and deletes leave the old row version in place for MVCC. VACUUM reclaims the versions nobody can see and freezes old transaction IDs so the 32-bit counter can wrap safely.
:::
