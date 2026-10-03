## Swarm intelligence

- **Swarm intelligence** is collective problem-solving by many *simple* agents following *local* rules, with no central control — inspired by ants, bees, and bird flocks. It solves hard optimization problems that no single simple agent could, and its algorithms are a distinct branch of multi-agent systems worth knowing.

<svg viewBox="0 0 360 90" role="img" aria-label="Simple agents following local rules produce complex global behavior like flocking or pathfinding" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#24405e"><path d="M40 40 l8 4 l-8 4 z"/><path d="M60 30 l8 4 l-8 4 z"/><path d="M55 55 l8 4 l-8 4 z"/><path d="M80 44 l8 4 l-8 4 z"/><path d="M72 60 l8 4 l-8 4 z"/><path d="M95 34 l8 4 l-8 4 z"/></g>
  <text x="70" y="82" text-anchor="middle" font-size="5.5" fill="#6b6b6b">local rules → flock</text>
  <text x="180" y="46" text-anchor="middle" font-size="7">→</text>
  <rect x="220" y="30" width="130" height="30" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="285" y="43" text-anchor="middle" font-size="6">emergent global</text><text x="285" y="53" text-anchor="middle" font-size="5.5" fill="#6b6b6b">optimization / coordination</text>
</svg>

- **The two classic algorithms:**
  - **PSO (Particle Swarm Optimization)** — a swarm of "particles" moves through a solution space, each pulled toward its *own* best-found position and the *swarm's* best-found position. The balance of individual exploration and collective exploitation converges the swarm on good solutions — an optimizer for continuous problems.
  - **ACO (Ant Colony Optimization)** — agents ("ants") explore paths and deposit virtual **pheromone** on good ones; pheromone evaporates over time, and stronger trails attract more ants. Good routes accumulate pheromone and get reinforced — excellent for combinatorial problems like routing and scheduling.
- **The unifying principle — stigmergy and local rules:** no agent has the global picture; each follows simple local rules and interacts through the environment (pheromone) or neighbors (flocking). Yet *coordinated global behavior emerges* — the Society-of-Mind idea (16-12) in its purest algorithmic form. Robustness is a bonus: with no central controller, losing agents does not break the swarm.
- **Relation to LLM agents:** classical swarm algorithms are usually *not* LLM-based, but their *principles* — local rules producing global coordination, stigmergy via a shared environment (16-06), robustness through decentralization — inform large decentralized LLM-agent designs.

:::note
Swarm intelligence is the counterpoint to the sophisticated-LLM-agent view: sometimes the best multi-agent design is *many dumb agents with simple local rules*, not a few smart ones with complex coordination. For the right problems — optimization, routing, large-scale decentralized tasks — emergence from simple local behavior is more robust and scalable than orchestrated intelligence. It is worth holding both models: orchestrate smart specialists (supervisor, 16-07) when the task needs reasoning and control; unleash a decentralized swarm when it needs scale, robustness, and emergent optimization.
:::
