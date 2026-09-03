## Cluster / PM2

One Node process uses one core. `cluster` — and PM2 on top of it — forks a
worker per core behind a shared listening socket, and the OS spreads incoming
connections across them.

An eight-core box running a single Node process is paying for seven idle cores.
`pm2 start -i max` forks eight workers and throughput for I/O-bound work rises
roughly sevenfold.

<svg viewBox="0 0 460 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A primary Node process forks one worker per CPU core, all sharing a single listening socket that the operating system load balances across">
  <rect x="4" y="30" width="104" height="32" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="56" y="44" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">primary</text>
  <text x="56" y="56" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">shared socket</text>
  <path d="M110 46 H140 M140 12 V80 M140 12 H172 M140 32 H172 M140 60 H172 M140 80 H172" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M172 12 l-7 -4 v8 z M172 32 l-7 -4 v8 z M172 60 l-7 -4 v8 z M172 80 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="180" y="16" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">worker — core 1</text>
  <text x="180" y="36" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">worker — core 2</text>
  <text x="180" y="64" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">…</text>
  <text x="180" y="84" font-family="Consolas,monospace" font-size="8.5" fill="#1a1a1a">worker — core 8</text>
  <rect x="292" y="52" width="164" height="34" fill="#e2fcf3" stroke="#5b2fa8" stroke-width="1.4"/>
  <text x="374" y="66" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">in-memory state is now</text>
  <text x="374" y="78" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#5b2fa8">eight separate copies</text>
</svg>

Nothing in memory is shared afterwards. Rate-limit counters, caches and locks
that worked on one process now hold eight independent answers.

## Connection Pool Exhaustion

Every connection in the pool is checked out and new queries queue for one that
never comes back. It presents as a database problem and is almost never a
database problem.

A handler that forgets to release a client on the error path leaks one
connection per failure. After twenty errors a pool of twenty is empty, every
request times out on acquire — and database CPU sits at 3%. That gap between
total application failure and an idle database is the tell.

Raising the pool size buys minutes. Releasing in a `finally`, and setting an
acquire timeout so the queue fails fast instead of piling up, fixes it.
