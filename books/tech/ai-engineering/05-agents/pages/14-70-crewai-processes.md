## CrewAI: processes

- A **process** governs how a crew's tasks run. CrewAI offers two, and the choice changes the whole coordination model. **[VERIFY current API]**

<svg viewBox="0 0 360 100" role="img" aria-label="Sequential process runs tasks in order; hierarchical process uses a manager to delegate" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">sequential</text>
  <rect x="14" y="20" width="48" height="18" rx="3" fill="#24405e"/><text x="38" y="32" text-anchor="middle" fill="#fff">task 1</text>
  <rect x="70" y="20" width="48" height="18" rx="3" fill="#24405e"/><text x="94" y="32" text-anchor="middle" fill="#fff">task 2</text>
  <rect x="126" y="20" width="48" height="18" rx="3" fill="#24405e"/><text x="150" y="32" text-anchor="middle" fill="#fff">task 3</text>
  <path d="M62 29 L69 29" stroke="#888" marker-end="url(#cp2)"/><path d="M118 29 L125 29" stroke="#888" marker-end="url(#cp2)"/>
  <line x1="190" y1="10" x2="190" y2="94" stroke="#eee"/>
  <text x="275" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">hierarchical</text>
  <rect x="248" y="18" width="54" height="18" rx="3" fill="#a03050"/><text x="275" y="30" text-anchor="middle" fill="#fff">manager</text>
  <rect x="212" y="56" width="48" height="18" rx="3" fill="#6a9bd0"/><text x="236" y="68" text-anchor="middle" fill="#fff">worker</text>
  <rect x="290" y="56" width="48" height="18" rx="3" fill="#6a9bd0"/><text x="314" y="68" text-anchor="middle" fill="#fff">worker</text>
  <path d="M266 36 L240 54" stroke="#888" marker-end="url(#cp2)"/><path d="M284 36 L312 54" stroke="#888" marker-end="url(#cp2)"/>
  <defs><marker id="cp2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Sequential** — tasks run in the order you listed them, each task's output available as **context** to the next. The researcher's findings flow to the writer, whose draft flows to the editor. Predictable, easy to reason about — the default, and right for pipeline-shaped work.
- **Hierarchical** — CrewAI adds a **manager** agent that decides which agent handles what, delegates tasks, and reviews results (the supervisor topology, 14-42). More flexible for tasks where the decomposition is not a fixed line, at the cost of the manager being an extra point of failure and cost.
- **The choice mirrors workflow-vs-agent (14-02):** sequential is a fixed pipeline (predictable, cheap); hierarchical hands control to a manager LLM (flexible, less predictable). Prefer sequential unless the task genuinely needs dynamic delegation.

:::interview
"Sequential vs hierarchical process in CrewAI?"

Sequential runs tasks in a fixed order, piping each output as context to the next — predictable and cheap, ideal for pipeline work. Hierarchical introduces a manager agent that dynamically delegates tasks to workers and reviews their output — flexible for tasks whose breakdown isn't a straight line, but the manager adds cost and a failure point. It's the workflow-vs-agent tradeoff inside CrewAI: default to sequential, use hierarchical only when you truly need dynamic delegation.
:::
