## Why optimistic concurrency melts

- In Module 3, we learned that Optimistic Concurrency (using a version column) is great for performance because it avoids locking. But we also learned it fails under high contention. A ticket drop is the highest contention event on the internet

<svg viewBox="0 0 460 140" role="img" aria-label="Optimistic concurrency meltdown. 100,000 users try to buy Seat 12A. 1 succeeds. 99,999 fail and retry. The CPU maxes out processing retries, causing a cascading failure." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="100" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="35" text-anchor="middle" font-weight="bold">100,000 Users</text>
  <text x="60" y="50" text-anchor="middle" font-size="6">All clicking "Buy"</text>
  <text x="60" y="60" text-anchor="middle" font-size="6">on Seat 12A</text>
  
  <rect x="150" y="20" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="200" y="44" text-anchor="middle" font-weight="bold">1 Success</text>
  
  <rect x="150" y="80" width="100" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="200" y="99" text-anchor="middle" font-weight="bold">99,999 Aborts</text>
  <text x="200" y="109" text-anchor="middle" font-size="6">"0 rows updated"</text>
  
  <path d="M100 40 L150 40" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M150 40 l-4 -2 v4 z" fill="#1d4e89"/>
  <path d="M100 100 L150 100" stroke="#b8541a" fill="none" stroke-width="4"/><path d="M150 100 l-6 -3 v6 z" fill="#b8541a"/>
  
  <rect x="300" y="50" width="120" height="40" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="360" y="65" text-anchor="middle" font-weight="bold">Cascading Failure</text>
  <text x="360" y="75" text-anchor="middle" font-size="6">99,999 users automatically</text>
  <text x="360" y="85" text-anchor="middle" font-size="6">retry, maxing out the DB CPU</text>
  
  <path d="M250 100 L280 100" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M280 100 l-4 -2 v4 z" fill="#b8541a"/>
  <path d="M250 90 L300 70" stroke="#b8541a" fill="none" stroke-width="2"/><path d="M300 70 l-6 0 v5 z" fill="#b8541a" transform="rotate(-20 300 70)"/>
</svg>

- If 100,000 users try to buy Seat 12A using optimistic concurrency, exactly one transaction will succeed. The other 99,999 transactions will read the data, attempt the update, see `0 rows updated`, and throw a conflict error
- The application code will catch the error and retry. You have just built a Distributed Denial of Service (DDoS) attack against your own database. The database will spend 100% of its CPU aborting and retrying doomed transactions until the server crashes

### The failure

- Using a version column on the `Seat` table. Optimistic concurrency is the absolute worst choice for a ticketing system. Under extreme burst contention, you must fail fast, not retry
