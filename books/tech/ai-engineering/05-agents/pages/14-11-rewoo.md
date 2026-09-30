## ReWOO: reasoning without observation

- **ReWOO** (Reasoning WithOut Observation, Xu et al., 2023) is plan-and-execute taken to an extreme to save tokens. It plans the *entire* chain up front — including how each step's output feeds the next — **without waiting** to observe results between planning steps.

<svg viewBox="0 0 360 108" role="img" aria-label="ReWOO plans all steps with variable placeholders, executes them, then solves once" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="100" height="76" rx="4" fill="#24405e"/><text x="60" y="30" text-anchor="middle" fill="#fff" font-size="6.5">Planner (once)</text><text x="18" y="44" fill="#cdd" font-size="5.5">#E1 = search[capital]</text><text x="18" y="56" fill="#cdd" font-size="5.5">#E2 = search[pop of #E1]</text><text x="18" y="68" fill="#cdd" font-size="5.5">#E3 = calc[#E2 × 2]</text><text x="18" y="82" fill="#cdd" font-size="5.5">uses #E-variables</text>
  <rect x="140" y="34" width="80" height="40" rx="4" fill="#a03050"/><text x="180" y="50" text-anchor="middle" fill="#fff" font-size="6.5">Worker</text><text x="180" y="62" text-anchor="middle" fill="#fc8" font-size="5.5">fills #E1,#E2,#E3</text>
  <rect x="250" y="34" width="100" height="40" rx="4" fill="#1a3a2a"/><text x="300" y="50" text-anchor="middle" fill="#fff" font-size="6.5">Solver (once)</text><text x="300" y="62" text-anchor="middle" fill="#cec" font-size="5.5">final answer</text>
  <path d="M110 54 L138 54" stroke="#888" marker-end="url(#rwo)"/><path d="M220 54 L248 54" stroke="#888" marker-end="url(#rwo)"/>
  <defs><marker id="rwo" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** the **Planner** writes all steps at once, using **variables** (`#E1`, `#E2`) as placeholders for results it does not have yet — "step 2 searches the population of `#E1`." The **Worker** executes each tool call, filling in the variables. The **Solver** reads the filled-in evidence once and produces the answer.
- **Why it saves so much:** in ReAct, the growing transcript (all thoughts + observations) is resent on *every* step — token cost balloons. ReWOO calls the big reasoning model only **twice** (plan, then solve); the Worker just runs tools. Far fewer tokens, lower latency.
- **The tradeoff:** it plans *blind*. Because it does not observe between steps, it cannot adapt mid-plan — if step 1's real result invalidates the plan, ReWOO cannot notice until the end. It shines when the task structure is predictable, and struggles when steps genuinely depend on surprises.

:::interview
**"How does ReWOO cut agent token cost versus ReAct?"** It decouples planning from observation. The Planner writes the entire tool chain up front using variables for not-yet-known results, a Worker executes the tools, and a Solver composes the answer — so the expensive reasoning model runs about twice instead of once per step, and the full transcript isn't resent each turn. The cost is adaptivity: ReWOO plans blind and can't course-correct mid-run, so it fits predictable multi-step tasks, not exploratory ones.
:::
