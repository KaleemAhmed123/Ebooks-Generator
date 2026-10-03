## Routing: a worked cascade

- Make the routing layer (13-45) concrete with a **cascade** — try the cheap model first, escalate to the expensive one only when needed. It is the routing strategy with the best cost/quality tradeoff, and a favorite system-design answer.

:::mint
```text
Request: "Summarize this support ticket in one line."

1  Try small model (cheap, fast):
     → "Customer can't log in after password reset."
2  Confidence / validation check:
     → length ok, on-topic, not refused → ACCEPT (done, ~$0.0002)

Request: "Analyze this 40-page contract for liability risks."

1  Try small model:
     → shallow, misses clauses → validation FAILS (low confidence)
2  Escalate to large model:
     → thorough clause-by-clause analysis → ACCEPT (~$0.05)
```
:::

- **The cascade logic:** send every request to the **cheap** model first. Check its output — a validation rule, a confidence score, or a lightweight judge (14-118). If it passes, you are done at ~1% of the flagship cost. If it fails, **escalate** to the expensive model. You pay the big-model price *only* for the requests that genuinely need it.
- **Why it beats always-big and always-small:** always-flagship overpays for the easy majority; always-cheap fails the hard minority. The cascade *sorts* requests by difficulty at runtime and spends accordingly — the economic sweet spot when a large share of traffic is easy (which it usually is).
- **The design knob:** the **escalation trigger** is the crux — too lax ships bad cheap answers, too eager escalates everything (losing the savings). A cascade adds latency on escalated requests (two calls), so it fits when most traffic resolves cheaply.

:::interview
"Design a cost-efficient way to serve a mixed-difficulty LLM workload."

A model cascade. Route every request to a small cheap model first, validate its output (a rule, a confidence score, or a light judge), accept if it passes, and escalate to the flagship only on failure — so you pay big-model prices only for the requests that truly need them. It beats always-big (overpays for the easy majority) and always-small (fails the hard minority) by sorting requests by difficulty at runtime. The critical knob is the escalation trigger — too lax ships bad cheap answers, too eager escalates everything and erases the savings — and note escalated requests cost two calls of latency, so it wins when most traffic resolves cheaply.
:::
