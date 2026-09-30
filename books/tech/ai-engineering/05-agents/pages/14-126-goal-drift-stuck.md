## Goal drift and getting stuck

- Two trajectory failures that plague long runs: the agent **forgets what it was doing** (drift) or **spins without progress** (stuck).

<svg viewBox="0 0 360 88" role="img" aria-label="Goal drift wanders off the target; getting stuck loops in place" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">goal drift</text>
  <circle cx="30" cy="40" r="5" fill="#24405e"/><path d="M35 40 Q90 30 120 55 Q140 70 160 50" fill="none" stroke="#a03050" stroke-dasharray="3,2" marker-end="url(#dr)"/><circle cx="165" cy="48" r="6" fill="none" stroke="#1a3a2a"/><text x="165" y="64" text-anchor="middle" font-size="5">goal (missed)</text>
  <line x1="185" y1="8" x2="185" y2="80" stroke="#eee"/>
  <text x="275" y="12" text-anchor="middle" font-size="6.5" fill="#a03050">stuck / looping</text>
  <circle cx="275" cy="44" r="16" fill="none" stroke="#a03050" stroke-dasharray="3,2"/><path d="M291 44 A16 16 0 1 1 259 44" fill="none" stroke="#a03050" marker-end="url(#dr)"/><text x="275" y="47" text-anchor="middle" font-size="5">same action</text>
  <defs><marker id="dr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Goal drift** — over many steps, the agent loses sight of the original objective and wanders into a related-but-wrong task, or optimizes a sub-goal at the expense of the real one. Cause: the goal scrolls out of effective attention as the context grows (lost-in-the-middle, 14-21), or a tangent hijacks the reasoning. Fixes: **restate the goal** in context each turn (or in a persistent memory block, 14-23), keep a **plan** as a spine (14-10), and periodically check "am I still on the original task?"
- **Getting stuck** — the agent repeats the same failing action (calling `search("X")` that returns nothing, three times), or oscillates between two states, making no progress. Cause: it cannot find a path and lacks the self-awareness to change strategy. Fixes: a **loop guard** that detects repeated actions and forces a different approach (14-05), a **step budget** that triggers escalation, and prompting the agent to try an alternative when a step fails twice.
- Both are why a **plan** and **explicit progress tracking** matter: an agent that knows its goal and its progress is far less likely to drift or spin than one re-deriving everything each turn.

:::warn
Goal drift is insidious because the agent stays *fluent and confident* while wandering — it produces plausible work on the wrong task, so nothing looks broken until you check the output against the original goal. Long autonomous runs need an explicit anchor to the objective (a restated goal, a checklist, a plan) and a periodic self-check, or they quietly optimize the wrong thing for twenty steps and hand you a polished answer to a question you did not ask.
:::
