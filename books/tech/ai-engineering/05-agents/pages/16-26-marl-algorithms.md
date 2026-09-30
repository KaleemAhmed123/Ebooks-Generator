## MARL algorithms

- Three CTDE algorithms (16-25) are the names to know — each extends a single-agent RL method (Booklet 4) to the multi-agent case. You do not need to implement them, but you should recognize what each does. **[VERIFY]**

| Algorithm | Extends | Idea |
|---|---|---|
| **MADDPG** | DDPG (actor-critic) | Each agent has an actor (local) + a centralized critic that sees all agents |
| **QMIX** | Q-learning (value) | Combines per-agent Q-values into a team value, monotonically |
| **MAPPO** | PPO (policy gradient) | PPO with a centralized value function; simple and strong |

<svg viewBox="0 0 360 72" role="img" aria-label="Per-agent policies trained against a centralized value estimate that mixes individual contributions" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#24405e"><rect x="14" y="24" width="50" height="18" rx="2"/><rect x="14" y="46" width="50" height="18" rx="2"/></g><text x="39" y="36" text-anchor="middle" fill="#fff" font-size="5.5">agent Q₁</text><text x="39" y="58" text-anchor="middle" fill="#fff" font-size="5.5">agent Q₂</text>
  <rect x="130" y="34" width="90" height="24" rx="3" fill="#a03050"/><text x="175" y="49" text-anchor="middle" fill="#fff" font-size="6">mixing / central critic</text>
  <rect x="270" y="36" width="80" height="20" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="310" y="49" text-anchor="middle" font-size="6">team value</text>
  <g stroke="#888"><path d="M64 34 L128 42" marker-end="url(#mal)"/><path d="M64 55 L128 50" marker-end="url(#mal)"/><path d="M220 46 L268 46" marker-end="url(#mal)"/></g>
  <defs><marker id="mal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **MADDPG** (Multi-Agent DDPG) — each agent has its own **actor** (policy, on local obs) and a **centralized critic** during training that sees all agents' observations and actions. Handles mixed cooperative/competitive settings. The archetypal CTDE actor-critic method.
- **QMIX** — for *cooperative* teams. Each agent learns its own Q-value; a **mixing network** combines them into a joint team Q-value, constrained so that improving an agent's individual value improves the team value (monotonicity). This makes decentralized execution consistent with the team objective — a clean answer to credit assignment.
- **MAPPO** (Multi-Agent PPO) — just PPO (Booklet 4's workhorse) with a centralized value function. Despite its simplicity, it is *strong* and often the recommended baseline — the "boringly effective" choice, mirroring PPO's role in single-agent RL.
- **The pattern across all three:** decentralized policies/actors (local, for execution) + centralized value/critic (global, for training) = CTDE. They differ in *how* they centralize the value and *which* single-agent method they extend.

:::note
The MARL landscape mirrors single-agent RL (Booklet 4): value-based (QMIX ← Q-learning), actor-critic (MADDPG ← DDPG), policy-gradient (MAPPO ← PPO), each with a centralized training signal. For an engineer the practical knowledge is *recognition* — these are the standard methods, all use CTDE, MAPPO is a strong default — not implementation. MARL is mostly a research/robotics/game-AI domain; most LLM multi-agent systems do not train with it at all.
:::
