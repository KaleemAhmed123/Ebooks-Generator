## Case study: deep research systems

- The multi-agent success story of 2025–2026 is **deep research** — systems that autonomously research a question across many sources and produce a thorough report. Several labs shipped these, and they are the clearest example of multi-agent done *right*, so they repay study. **[VERIFY specifics]**

<svg viewBox="0 0 360 96" role="img" aria-label="A lead research agent spawns parallel sub-researchers for sub-questions, then synthesizes a report" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="20" rx="4" fill="#a03050"/><text x="180" y="23" text-anchor="middle" fill="#fff">lead researcher</text>
  <g fill="#6a9bd0"><rect x="14" y="46" width="70" height="18" rx="2"/><rect x="98" y="46" width="70" height="18" rx="2"/><rect x="192" y="46" width="70" height="18" rx="2"/><rect x="276" y="46" width="70" height="18" rx="2"/></g>
  <text x="49" y="58" text-anchor="middle" fill="#fff" font-size="5">sub-Q 1</text><text x="133" y="58" text-anchor="middle" fill="#fff" font-size="5">sub-Q 2</text><text x="227" y="58" text-anchor="middle" fill="#fff" font-size="5">sub-Q 3</text><text x="311" y="58" text-anchor="middle" fill="#fff" font-size="5">sub-Q 4</text>
  <rect x="120" y="76" width="120" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="180" y="88" text-anchor="middle">synthesize → report</text>
  <g stroke="#888"><path d="M150 30 L49 44" marker-end="url(#dr2)"/><path d="M165 30 L133 44" marker-end="url(#dr2)"/><path d="M195 30 L227 44" marker-end="url(#dr2)"/><path d="M210 30 L311 44" marker-end="url(#dr2)"/></g>
  <defs><marker id="dr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The architecture:** a **lead agent** decomposes the research question into sub-questions, spawns a **sub-researcher agent per sub-question** (each searching, reading, and summarizing independently — parallel map, 16-15), collects their findings, identifies gaps (spawning more sub-researchers if needed), and **synthesizes** a cited report. It is the supervisor pattern (16-07) with parallel specialist workers.
- **Why multi-agent genuinely wins here** — it hits *all four* benefits (16-01):
  - **Parallelism** — sub-questions research concurrently, so a report covering 10 angles finishes in the time of one, not ten.
  - **Context isolation** — each sub-researcher has its *own* window for its sub-topic's sources (14-87); the lead's context is not flooded with raw pages, only distilled findings.
  - **Specialization** — sub-researchers focus on one angle and go deep; the lead focuses on decomposition and synthesis.
  - **Robustness** — breadth of independent searches surfaces more than one agent's single search path.
- **Reported result:** multi-agent research systems substantially outperformed single-agent ones on breadth-heavy research tasks — because research *is* parallelizable and context-heavy, exactly the profile where multi-agent pays.

:::note
Deep research is the archetype of a task *genuinely suited* to multi-agent: it decomposes into independent parallel sub-tasks, each needs its own large context, and breadth benefits from many perspectives. That is *why* it works where many multi-agent systems do not (16-42) — the task structure matches the pattern's strengths. The lesson generalizes: multi-agent wins when the task is *natively parallel, context-heavy, and breadth-rewarding*. Match the pattern to that profile and it shines; force it onto a sequential, narrow task and it just adds cost.
:::
