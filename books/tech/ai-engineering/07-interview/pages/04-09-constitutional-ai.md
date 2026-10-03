## What is Constitutional AI / RLAIF, and why use AI feedback instead of human?

- Human preference labelling is **slow, costly, and inconsistent**, and exposes labellers to harmful content. **RLAIF (RL from AI feedback)** replaces the human labeller with an LLM that judges responses against written principles.
- **Constitutional AI (Anthropic)** is the best-known form: a **constitution** — a set of plain-language rules — guides the model to **critique and revise its own responses**, generating preference data automatically. That data then trains the reward signal.
- Benefits: scales cheaply, is **auditable** (the principles are written down and editable), and keeps humans out of the worst content.
- Limits: the judge model inherits its own biases and blind spots, and a vague constitution yields vague alignment. It augments human oversight rather than removing it.

:::interview
What's really being tested:

that AI feedback trades human cost/consistency for scale and auditability (explicit written principles), while inheriting the judge model's limitations.
:::
