## CrewAI: when to use it

- Place CrewAI deliberately among its neighbors.

<svg viewBox="0 0 360 84" role="img" aria-label="CrewAI fits fast intuitive multi-agent prototypes; graphs fit reliable production" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="58" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">reach for CrewAI</text><text x="92" y="44" text-anchor="middle" font-size="6">fast multi-agent prototype</text><text x="92" y="55" text-anchor="middle" font-size="6">role/team-shaped task</text><text x="92" y="66" text-anchor="middle" font-size="6">team new to agents</text>
  <rect x="185" y="16" width="165" height="58" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">prefer LangGraph/Flows</text><text x="267" y="44" text-anchor="middle" font-size="6">high-reliability production</text><text x="267" y="55" text-anchor="middle" font-size="6">tight control / persistence</text><text x="267" y="66" text-anchor="middle" font-size="6">complex custom flow</text>
</svg>

- **Choose CrewAI when:**
  - You want a **multi-agent prototype fast**, described in human terms (roles, goals) rather than graphs or actors.
  - The task genuinely maps to a **team of specialists** doing a pipeline — research → write → edit, plan → execute → review.
  - Your team is **new to agents** and wants an intuitive on-ramp.
- **Choose something else when:**
  - You need **production reliability, persistence, or fine control** → LangGraph, or CrewAI Flows for the controlled parts.
  - The task is a **single agent** → CrewAI's crew machinery is overhead; a plain loop or provider SDK is simpler.
  - You need **deep customization** the abstraction hides → a lower-level framework.

:::interview
"When would you pick CrewAI over LangGraph?"

When speed and approachability matter more than control. CrewAI lets you describe a team of role-based agents in a few intuitive lines — ideal for prototypes, team-shaped pipeline tasks, and teams new to agents. LangGraph is more verbose but gives explicit control, persistence, human-in-the-loop, and production reliability. Pick CrewAI to get a plausible multi-agent system fast; move to LangGraph (or CrewAI Flows for the critical paths) when it must be reliable, debuggable, and precisely controlled in production.
:::
