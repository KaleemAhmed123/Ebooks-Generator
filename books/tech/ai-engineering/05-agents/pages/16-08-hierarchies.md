## Hierarchies

- One supervisor over many workers hits a limit: a single coordinator cannot manage dozens of agents or a deeply nested task. **Hierarchies** solve this by nesting supervisors — supervisors of supervisors — so coordination scales like a company org chart.

<svg viewBox="0 0 360 100" role="img" aria-label="A top supervisor manages mid-level supervisors, each managing their own worker teams" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="150" y="10" width="60" height="16" rx="3" fill="#a03050"/><text x="180" y="21" text-anchor="middle" fill="#fff" font-size="6">CEO agent</text>
  <rect x="70" y="40" width="66" height="16" rx="3" fill="#c0607a"/><text x="103" y="51" text-anchor="middle" fill="#fff" font-size="5.5">team lead A</text>
  <rect x="224" y="40" width="66" height="16" rx="3" fill="#c0607a"/><text x="257" y="51" text-anchor="middle" fill="#fff" font-size="5.5">team lead B</text>
  <g fill="#6a9bd0"><rect x="40" y="74" width="40" height="14" rx="2"/><rect x="88" y="74" width="40" height="14" rx="2"/><rect x="200" y="74" width="40" height="14" rx="2"/><rect x="248" y="74" width="40" height="14" rx="2"/></g>
  <g stroke="#888"><path d="M172 26 L110 38"/><path d="M188 26 L250 38"/><path d="M96 56 L64 72"/><path d="M110 56 L112 72"/><path d="M250 56 L224 72"/><path d="M264 56 L266 72"/></g>
</svg>

- **The structure:** a top-level supervisor delegates broad goals to mid-level supervisors, each of which manages its own team of workers (or further sub-supervisors). Each level handles the *right granularity* — the top thinks in objectives, the middle in sub-tasks, the leaves in concrete actions. It is the HTN decomposition (14-16) staffed by agents at each level.
- **Why hierarchy helps at scale:** it bounds each agent's *span of control* — no single agent coordinates more than a handful of subordinates, keeping each coordination decision tractable. It matches naturally-hierarchical tasks (a big project → workstreams → tasks), and it isolates context per level (the top does not see leaf-level detail; leaves do not see the whole picture) — context economy (14-06) across the org.
- **The cost:** depth adds latency (a task passes through multiple levels) and dilution (intent can distort as it is decomposed down and results summarized up — the telephone-game risk). Keep hierarchies as *flat as the task allows*; deep hierarchies of LLM agents are expensive and lossy.

:::note
Hierarchies borrow directly from human organizations, and inherit both their strength and their pathology. Strength: they scale coordination beyond one manager's span of control by nesting it. Pathology: every layer adds latency, cost, and a chance for intent to distort going down and information to be lost coming up (the same "telephone game" that plagues large companies). The design skill is the same as org design — use the *fewest* layers that make each coordinator's job tractable, because each layer you add is a tax on the whole system.
:::
