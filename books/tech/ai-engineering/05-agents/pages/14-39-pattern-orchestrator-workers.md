## Pattern: orchestrator-workers

- **Orchestrator-workers** handles tasks whose subtasks are **not known in advance**. A central **orchestrator** LLM dynamically breaks the task into subtasks, delegates each to a **worker** LLM, and synthesizes their results. Unlike parallelization's fixed split, the orchestrator *decides* the split at runtime.

<svg viewBox="0 0 360 104" role="img" aria-label="An orchestrator dynamically spawns workers for discovered subtasks and synthesizes their outputs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="24" rx="4" fill="#24405e"/><text x="180" y="25" text-anchor="middle" fill="#fff" font-size="6.5">orchestrator</text>
  <rect x="30" y="52" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="65" y="65" text-anchor="middle" font-size="6">worker: file A</text>
  <rect x="145" y="52" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="65" text-anchor="middle" font-size="6">worker: file B</text>
  <rect x="260" y="52" width="70" height="20" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="295" y="65" text-anchor="middle" font-size="6">worker: file C</text>
  <rect x="120" y="84" width="120" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="96" text-anchor="middle" font-size="6">orchestrator synthesizes</text>
  <path d="M160 34 L70 50" stroke="#888" marker-end="url(#ow)"/><path d="M180 34 L180 50" stroke="#888" marker-end="url(#ow)"/><path d="M200 34 L292 50" stroke="#888" marker-end="url(#ow)"/>
  <path d="M70 72 L150 84" stroke="#bbb" marker-end="url(#ow)"/><path d="M180 72 L180 84" stroke="#bbb" marker-end="url(#ow)"/><path d="M292 72 L210 84" stroke="#bbb" marker-end="url(#ow)"/>
  <defs><marker id="ow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Example:** "implement this feature across the codebase." The orchestrator inspects the repo, decides *which* files need changes (unknown until it looks), spawns a worker per file, and merges their edits into a coherent change. The number and nature of workers depends on what it finds.
- **Why it is more than parallelization:** parallelization splits the task a *fixed, coded* way; orchestrator-workers lets the *model* determine the decomposition based on the input. That flexibility is why it edges toward "agent" — the orchestrator is exercising agency over structure.
- **The orchestrator is the key risk and cost.** It must decompose well and synthesize the workers' outputs into something coherent (not just concatenate). This is the root of most **multi-agent** systems (Module 16) — a supervisor coordinating specialized workers.

:::interview
"Parallelization vs orchestrator-workers — what's the real difference?"

Who decides the split. Parallelization uses a *fixed, pre-coded* decomposition (you always run the same N subtasks). Orchestrator-workers lets an LLM decide the decomposition *at runtime* based on the input — how many workers, doing what — then synthesizes their results. Use orchestrator-workers when you can't know the subtasks in advance (editing an unknown set of files, researching an open question); it's the bridge to true multi-agent systems.
:::
