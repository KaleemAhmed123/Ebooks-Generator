## Circuit breakers and bulkheads

- **A circuit breaker** stops you from hammering a dependency that's already down. It watches the failure rate to a dependency and moves through three states:

<svg viewBox="0 0 360 86" role="img" aria-label="Circuit breaker states: closed passes calls; too many failures opens it to fail fast; after a cooldown it goes half-open to test, closing on success or re-opening on failure" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="34" width="86" height="22" rx="4" fill="#dfe9d9" stroke="#2f7d4f"/><text x="57" y="45" text-anchor="middle" font-size="6.3">CLOSED</text><text x="57" y="53" text-anchor="middle" font-size="5" fill="#777">calls pass</text>
  <rect x="140" y="34" width="86" height="22" rx="4" fill="#fdecea" stroke="#c0392b"/><text x="183" y="45" text-anchor="middle" font-size="6.3">OPEN</text><text x="183" y="53" text-anchor="middle" font-size="5" fill="#777">fail fast, don't call</text>
  <rect x="266" y="34" width="86" height="22" rx="4" fill="#fdf2e9" stroke="#b5651d"/><text x="309" y="45" text-anchor="middle" font-size="6.3">HALF-OPEN</text><text x="309" y="53" text-anchor="middle" font-size="5" fill="#777">test one call</text>
  <path d="M100 42 L140 42" stroke="#1a1a1a" marker-end="url(#cb)"/><text x="120" y="32" text-anchor="middle" font-size="5" fill="#c0392b">failures &gt; threshold</text>
  <path d="M226 48 L266 48" stroke="#1a1a1a" marker-end="url(#cb)"/><text x="246" y="68" text-anchor="middle" font-size="5" fill="#777">after cooldown</text>
  <path d="M309 34 C309 14, 57 14, 57 32" stroke="#2f7d4f" marker-end="url(#cb)"/><text x="183" y="12" text-anchor="middle" font-size="5" fill="#2f7d4f">success → CLOSED  (failure → back to OPEN)</text>
  <defs><marker id="cb" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Closed**: calls flow normally. Too many failures → **Open**: the breaker **fails fast** (returns an error or fallback immediately, without calling), giving the sick dependency room to recover and freeing your threads instead of parking them on doomed calls. After a cooldown → **Half-open**: let **one** trial call through; success closes the breaker, failure re-opens it. The whole point is to **stop spending your resources on a dependency that can't answer** — the opposite failure to the retry storm, and its natural partner.
- **Bulkheads** isolate resources so one sick dependency can't sink the ship. Named after a ship's watertight compartments: give each dependency (or each tenant/class of work) its **own** bounded thread or connection pool. If dependency X hangs, it exhausts only **X's** pool; calls to healthy Y still have their own pool and keep working. Without bulkheads, a single slow dependency drains the **one shared pool** and **every** endpoint stalls — the most common "one thing broke but the whole service went down" post-mortem.
- Together they encode a mindset: **contain failure to the smallest blast radius.** Timeouts bound one call, breakers bound one dependency, bulkheads bound one pool. Each stops a local failure from becoming a global one — the essence of resilient design, and the application-layer echo of partial failure (Module 1).
