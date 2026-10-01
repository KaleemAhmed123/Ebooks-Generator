## Walk through how a "deep research" multi-agent system is structured.

- Goal: answer a complex question by gathering and synthesising from many sources — a task that **parallelises**, which is exactly when multi-agent earns its keep.
- Typical structure (orchestrator-workers):
  - A **lead/orchestrator** agent decomposes the question into sub-questions and spawns **sub-agents**, each researching one sub-question with its own clean context and search/browse tools.
  - Sub-agents run **in parallel**, each retrieving, reading, and summarising its slice, returning only a **condensed finding** (not raw pages) to the orchestrator — keeping the orchestrator's context lean.
  - The orchestrator synthesises findings, spots gaps, may spawn follow-up sub-agents, then writes the final report **with citations**.
- Why it works here: parallel exploration cuts wall-clock, and context isolation (each sub-agent has its own window) sidesteps the single-context overflow problem.
- Costs/risks: many LLM calls (expensive), coordination overhead, and synthesis quality depends on sub-agents returning faithful, well-scoped summaries.

:::interview
What's really being tested: that you can design an orchestrator-workers system with parallel, context-isolated sub-agents returning condensed findings — and name why this shape fits research (parallelism + context isolation) and its cost.
:::
