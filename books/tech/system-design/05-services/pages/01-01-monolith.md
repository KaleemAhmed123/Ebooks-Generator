## The monolith

- A monolith is a system built as a single deployable unit. The entire application runs in the same process, connects to a single database, and executes within a single transaction boundary
- It is the default architecture, not an embarrassment. The network is absent, meaning function calls are nanoseconds instead of milliseconds. You never face partial failure, distributed transactions, or serialization overhead

<svg viewBox="0 0 460 140" role="img" aria-label="One big box labeled Monolith talking to one database. The box contains UI, Business Logic, and Data Access." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="80" y="20" width="160" height="100" rx="4" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="160" y="35" text-anchor="middle" font-weight="bold">Monolith Process</text>
  
  <rect x="100" y="45" width="120" height="20" rx="2" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="160" y="58" text-anchor="middle">UI / API Layer</text>
  
  <rect x="100" y="70" width="120" height="20" rx="2" fill="#fce4e2" stroke="#b8541a"/>
  <text x="160" y="83" text-anchor="middle">Business Logic</text>
  
  <rect x="100" y="95" width="120" height="20" rx="2" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="160" y="108" text-anchor="middle">Data Access</text>

  <path d="M240 70 L280 70" stroke="#1a1a1a" fill="none" stroke-width="2"/><path d="M280 70 l-6 -3 v6 z" fill="#1a1a1a"/>

  <path d="M300 40 Q330 40 330 50 L330 90 Q330 100 300 100 Q270 100 270 90 L270 50 Q270 40 300 40 Z" fill="#e2fcf3" stroke="#1d4e89"/>
  <path d="M270 50 Q300 60 330 50" fill="none" stroke="#1d4e89"/>
  <text x="300" y="75" text-anchor="middle" font-weight="bold">Single DB</text>
</svg>

- Because everything is in one process, a developer can trace a request end-to-end in one debugger window. Deployment is atomic: the new version is either entirely live or entirely not

### The failure

- The failure mode of a monolith is rarely performance; a single process can scale vertically to serve massive traffic. The real failure mode is the **build and deploy queue** and the **schema coupling**
- When fifty engineers work on the same deployable unit, they step on each other. A broken test by the billing team blocks the core product team's urgent fix. The database schema becomes a tangled mess where "everyone touches everything" because no compiler prevents them from joining unrelated tables
