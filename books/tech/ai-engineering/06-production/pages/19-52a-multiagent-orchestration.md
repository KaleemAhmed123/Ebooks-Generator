## Multi-agent: orchestration patterns

- The software team (Flagship 8) used a supervisor. There's a small vocabulary of **orchestration topologies** (Booklet 5), and choosing the right one for the task's structure is the multi-agent design decision.

<svg viewBox="0 0 360 92" role="img" aria-label="Four topologies: supervisor (hub), pipeline (chain), hierarchy (tree), and network (peer handoffs)" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <text x="45" y="14" text-anchor="middle" font-size="6" fill="#24405e">supervisor</text>
  <circle cx="45" cy="30" r="6" fill="#24405e"/><circle cx="25" cy="48" r="5" fill="#e8f4fd" stroke="#24405e"/><circle cx="45" cy="52" r="5" fill="#e8f4fd" stroke="#24405e"/><circle cx="65" cy="48" r="5" fill="#e8f4fd" stroke="#24405e"/>
  <path d="M45 36 L25 44 M45 36 L45 47 M45 36 L65 44" stroke="#888"/>
  <text x="135" y="14" text-anchor="middle" font-size="6" fill="#24405e">pipeline</text>
  <circle cx="110" cy="40" r="5" fill="#e8f4fd" stroke="#24405e"/><circle cx="135" cy="40" r="5" fill="#e8f4fd" stroke="#24405e"/><circle cx="160" cy="40" r="5" fill="#e8f4fd" stroke="#24405e"/><path d="M115 40 L130 40 M140 40 L155 40" stroke="#888" marker-end="url(#or)"/>
  <text x="225" y="14" text-anchor="middle" font-size="6" fill="#24405e">hierarchy</text>
  <circle cx="225" cy="26" r="5" fill="#24405e"/><circle cx="210" cy="44" r="4" fill="#e8f4fd" stroke="#24405e"/><circle cx="240" cy="44" r="4" fill="#e8f4fd" stroke="#24405e"/><circle cx="203" cy="58" r="3" fill="#eef3ee" stroke="#3b7a57"/><circle cx="217" cy="58" r="3" fill="#eef3ee" stroke="#3b7a57"/>
  <path d="M225 31 L210 40 M225 31 L240 40 M210 48 L203 55 M210 48 L217 55" stroke="#888"/>
  <text x="310" y="14" text-anchor="middle" font-size="6" fill="#24405e">network</text>
  <circle cx="295" cy="30" r="5" fill="#e8f4fd" stroke="#24405e"/><circle cx="325" cy="30" r="5" fill="#e8f4fd" stroke="#24405e"/><circle cx="310" cy="52" r="5" fill="#e8f4fd" stroke="#24405e"/>
  <path d="M300 30 L320 30 M297 35 L307 47 M323 35 L313 47" stroke="#888"/>
  <defs><marker id="or" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4 Z" fill="#888"/></marker></defs>
</svg>

- **Match topology to task shape.** *Supervisor* (hub-and-spoke) — a coordinator delegates to specialists and integrates; the default, good for most decomposable tasks. *Pipeline* — a fixed sequence (plan→code→test); when steps have a strict order. *Hierarchy* — supervisors of supervisors; for large tasks that decompose recursively. *Network* — peers hand off directly; flexible but harder to control and debug.
- **Prefer the most constrained topology that fits.** A pipeline is trivial to reason about and debug; a free-form network of agents handing off to each other is powerful but prone to loops, lost state, and the coordination failures of MAST (Flagship 8). The senior instinct is to use the *least* flexible structure the task allows — control and debuggability over cleverness.

:::interview
"How do you decide how to wire up a multi-agent system?"

Match the topology to the task's structure and prefer the most *constrained* one that fits. A **supervisor** (coordinator delegates to specialists) is the sensible default. A **pipeline** for strictly-ordered work (plan→implement→test) — trivial to debug. A **hierarchy** for large tasks that decompose recursively. A **network** of peer handoffs only when the task genuinely needs dynamic routing — it's the most flexible but the hardest to control, most prone to loops and lost state (MAST failures). The judgment that scores: not reaching for the fanciest orchestration, but choosing the *least* flexible structure that solves the problem, because control and debuggability matter more than elegance once it's running in production.
:::
