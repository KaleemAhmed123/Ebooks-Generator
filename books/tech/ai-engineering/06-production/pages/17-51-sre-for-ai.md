## SRE for AI

- Site Reliability Engineering (SRE) runs services against explicit reliability targets. Two of its core tools — **SLOs** and **error budgets** — carry straight over, but a third reality is new: **the model is nondeterministic**, so "correct" is a distribution, not a boolean.
- An **SLO** (Service Level Objective) is the target, e.g. "99.5% of requests meet the latency SLO." The **error budget** is the allowed failure: 0.5% of requests *may* miss. You spend that budget on risk — ship features, run canaries — and freeze changes when it runs out.

<svg viewBox="0 0 340 74" role="img" aria-label="Error budget as a shrinking bar; while budget remains you ship, when it's exhausted you freeze" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="24" y="20" width="200" height="16" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><rect x="24" y="20" width="150" height="16" rx="3" fill="#1a3a2a"/><text x="99" y="32" text-anchor="middle" font-size="6" fill="#fff">budget spent</text><text x="199" y="32" text-anchor="middle" font-size="6" fill="#1a3a2a">left</text>
  <text x="24" y="50" font-size="6" fill="#1a3a2a">budget remains → ship, canary, experiment</text>
  <text x="24" y="62" font-size="6" fill="#a03050">budget gone → freeze changes, stabilise</text>
</svg>

- **What is new for AI.** *Quality* needs its own SLO (e.g. "eval score ≥ 0.85, hallucination rate ≤ 1%"), measured by sampling live outputs — a service can be 100% *up* and still failing on answers. *Refusals and safety blocks* are a distinct error class, not 5xx. And *nondeterminism* means the same input can pass then fail, so alerting is on **rates over windows**, not single events.
- **On-call gets harder.** You debug a *distribution* of behaviours, not a stack trace. The runbook needs prompt/output logs (17-45), the ability to pin or roll back a model/prompt version fast, and a kill switch (Booklet 5) for a misbehaving agent path.

:::interview
**"How is SRE different for an LLM service?"** Keep SLOs and error budgets, but add three things classic SRE lacks: a **quality SLO** measured on sampled live outputs (up ≠ correct), a **safety/refusal error class** separate from HTTP errors, and alerting on **rates over windows** because a nondeterministic model passes and fails the same input. The reliability question shifts from "is it responding?" to "is it responding *correctly, safely, and within cost* at P99?"
:::
