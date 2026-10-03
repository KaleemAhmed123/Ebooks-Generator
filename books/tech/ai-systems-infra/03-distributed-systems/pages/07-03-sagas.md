## Sagas

- A **saga** replaces one distributed ACID transaction with a **sequence of local transactions**, one per service, each with a **compensating action** that undoes it. There's no global lock and no coordinator holding everyone hostage: each step commits locally and immediately, and if a **later** step fails, the saga runs the **compensations** for the steps already done, in reverse, to walk the system back to a consistent state.

<svg viewBox="0 0 360 92" role="img" aria-label="A saga: order, payment, inventory each commit locally; if inventory fails, compensating actions refund the payment and cancel the order in reverse" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="16" y="16" width="86" height="18" rx="3" fill="#dfe9d9" stroke="#2f7d4f"/><text x="59" y="28" text-anchor="middle" font-size="6">1. create order ✓</text>
  <rect x="136" y="16" width="86" height="18" rx="3" fill="#dfe9d9" stroke="#2f7d4f"/><text x="179" y="28" text-anchor="middle" font-size="6">2. charge card ✓</text>
  <rect x="256" y="16" width="90" height="18" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="301" y="28" text-anchor="middle" font-size="6">3. reserve stock ✗</text>
  <path d="M102 25 L136 25" stroke="#1a1a1a" marker-end="url(#sg)"/><path d="M222 25 L256 25" stroke="#1a1a1a" marker-end="url(#sg)"/>
  <rect x="136" y="58" width="86" height="18" rx="3" fill="#fdf2e9" stroke="#b5651d"/><text x="179" y="70" text-anchor="middle" font-size="6">refund card ↩</text>
  <rect x="16" y="58" width="86" height="18" rx="3" fill="#fdf2e9" stroke="#b5651d"/><text x="59" y="70" text-anchor="middle" font-size="6">cancel order ↩</text>
  <path d="M256 34 C230 48, 210 48, 200 56" stroke="#b5651d" marker-end="url(#sg)"/><path d="M136 67 L102 67" stroke="#b5651d" marker-end="url(#sg)"/>
  <text x="301" y="52" text-anchor="middle" font-size="5.4" fill="#c0392b">fail → compensate backwards</text>
  <defs><marker id="sg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- Two ways to drive the steps:
  - **Orchestration** — a central saga coordinator tells each service what to do next and triggers compensations on failure. Easier to see and debug the flow; the orchestrator is a component to run.
  - **Choreography** — each service emits an **event** that the next service reacts to, with no central brain. Loosely coupled, but the overall flow is implicit and harder to trace across services.
- The cost you accept: a saga is **not isolated**. Midway through, the world is partly updated — the order exists but isn't paid — so other transactions can observe that intermediate state (no serializability across the saga). You design for it with states (`PENDING` → `CONFIRMED`) and ensure every step and every compensation is **idempotent**, because they *will* be retried (next pages).

:::note
This is the pattern your microservices already gesture at, now named and made rigorous. "Create the order, then call payment, then call inventory, and undo if something fails" **is** a saga. Doing it well means: pick orchestration or choreography deliberately, make every step idempotent and every compensation safe to re-run, and accept eventual consistency instead of pretending a cross-service operation is atomic.
:::
