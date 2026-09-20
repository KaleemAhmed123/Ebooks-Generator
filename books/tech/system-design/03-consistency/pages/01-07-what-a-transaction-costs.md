## What a transaction costs

- An open transaction holds three things: its row locks, so other writers on those rows queue; its snapshot, so the database must keep every row version it might still read (Module 3, page 1); and a pooled connection
- The whole art is **short and narrow**: few statements, few rows, nothing slow inside

<svg viewBox="0 0 460 140" role="img" aria-label="A long transaction holding locks across an HTTP call. The lock is held for 800ms while the app talks to Stripe, blocking all other users." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="100" height="100" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="70" y="35" text-anchor="middle" font-weight="bold">Database</text>
  
  <rect x="30" y="45" width="80" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="70" y="58" text-anchor="middle" font-size="6">BEGIN</text>
  
  <rect x="30" y="65" width="80" height="20" fill="#fce4e2" stroke="#b8541a"/>
  <text x="70" y="75" text-anchor="middle" font-size="6" font-weight="bold">Lock Held</text>
  <text x="70" y="83" text-anchor="middle" font-size="5">Queue forming...</text>
  
  <rect x="30" y="85" width="80" height="20" fill="#fff" stroke="#1d4e89"/>
  <text x="70" y="98" text-anchor="middle" font-size="6">COMMIT</text>
  
  <rect x="180" y="20" width="100" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="230" y="35" text-anchor="middle" font-weight="bold">Application</text>
  
  <rect x="190" y="60" width="80" height="30" fill="#fff" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="230" y="73" text-anchor="middle" font-size="6">await fetch(Stripe)</text>
  <text x="230" y="83" text-anchor="middle" font-size="6" fill="#b8541a">800ms delay</text>
  
  <path d="M230 45 L230 60" stroke="#1a1a1a" fill="none"/><path d="M230 60 l-2 -4 h4 z" fill="#1a1a1a"/>
  <path d="M230 90 L230 105" stroke="#1a1a1a" fill="none"/><path d="M230 105 l-2 -4 h4 z" fill="#1a1a1a"/>
  
  <path d="M110 55 L190 60" stroke="#1d4e89" fill="none" stroke-width="1"/><path d="M110 95 L190 90" stroke="#1d4e89" fill="none" stroke-width="1"/>
</svg>

- Nothing slow means no network call between `BEGIN` and `COMMIT`. Record an intent, commit, call the payment provider, record the result in a second transaction. Booklet 04's outbox pattern is the general form
- Narrow means the `WHERE` clause locks the row, not the table. A `SELECT … FOR UPDATE` without a key predicate locks every row it scans

### The failure

- A transaction opened when the form loads and committed when the user clicks Save. It holds its locks for minutes and pins its snapshot for as long. In Postgres, vacuum cannot remove a dead row version that snapshot could still see, so the table grows for every user who went to lunch
