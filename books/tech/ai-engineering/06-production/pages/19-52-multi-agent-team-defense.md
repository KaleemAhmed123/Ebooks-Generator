## Multi-agent team: coordination and defense

- The failure modes of a multi-agent team are *coordination* failures, and the design is mostly about preventing them.

| Failure (MAST, Booklet 5) | Prevention |
|---|---|
| reviewer rubber-stamps coder | separate context/model; objective test gate on top |
| agents loop debating | supervisor caps rounds; a decider breaks ties |
| error compounds across handoffs | typed artefacts + verification at each handoff |
| cost blows up | per-agent + per-task token budgets, one shared cap |
| lost shared state | single source of truth (the repo + the plan), not per-agent memory |

- **The objective gate is the anchor.** Agents' opinions are subjective and can collude or drift; the *test suite* is not. Every handoff ends at a verification the agents don't control (tests pass, the build succeeds), so the team's output is grounded in something real, not in agents agreeing with each other. This is Booklet 5's craft and Module 18's AI-control framing at team scale.
- **When to use a team vs one agent.** Team wins when roles are genuinely distinct and parallelisable (a large feature: plan, implement several files, review, test). One strong agent wins when the task is cohesive — the coordination overhead of a team exceeds its benefit below a real complexity threshold.

:::interview
"When is a multi-agent software team better than one coding agent, and how do you keep it from going wrong?"

Better when the task genuinely decomposes into specialised, partly-parallel roles — plan, implement, review, test — where a fresh-context reviewer catches what the coder can't see and roles can work concurrently. Keep it honest with: **separate contexts** per role (so the reviewer isn't the coder rubber-stamping itself), **objective verification gates** (tests, build) at every handoff as the truth no agent can override, **typed artefacts** so errors don't compound silently, and **shared budgets + a supervisor** that caps debate rounds. The senior caveat: a team multiplies both capability *and* failure modes (MAST), so I default to one strong agent and reach for a team only when the decomposition clearly pays for its coordination cost.
:::
