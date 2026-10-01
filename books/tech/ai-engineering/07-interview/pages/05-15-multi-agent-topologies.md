## Supervisor vs swarm/handoff — how do multi-agent systems coordinate?

- **Supervisor (hierarchical):** a central agent decomposes the task and delegates to worker agents, collecting and synthesising their results. Clear control, easy to reason about and audit; the supervisor is a bottleneck and single point of failure.
- **Handoff / network (swarm):** agents pass control to one another peer-to-peer ("this is a billing issue → hand to the billing agent"). Flexible and decentralised; harder to trace and prone to loops or ping-ponging.
- **Blackboard / shared memory:** agents read/write a shared workspace instead of messaging directly; good for loosely-coupled collaboration.
- Choosing: **supervisor** for structured, decomposable tasks where you want control and observability (most production systems); **handoff** for routing among specialists; **blackboard** for open collaborative problem-solving.
- Across org boundaries, agents coordinate via protocols like **A2A** rather than shared process memory.

:::interview
What's really being tested: that you know the main topologies, their control/observability trade-offs, and default to supervisor for production while recognising handoff/blackboard niches.
:::
