## The pessimistic locking bottleneck

- If optimistic concurrency melts the CPU, what about pessimistic locking? What if we use `SELECT * FROM seats WHERE id = '12A' FOR UPDATE`?
- Pessimistic locking forces transactions to wait in a queue. If 100,000 users try to buy Seat 12A, the first user gets the lock. The other 99,999 users are paused

<svg viewBox="0 0 460 140" role="img" aria-label="The pessimistic locking bottleneck. 99,999 users waiting for a row lock exhaust the Postgres connection pool. All other site traffic fails." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="20" width="80" height="30" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="60" y="34" text-anchor="middle" font-weight="bold">User 1</text>
  <text x="60" y="44" text-anchor="middle" font-size="6">Holds Lock</text>
  
  <rect x="20" y="60" width="80" height="70" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="75" text-anchor="middle" font-weight="bold">99,999 Users</text>
  <text x="60" y="85" text-anchor="middle" font-size="6">Waiting in queue</text>
  <text x="60" y="95" text-anchor="middle" font-size="6">holding DB connections</text>
  
  <rect x="180" y="20" width="100" height="110" rx="3" fill="#fce4e2" stroke="#b8541a"/>
  <text x="230" y="35" text-anchor="middle" font-weight="bold">Postgres DB</text>
  <text x="230" y="60" text-anchor="middle" font-weight="bold" fill="#b8541a">Connection Pool</text>
  <text x="230" y="75" text-anchor="middle" font-weight="bold" fill="#b8541a">EXHAUSTED</text>
  <text x="230" y="100" text-anchor="middle" font-size="6">Max Connections: 500</text>
  
  <path d="M100 35 L180 35" stroke="#1d4e89" fill="none" stroke-width="2"/><path d="M180 35 l-4 -2 v4 z" fill="#1d4e89"/>
  <path d="M100 95 L180 95" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M180 95 l-4 -2 v4 z" fill="#1a1a1a"/>
  
  <rect x="320" y="20" width="120" height="110" rx="3" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="2 2"/>
  <text x="380" y="45" text-anchor="middle" font-weight="bold">Collateral Damage</text>
  <text x="380" y="60" text-anchor="middle" font-size="7">Because the connection pool</text>
  <text x="380" y="70" text-anchor="middle" font-size="7">is completely full of users</text>
  <text x="380" y="80" text-anchor="middle" font-size="7">waiting for Seat 12A, nobody</text>
  <text x="380" y="90" text-anchor="middle" font-size="7">can load the homepage or</text>
  <text x="380" y="100" text-anchor="middle" font-size="7">buy tickets for other events.</text>
</svg>

- Postgres handles queues by assigning one physical connection to each waiting query. If your database allows 500 max connections, and 100,000 users queue up, the connection pool fills instantly. The database stops accepting new connections entirely. The entire website goes down because nobody can even load the homepage

### The failure

- Holding the lock while calling the Stripe API. If User 1 gets the row lock, and the API server proceeds to call the Stripe API to process their credit card, the lock is held for 3 seconds. The connection pool stays exhausted for 3 seconds. Never, ever hold a pessimistic database lock while making an external HTTP request
