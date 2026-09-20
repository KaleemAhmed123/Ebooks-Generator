## Eventual consistency is a liveness promise

- **Eventually consistent**: if writes stop, all replicas converge to the same state. That is a **liveness** property (something good happens in the end). It puts no bound on what a read returns before then, and no bound on how long "eventually" is
- It is the weakest promise worth naming. It does not even imply the session guarantees: a client can see its own write, then not see it, and the system is still eventually consistent

<svg viewBox="0 0 460 140" role="img" aria-label="Eventual consistency timeline. User A writes to Leader. 10ms later, User B reads from Follower and sees stale data. 50ms later, WAL applies. 60ms later, User C reads and sees fresh data." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <path d="M50 40 L410 40" stroke="#1d4e89" fill="none" stroke-width="2"/>
  <text x="30" y="44" font-weight="bold">Leader</text>
  
  <path d="M50 100 L410 100" stroke="#1a1a1a" fill="none" stroke-width="2"/>
  <text x="30" y="104" font-weight="bold">Follower</text>
  
  <circle cx="100" cy="40" r="4" fill="#b8541a"/>
  <text x="100" y="30" text-anchor="middle" font-weight="bold">T=0</text>
  <text x="100" y="20" text-anchor="middle" font-size="6">User A writes 'X'</text>
  
  <circle cx="150" cy="100" r="4" fill="#6b6b6b"/>
  <text x="150" y="115" text-anchor="middle" font-weight="bold">T=10ms</text>
  <text x="150" y="125" text-anchor="middle" font-size="6">User B reads</text>
  <text x="150" y="135" text-anchor="middle" font-size="6" fill="#b8541a">Sees old data!</text>
  
  <path d="M100 45 L220 95" stroke="#1a1a1a" fill="none" stroke-dasharray="2 2"/><path d="M220 95 l-6 -1 v5 z" fill="#1a1a1a" transform="rotate(20 220 95)"/>
  <text x="160" y="65" font-size="6">Replication Lag (50ms)</text>
  
  <circle cx="230" cy="100" r="4" fill="#1d4e89"/>
  <text x="230" y="115" text-anchor="middle" font-weight="bold">T=50ms</text>
  <text x="230" y="125" text-anchor="middle" font-size="6">WAL applied</text>
  
  <circle cx="300" cy="100" r="4" fill="#1d4e89"/>
  <text x="300" y="115" text-anchor="middle" font-weight="bold">T=60ms</text>
  <text x="300" y="125" text-anchor="middle" font-size="6">User C reads</text>
  <text x="300" y="135" text-anchor="middle" font-size="6" fill="#1d4e89">Sees 'X'</text>
</svg>

- What makes it acceptable in practice is not the model but the numbers: replication lag is usually milliseconds, so the window in which a read is stale is usually invisible. The failures happen when the lag is not usual: a replica rebuilding, a network hiccup, a burst of writes
- The design question it forces: what happens in the window, and how long may the window be. A system that answers both ("reads may lag by up to 5 s; sessions are sticky so users do not see it") has a design. A system that says "eventually consistent" has a hope

### The failure

- "Eventually consistent" as the whole consistency section of a design. It names no bound and no mechanism, so it cannot be wrong, and it cannot be built either. Name the lag budget, the session guarantees, and what the reader sees when the budget is blown
