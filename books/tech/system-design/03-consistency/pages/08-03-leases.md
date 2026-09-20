## Leases

- A **lease** is a lock with an expiry. The holder must renew it before it lapses; if the holder dies, the lease lapses on its own and someone else can take it. Without the expiry, a crashed holder blocks everyone forever. With it, a paused holder can outlive its own lease and not know

<svg viewBox="0 0 460 120" role="img" aria-label="Timeline. Client 1 acquires a lease for 10 seconds at t=0 and renews at t=5. At t=7 client 1 pauses. The lease expires at t=15. Client 2 acquires it at t=16. At t=20 client 1 resumes, still believing it holds the lease, and writes." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5">
  <line x1="40" y1="100" x2="440" y2="100" stroke="#1a1a1a"/>
  <g font-size="7" text-anchor="middle">
    <text x="40" y="112">0 s</text><text x="120" y="112">5</text><text x="152" y="112">7</text><text x="280" y="112">15</text><text x="296" y="112">16</text><text x="360" y="112">20</text>
  </g>
  <text x="10" y="34">client 1</text>
  <rect x="40" y="24" width="112" height="14" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="96" y="34" text-anchor="middle" font-size="7">holds, renews at 5</text>
  <rect x="152" y="24" width="208" height="14" fill="#fcfcfc" stroke="#1a1a1a" stroke-dasharray="3 2"/>
  <text x="256" y="34" text-anchor="middle" font-size="7">paused: GC, VM freeze, swapped out</text>
  <rect x="360" y="24" width="70" height="14" fill="#fce4e2" stroke="#b8541a"/>
  <text x="395" y="34" text-anchor="middle" font-size="7">writes anyway</text>
  <text x="10" y="64">lease</text>
  <rect x="40" y="54" width="240" height="14" fill="#fcfcfc" stroke="#1a1a1a"/>
  <text x="160" y="64" text-anchor="middle" font-size="7">valid until 15 (last renewal at 5 + 10)</text>
  <line x1="280" y1="46" x2="280" y2="100" stroke="#b8541a" stroke-dasharray="2 2"/>
  <text x="280" y="46" text-anchor="middle" font-size="7" fill="#b8541a">expires</text>
  <text x="10" y="90">client 2</text>
  <rect x="296" y="80" width="144" height="14" fill="#e2fcf3" stroke="#1d4e89"/>
  <text x="368" y="90" text-anchor="middle" font-size="7">holds from 16: two holders at 20</text>
</svg>

- Two clocks are involved: the lock service's, which decides expiry, and the holder's, which decides whether to renew. The lease assumes the two run at nearly the same rate for the length of one lease. Over a few seconds that is a safe bet; the pause is not a clock problem, it is a "nothing ran" problem (Module 9, page 6)
- The holder cannot fix this by checking the lease before the write. The check and the write are two lines, and the pause can land between them. Only the thing being written to can refuse the write, which is page 4
- etcd leases and ZooKeeper sessions are this: a TTL kept alive by heartbeats, with keys or znodes that vanish when it lapses

### The failure

- A holder that resumes after a pause longer than its lease and finishes its job. Every lease-based lock has this window; the length of the lease only moves it. Where a double write costs money, a lease alone is not a correctness lock (page 6)
