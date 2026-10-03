## Event sourcing and CQRS

- Most systems store **current state** and overwrite it: the row says `balance = 100`, and how it got there is gone. **Event sourcing** inverts this: the source of truth is the **ordered log of events** (`deposited 60`, `deposited 60`, `withdrew 20`), and current state is a **fold** over that log. You never delete facts; you append them, and you can rebuild any state — or a brand-new view — by replaying from the start.
- What it buys, and what it costs:
  - **Gains:** a perfect **audit trail** (every change is a recorded fact — invaluable for finance, compliance, debugging), **time-travel** (reconstruct state as of any past moment), and the freedom to build **new read models** later by replaying history.
  - **Costs:** real complexity. **Event schema versioning** (old events must stay readable forever), snapshotting (so you don't replay millions of events), and the fact that reading "current balance" now means folding a log — which pushes you toward CQRS.
- **CQRS** (Command Query Responsibility Segregation) **splits the write model from the read model.** Commands append events (optimised for correctness); separate **read models** (projections) are built from those events and shaped for each query (a denormalised view per screen). It pairs naturally with event sourcing — project the event log into whatever read stores you need — but is independent: you can do CQRS without event sourcing, and vice versa.

:::warn
Both are **specialist tools, not defaults** — applying them everywhere is a classic over-engineering failure. The read model is **eventually consistent** with the writes (the projection lags), event schema migration is genuinely hard, and most CRUD features are served far better by a plain table. Reach for event sourcing when the **history is itself the product** (ledgers, audit-heavy domains, collaborative/undo features) and for CQRS when read and write shapes or scales **truly diverge** — not because they sound sophisticated. The right default remains a boring database (Booklet 4).
:::

### Module 8 — checkpoint
- **Key concepts:** timeouts + deadline propagation · retries with backoff/jitter/caps/budgets · retry storms/metastable failure · circuit breaker (closed/open/half-open) · bulkheads · backpressure vs load shedding · bound every queue · Little's Law (L=λW) · the ρ/(1−ρ) knee & headroom · tail-at-scale + hedging · coordinated omission · event sourcing & CQRS (specialist).
- **Task + questions:** compute in-flight requests for 500 req/s at 80 ms; then explain why p99 explodes near full utilisation and why a 100-way fan-out is usually slow.
- **Next:** the booklet close.
