## Agentic failure modes: the taxonomy

- Agents fail in ways single LLM calls do not, because they take *many* steps with *real* actions. Knowing the failure taxonomy is how you design against it — and exactly what interviewers probe, because it separates people who have run agents from people who have read about them.

<svg viewBox="0 0 360 104" role="img" aria-label="Six agentic failure modes grouped by trajectory, action, and resource problems" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">error compounding</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">goal drift</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">getting stuck / loops</text>
  <rect x="10" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="61" text-anchor="middle">hallucinated actions</text>
  <rect x="126" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="61" text-anchor="middle">over-action</text>
  <rect x="242" y="46" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="61" text-anchor="middle">cost / loop runaway</text>
  <rect x="70" y="78" width="220" height="20" rx="4" fill="#eef6fb" stroke="#24405e"/><text x="180" y="91" text-anchor="middle" font-size="6.5">plus: prompt injection (its own cluster)</text>
</svg>

- **The pattern behind them all: small errors, real actions, many steps.** A single wrong step in a chatbot is one bad message; a single wrong step in an agent can *act* on the world and *derail every step after it*. Agents amplify small failures into large ones because they compound and because they have hands.
- **The categories:**
  - **Trajectory failures** — error compounding, goal drift, getting stuck (next pages). The *path* goes wrong.
  - **Action failures** — hallucinated actions, over-action. The agent *does* the wrong thing.
  - **Resource failures** — runaway cost/loops (14-05). The agent consumes without progress.
  - **Adversarial failures** — prompt injection (next cluster). Someone *makes* it go wrong.

:::note
Reliability is *the* unsolved problem of agents. A model that is 95% reliable per step is only ~36% reliable over a 20-step task (0.95²⁰) — the compounding math (next page) that makes long-horizon agents so hard. Every technique in this cluster and the frameworks' persistence/checkpointing features exist to fight this. Treat an agent's reliability as something you engineer and measure, never something you assume from a good demo.
:::
