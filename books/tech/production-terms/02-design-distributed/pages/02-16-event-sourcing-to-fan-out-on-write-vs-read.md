## Event Sourcing

Storing the sequence of changes as the source of truth and deriving current
state by replaying them. Heavier than teams expect when they adopt it.

Instead of a row saying `balance = 400`, you store `Deposited 500` and
`Withdrew 100`. You get a perfect audit trail and the ability to reconstruct any
past state — and every schema change becomes a replay problem, because old
events were written by old code and must still be readable by new code forever.

Adopt it where the history *is* the product: ledgers, compliance, anything where
"why is it this value?" is asked in anger. Adopting it for CRUD buys the cost
without the benefit.

## Eventual Consistency

Replicas converge on the same value once writes stop. Between the write and the
convergence, two readers can both be correct and disagree.

<svg viewBox="0 0 460 78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A write reaches one replica immediately while another serves stale data for 300 milliseconds before converging">
  <path d="M40 20 H444" stroke="#1a1a1a" stroke-width="1"/>
  <path d="M40 52 H444" stroke="#1a1a1a" stroke-width="1"/>
  <text x="4" y="24" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">rep A</text>
  <text x="4" y="56" font-family="Consolas,monospace" font-size="8.5" fill="#6b6b6b">rep B</text>
  <circle cx="70" cy="20" r="3.5" fill="#2b5fa8"/><circle cx="70" cy="52" r="3.5" fill="#1a1a1a"/>
  <text x="62" y="12" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">write</text>
  <text x="82" y="17" font-family="Georgia,serif" font-size="9" fill="#2b5fa8">new value, immediately</text>
  <rect x="70" y="44" width="180" height="16" fill="#f0f0f0"/>
  <text x="82" y="56" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">still serving the old value</text>
  <circle cx="250" cy="52" r="3.5" fill="#2b5fa8"/>
  <text x="258" y="56" font-family="Georgia,serif" font-size="9" fill="#2b5fa8">converged</text>
  <path d="M70 68 H250" stroke="#6b6b6b" stroke-width="0.8"/>
  <text x="160" y="76" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#6b6b6b">the stale window: 300ms</text>
</svg>

The window is fine for an avatar and unacceptable for an account balance. The
decision is per read path, not per system.

## Fan-Out on Write vs Read

Precompute a result for every consumer at write time, or compute it per request
at read time. The timeline problem, and the reason every social product ends up
with both.

An account with fifty million followers posts once. Fan-out on write means fifty
million inserts for one action. Fan-out on read means fifty million timeline
queries instead. Real systems precompute for ordinary accounts and compute on
read for the few large ones, then merge the two at read time.

The threshold between the two is a tuning parameter, not a constant, and it
moves as the follower distribution does.
