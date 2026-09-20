## What a transaction costs

- A transaction is not free. While a transaction is open, it consumes resources on the database server. It holds row locks (blocking other writers). It pins an old snapshot of the data (blocking the garbage collector from freeing up space, leading to bloat). It consumes a connection from the pool
- The art of designing transactions is keeping them **short and narrow**

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

- **Short**: The transaction should execute as fast as possible. Never, ever hold a transaction open while waiting for a network call to a third-party API (like Stripe or SendGrid). If the API is slow, your database grinds to a halt
- **Narrow**: The transaction should only lock the exact rows it needs. Do not lock the entire `users` table just to update a single user's balance

### The failure

- Holding a transaction open across user think-time. If you start a transaction when a user opens a form, and only commit it when they click "Save", that transaction is held open for minutes. An open transaction pins the Multi-Version Concurrency Control (MVCC) horizon, preventing Postgres from vacuuming deleted rows. Your database will bloat, run out of disk space, and crash
