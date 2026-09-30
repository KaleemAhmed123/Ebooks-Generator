## Orchestration topologies

- Zoom out from single patterns to how whole systems are wired. An **orchestration topology** is the *shape* of how components (LLM calls, tools, sub-agents) connect. Four shapes cover almost everything.

<svg viewBox="0 0 360 108" role="img" aria-label="Four topologies: single agent, pipeline, hierarchical supervisor, and network" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <text x="45" y="12" text-anchor="middle" font-size="6.5">single</text><circle cx="45" cy="40" r="12" fill="#24405e"/>
  <text x="135" y="12" text-anchor="middle" font-size="6.5">pipeline</text><circle cx="105" cy="40" r="9" fill="#24405e"/><circle cx="135" cy="40" r="9" fill="#24405e"/><circle cx="165" cy="40" r="9" fill="#24405e"/><line x1="114" y1="40" x2="126" y2="40" stroke="#888"/><line x1="144" y1="40" x2="156" y2="40" stroke="#888"/>
  <text x="245" y="12" text-anchor="middle" font-size="6.5">hierarchical</text><circle cx="245" cy="26" r="9" fill="#24405e"/><circle cx="225" cy="50" r="8" fill="#6a9bd0"/><circle cx="265" cy="50" r="8" fill="#6a9bd0"/><line x1="240" y1="33" x2="228" y2="44" stroke="#888"/><line x1="250" y1="33" x2="262" y2="44" stroke="#888"/>
  <text x="325" y="12" text-anchor="middle" font-size="6.5">network</text><circle cx="310" cy="28" r="7" fill="#24405e"/><circle cx="340" cy="30" r="7" fill="#24405e"/><circle cx="315" cy="52" r="7" fill="#24405e"/><circle cx="342" cy="52" r="7" fill="#24405e"/><g stroke="#888"><line x1="310" y1="28" x2="340" y2="30"/><line x1="310" y1="28" x2="315" y2="52"/><line x1="340" y1="30" x2="342" y2="52"/><line x1="315" y1="52" x2="342" y2="52"/></g>
  <line x1="20" y1="76" x2="340" y2="76" stroke="#eee"/>
  <text x="180" y="92" text-anchor="middle" font-size="6" fill="#6b6b6b">complexity rises left → right; so does coordination cost</text>
</svg>

- **Single agent** — one loop, one set of tools. Handles most tasks; start here. Simplest to build, test, and debug.
- **Pipeline** — a fixed sequence of components, each feeding the next (prompt chaining scaled up). Predictable, easy to reason about.
- **Hierarchical (supervisor)** — a coordinator delegates to specialized sub-agents and synthesizes (orchestrator-workers scaled up). The dominant multi-agent shape (Module 16).
- **Network** — agents talk peer-to-peer, any-to-any. Most flexible, hardest to control — coordination and failure modes explode (Module 16's cautions).

- **The governing rule mirrors the whole module:** more components and more connections buy flexibility at the cost of coordination overhead, non-determinism, and debugging pain. Add topology only when a single agent genuinely cannot do the job.

:::note
Topology is a Module-16 subject, previewed here because the framework you pick (next cluster) is partly a choice of *which topologies it makes easy*. LangGraph draws arbitrary graphs; CrewAI models role-based crews; AutoGen models conversations. Knowing the topologies lets you read a framework as "which shapes does this make natural?" — the right lens for choosing one.
:::
