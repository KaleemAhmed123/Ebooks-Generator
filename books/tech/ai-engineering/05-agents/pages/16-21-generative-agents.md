## Generative agents and simulation

- A different use of multi-agent systems: not to *do a task*, but to *simulate a world*. **Generative agents** (Park et al., Stanford, 2023 — the "Smallville" study) populate a simulated environment with LLM-driven characters that remember, plan, and interact — producing believable emergent social behavior.

<svg viewBox="0 0 360 88" role="img" aria-label="Simulated agents with memory and planning interact in a world, producing emergent social behavior" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="16" width="150" height="56" rx="5" fill="#eef6fb" stroke="#24405e"/><text x="89" y="28" text-anchor="middle" font-size="6">simulated town</text>
  <circle cx="50" cy="48" r="10" fill="#6a9bd0"/><circle cx="90" cy="56" r="10" fill="#6a9bd0"/><circle cx="130" cy="46" r="10" fill="#6a9bd0"/>
  <g stroke="#888"><line x1="60" y1="48" x2="80" y2="54"/><line x1="100" y1="54" x2="120" y2="48"/></g>
  <rect x="200" y="20" width="150" height="48" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="275" y="33" text-anchor="middle" font-size="6">each agent has:</text><text x="275" y="45" text-anchor="middle" font-size="5.5" fill="#6b6b6b">memory · reflection · planning</text><text x="275" y="56" text-anchor="middle" font-size="5.5" fill="#6b6b6b">→ emergent: parties, gossip, routines</text>
</svg>

- **The architecture:** each character is an agent with a rich **memory stream** (episodic memory, 14-25), a **reflection** step that distills memories into higher-level insights (sleep-time consolidation, 14-24), and a **planning** step that turns goals into a daily schedule. Given these, characters go about lives — and *emergent* social phenomena appear that no one scripted: they spread news, form relationships, and even coordinated a Valentine's party from a single seeded idea.
- **Why it matters beyond a demo:**
  - **Believable NPCs** — for games and virtual worlds, agents that remember and act consistently are a real product.
  - **Social simulation** — model how behaviors, information, or policies spread through a population of agents — a research tool for the social sciences and for testing systems against realistic populations.
  - **A stress test of agent architecture** — it exercised memory, reflection, and planning (Module 14) at once, and its memory design influenced the whole field.
- **The lesson for builders:** the memory-reflection-planning loop that made these agents believable is the *same* architecture that makes *task* agents capable. Simulation and task-doing are two applications of one agent design.

:::note
Generative agents show multi-agent systems as a *modeling* tool, not just a task-execution tool — a way to simulate societies, markets, or crowds made of believable individuals. This matters for the societal-risk questions of 15-37 (you can simulate how agent populations behave before deploying them) and for any system that must model human-like collective behavior. And its influence runs backward too: the memory architecture built to make simulated people believable became foundational to making *task* agents remember — a reminder that the components of an agent (Module 14) are general, whatever you point them at.
:::
