## How do you choose an agent framework (LangGraph, CrewAI, OpenAI/Claude Agent SDKs, etc.)?

- Frameworks differ mainly in **how much control vs abstraction** they give.
  - **LangGraph** — model your agent as an explicit **graph of nodes/edges with state**, built-in checkpointing, human-in-the-loop, and streaming. Low-level and controllable; good when you need custom control flow, durability, and observability.
  - **CrewAI** — high-level **role-based crews** (agents with roles collaborating). Fast to prototype role-playing teams; less fine control.
  - **OpenAI Agents SDK / Claude Agent SDK** — lighter, provider-aligned loops with handoffs, guardrails, tool use; good when you're on that provider and want a thin, supported layer.
  - **LlamaIndex / DSPy** — retrieval-centric (LlamaIndex) or prompt-program-optimising (DSPy) rather than general orchestration.
- Decision axes: **control vs speed-to-build**, **durability/checkpointing** needs, **observability**, provider lock-in, and team familiarity.
- Senior take: frameworks are optional — the agent loop is simple to hand-roll. Adopt one for **durability, HITL, and tracing**, not because "you need a framework to build agents."

:::interview
What's really being tested: that you compare on control-vs-abstraction and durability/observability needs, and know the loop can be hand-rolled — frameworks earn their place on infra, not core logic.
:::
