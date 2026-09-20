## The Redis threading model

- Redis is the industry standard distributed cache. To use it correctly, you must understand its threading model
- Redis is famously single-threaded for command execution. It uses an event loop (like Node.js). If you send 10,000 `GET` commands, Redis executes them one by one, extremely quickly
- (Modern Redis supports I/O threads to parse the network sockets and write the responses, but the actual data manipulation still happens on one main thread)

<svg viewBox="0 0 460 140" role="img" aria-label="Redis architecture. Multiple I/O threads feeding into one Command thread." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <rect x="20" y="30" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="44" text-anchor="middle">Network I/O</text>
  
  <rect x="20" y="90" width="80" height="20" rx="3" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="60" y="104" text-anchor="middle">Network I/O</text>
  
  <rect x="180" y="50" width="100" height="40" rx="3" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="230" y="70" text-anchor="middle" font-weight="bold">Main Thread</text>
  <text x="230" y="82" text-anchor="middle" font-size="7">Executes Commands</text>
  
  <path d="M100 40 L180 60" stroke="#1a1a1a" fill="none"/>
  <path d="M100 100 L180 80" stroke="#1a1a1a" fill="none"/>
</svg>

### The failure

- The failure is running a slow, blocking command in production. Because execution is single-threaded, if a command takes 2 seconds to run, every other request in the system is queued and delayed by 2 seconds
- The classic mistake is running `KEYS *` (which scans the entire database to find matching keys) instead of `SCAN` (which paginates). A developer runs `KEYS *` to debug something, and instantly takes down the entire production website because the main thread is blocked for 5 seconds
