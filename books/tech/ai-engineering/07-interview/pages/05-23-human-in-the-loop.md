## Where do you put a human in the loop for an agent?

- Full autonomy is rarely the right default; you insert humans at the points where a mistake is **costly or irreversible**.
- Patterns:
  - **Approval gate** — the agent pauses and asks for confirmation before a high-stakes action (sending an email, deleting data, spending money, merging code). Propose-then-commit.
  - **Review-and-edit** — the agent drafts, a human approves/edits before it ships. Keeps speed with a safety check.
  - **Escalation** — on low confidence, ambiguity, or repeated failure, hand off to a human rather than guess.
  - **Checkpoints** — pause at milestones on long tasks so a human can course-correct early.
- Design for it: make the agent **durable** (it can pause mid-run and resume after approval), surface **what it's about to do and why**, and default risky actions to **require approval** (fail closed).
- Trade-off: more gates = safer but slower/less autonomous. Place them by **risk**, not everywhere.

:::interview
What's really being tested: that you gate by action risk (approval on irreversible, escalation on uncertainty) and that the agent must support pause/resume — not sprinkle confirmations everywhere.
:::
