# Agents

## What makes something an "agent" rather than a chatbot or a workflow?

- A **chatbot** answers in one shot. A **workflow** runs a fixed, developer-defined sequence of LLM calls. An **agent** uses an LLM to **decide its own next step in a loop**, calling tools and reacting to results until a goal is met.
- The defining property: the **LLM controls the control flow**. It chooses which tool to call, whether to call another, and when it's done — the path isn't hard-coded.
- Spectrum, not a binary:
  - **Workflow** — predictable, you wrote the steps; use when the task decomposes cleanly.
  - **Agent** — flexible, the model plans dynamically; use when steps depend on intermediate results you can't predict.
- More autonomy = more capability **and** more ways to fail, more cost, less predictability. The engineering skill is choosing the *least* autonomy that solves the task.

:::interview
What's really being tested: that "agent" means the model drives control flow in a loop (not a fixed pipeline), and the judgment to prefer a workflow when the task is predictable.
:::
