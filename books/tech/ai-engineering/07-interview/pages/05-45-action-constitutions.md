## How do you constrain *what actions* an autonomous agent is allowed to take?

- Content guardrails filter text; **action** governance limits what the agent can *do*. For autonomy, this is the part that keeps a mistake from becoming an incident.
- Layered controls:
  - **Capability scoping / least privilege** — the agent only has tools and credentials for its job; no standing access to delete, pay, or email unless required.
  - **Action policies ("action constitution")** — explicit rules the agent (and a checking layer) must obey: what's forbidden, what needs approval, what's reversible vs not.
  - **Propose-then-commit** — the agent proposes a consequential action; a gate (human or policy check) approves before execution.
  - **Reversibility & checkpoints** — prefer reversible actions; checkpoint so you can roll back.
  - **Kill switch & budgets** — a way to halt the agent immediately, plus cost/step caps and canary rollouts for new autonomous behaviour.
- Principle: assume any single decision may be wrong or hijacked, and ensure the **worst case is bounded and reversible**.

:::interview
What's really being tested: that action governance (scoping, policies, propose-then-commit, reversibility, kill switch) is distinct from content filtering, and that the goal is a bounded, reversible worst case.
:::
