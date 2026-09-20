## Dirty read

- A **dirty read** occurs when Transaction B reads data that was written by Transaction A, but Transaction A has not yet committed. 

<svg viewBox="0 0 460 140" role="img" aria-label="Dirty read. Transaction A writes Invoice=Paid, then crashes and rolls back. Transaction B reads Paid and ships the item, but the money was never collected." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="70" y="34" text-anchor="middle" font-weight="bold">Tx A (Payment)</text>
  <rect x="20" y="45" width="100" height="20" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="70" y="59" text-anchor="middle" font-size="7">Write: Invoice = Paid</text>
  
  <path d="M70 70 L70 95" stroke="#b8541a" fill="none" stroke-width="2" stroke-dasharray="2 2"/>
  <path d="M65 75 L75 85" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M75 75 L65 85" stroke="#b8541a" fill="none" stroke-width="2"/>
  <text x="85" y="88" font-size="7" fill="#b8541a" font-weight="bold">Crash (Rollback)</text>
  
  <rect x="20" y="105" width="100" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="70" y="119" text-anchor="middle" font-size="7">Final state: Unpaid</text>
  
  <rect x="240" y="20" width="100" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="290" y="34" text-anchor="middle" font-weight="bold">Tx B (Shipping)</text>
  
  <path d="M125 55 L235 70" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M235 70 l-6 -3 v6 z" fill="#1a1a1a" transform="rotate(5 235 70)"/>
  <text x="180" y="60" text-anchor="middle" font-size="6">Dirty read</text>
  
  <rect x="240" y="60" width="100" height="20" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="290" y="74" text-anchor="middle" font-size="7">Read: Invoice = Paid</text>
  
  <rect x="240" y="85" width="100" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="290" y="99" text-anchor="middle" font-size="7" font-weight="bold">Ship the item!</text>
</svg>

- Almost no modern database allows dirty reads by default. If a database allowed them, you could make decisions based on data that was eventually rolled back and therefore *never actually existed*
- Postgres goes so far as to refuse to implement the Read Uncommitted isolation level entirely. If you ask Postgres for Read Uncommitted, it silently upgrades you to Read Committed

### The failure

- Reading an uncommitted row from a replica. Dirty reads are not just a database engine concept; they happen in distributed systems too
- If you write to the Leader, and the Leader asynchronously replicates the uncommitted WAL to the Follower, reading from the Follower might expose the uncommitted state. Most modern databases deliberately hide uncommitted rows on the replica to prevent this, but hand-rolled caching layers often do not
