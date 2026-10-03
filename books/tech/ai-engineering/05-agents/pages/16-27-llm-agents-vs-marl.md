## LLM agents vs MARL

- A crucial clarification, because the two are easily conflated: most **LLM multi-agent systems** (Modules 14–16) are *not* MARL. They coordinate *pretrained* language models through prompting and orchestration; MARL *trains* agents' policies from scratch through reward. Different tools for different problems.

<svg viewBox="0 0 360 92" role="img" aria-label="LLM multi-agent systems orchestrate pretrained models; MARL trains policies via reward" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="66" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="92" y="30" text-anchor="middle" font-size="6.5">LLM multi-agent</text><text x="92" y="44" text-anchor="middle" font-size="6">pretrained models</text><text x="92" y="55" text-anchor="middle" font-size="6">coordinated by prompting</text><text x="92" y="66" text-anchor="middle" font-size="6">no training loop</text><text x="92" y="77" text-anchor="middle" font-size="5.5" fill="#6b6b6b">this booklet</text>
  <rect x="185" y="16" width="165" height="66" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5">MARL</text><text x="267" y="44" text-anchor="middle" font-size="6">policies trained from</text><text x="267" y="55" text-anchor="middle" font-size="6">scratch via reward</text><text x="267" y="66" text-anchor="middle" font-size="6">CTDE, many episodes</text><text x="267" y="77" text-anchor="middle" font-size="5.5" fill="#6b6b6b">games / robotics</text>
</svg>

- **LLM multi-agent systems** take *already-capable* language models and get them to cooperate through **orchestration** — prompts, roles, communication protocols, supervisors (this whole module). No reward, no training loop; the intelligence is pretrained, and you engineer the *coordination*. This is what you build as an AI engineer.
- **MARL** starts with *blank* policies and *trains* them to coordinate by trial and error against a reward, over millions of episodes (16-24). The intelligence and the coordination are *learned*. This is the domain of game AI (StarCraft, Dota), multi-robot systems, and control — specialized research and engineering, not typical LLM app work.
- **Why it matters:** NPCs, a research team, a coding swarm → LLM orchestration (fast, uses existing models). A drone fleet learning formation flight, or mastering a competitive game → MARL (learns behaviors no one can hand-specify, but needs a simulator and huge training).
- **Convergence:** RL increasingly *trains* LLM agents (Booklet 4's RL-for-reasoning), so the line is blurring — but as of 2026 the two remain distinct disciplines, and conflating them in an interview is a red flag.

:::interview
"Is an LLM multi-agent system the same as multi-agent RL?"

No — and conflating them is a common mistake. An LLM multi-agent system orchestrates *pretrained* language models through prompting, roles, and communication protocols; there's no training loop, you engineer the *coordination* and the intelligence comes pre-baked. MARL *trains* agents' policies from scratch via reward over millions of episodes (using CTDE), learning both the behavior and the coordination — it's the domain of game AI and multi-robot control, needing a simulator and heavy compute. Different tools: LLM orchestration for research teams, coding swarms, NPCs; MARL for drone fleets or mastering competitive games. The line is blurring as RL trains LLM agents, but they remain distinct as of 2026.
:::
