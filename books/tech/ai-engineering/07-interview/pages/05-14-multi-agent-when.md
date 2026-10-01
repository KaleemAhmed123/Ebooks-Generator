## When do multiple agents genuinely beat one, and when do they just add cost?

- **Multi-agent** = several LLM agents with distinct roles/prompts/tools collaborating. It helps when:
  - The work **parallelises** (independent sub-tasks explored at once — e.g. a research task fanning out across sources).
  - Tasks need **distinct specialisations** or separated tool/permission scopes.
  - You want **separation of concerns** (a generator and an independent critic/verifier).
- It **hurts** when:
  - The task is sequential and simple — you've added coordination overhead, latency, and cost for nothing.
  - **Errors propagate** between agents and compound; miscommunication and context loss across agents add new failure modes.
  - Cost multiplies (every agent is LLM calls) often without matching quality gains.
- Honest stance: most tasks don't need multi-agent; a well-built single agent or a workflow is simpler and more reliable. Reach for multi-agent mainly for **parallel exploration** or hard **role separation**.

:::interview
What's really being tested: that multi-agent wins on parallelism/specialisation but adds coordination cost and new failure modes — and that it's over-used, so you justify it rather than defaulting to it.
:::
