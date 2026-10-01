## When is building an agent overkill?

- Agents add cost, latency, non-determinism, and failure modes. Many problems are better solved with something simpler — reaching for an agent by default is a common senior-level red flag.
- Prefer a simpler mechanism when:
  - **A single LLM call** answers it (classification, extraction, a one-shot generation).
  - **A fixed workflow** covers it (known steps → hard-code them; more reliable and cheaper).
  - **Plain RAG or a tool call** gets the data — no multi-step planning needed.
  - **Determinism/auditability** is required (regulated flows) — an agent's variable path is a liability.
- Reach for an agent only when steps **genuinely depend on unpredictable intermediate results** and the flexibility is worth the cost.
- The principle (again): use the **least autonomy** that solves the task. "Could a workflow do this?" is the question that saves the most pain.

:::interview
What's really being tested: the judgment to down-scope — recognising when a call, workflow, or RAG beats an agent, and that autonomy is a cost to justify, not a goal.
:::
