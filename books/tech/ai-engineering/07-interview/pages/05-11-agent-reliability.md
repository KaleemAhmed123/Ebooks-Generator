## How do you make an agent reliable enough for production?

- Agents are probabilistic and compound errors, so reliability comes from **engineering around** the model, not from trusting it.
- The toolkit:
  - **Verification gates** — after each risky step, check the result (run tests, validate schema, assert invariants) before continuing. Catch errors early, not at the end.
  - **Constrain the action space** — fewer, well-scoped tools; structured outputs; allow-lists. Less room to go wrong.
  - **Bound the loop** — max steps, time/cost budgets, and a clear termination condition so a lost agent fails fast.
  - **Human-in-the-loop** on irreversible/high-stakes actions (confirmation before sending, deleting, paying).
  - **Idempotency & checkpoints** — safe retries, and rollback on failure.
  - **Observability** — trace every step so you can debug and measure.
- The frame: push for **high per-step reliability + early error detection + bounded blast radius**, since you can't make the model perfect.

:::interview
What's really being tested: that reliability is scaffolding (verification, constraints, budgets, HITL, checkpoints, tracing) around an imperfect model — not prompt-tuning your way to correctness.
:::
