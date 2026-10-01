## Plan-and-execute

- ReAct decides one step at a time. **Plan-and-execute** flips that: the model writes the **whole plan first**, then executes the steps. A **planner** produces an ordered list of subtasks; an **executor** carries each out.

<svg viewBox="0 0 360 100" role="img" aria-label="A planner produces a step list that an executor runs one by one, re-planning if needed" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="30" width="70" height="30" rx="4" fill="#24405e"/><text x="49" y="48" text-anchor="middle" fill="#fff" font-size="6.5">planner</text>
  <rect x="120" y="16" width="120" height="58" rx="3" fill="#eef6fb" stroke="#24405e"/><text x="180" y="30" text-anchor="middle" font-size="6">plan:</text><text x="130" y="42" font-size="6">1. search capital</text><text x="130" y="54" font-size="6">2. search population</text><text x="130" y="66" font-size="6">3. multiply ×2</text>
  <rect x="278" y="30" width="70" height="30" rx="4" fill="#a03050"/><text x="313" y="48" text-anchor="middle" fill="#fff" font-size="6.5">executor</text>
  <path d="M84 45 L118 45" stroke="#888" marker-end="url(#pe)"/><path d="M240 45 L276 45" stroke="#888" marker-end="url(#pe)"/><path d="M313 60 Q313 90 49 86 L49 62" stroke="#bbb" fill="none" stroke-dasharray="3,2" marker-end="url(#pe)"/><text x="180" y="94" text-anchor="middle" font-size="5.5" fill="#6b6b6b">re-plan if a step fails or new info appears</text>
  <defs><marker id="pe" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why plan first:**
  - **Fewer expensive reasoning calls.** The planner reasons once over the whole task; the executor steps can use a smaller/cheaper model, since each step is now simple ("run search for X"). ReAct re-reasons the full context every step.
  - **Less drift.** A written plan is a spine that keeps a long task on-goal, where ReAct can wander.
  - **Visibility.** You can inspect (and gate) the plan before anything runs.
- **Re-planning.** Rigid plans break when reality differs. Good plan-and-execute agents **re-plan**: after executing steps, the planner reviews progress and revises the remaining plan. This blends plan-first structure with ReAct-like adaptivity.

:::interview
"ReAct vs plan-and-execute — when each?"

ReAct decides step-by-step, adapting to each observation — best for exploratory tasks where you can't plan ahead and the path is short. Plan-and-execute commits to a plan first, then runs it — best for multi-step tasks with a knowable structure, because it reasons once (cheaper), stays on-goal (less drift), and lets you inspect the plan. Long or complex → plan first, re-planning on failure; short/exploratory → ReAct.
:::
