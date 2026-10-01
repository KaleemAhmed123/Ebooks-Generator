## Name the common agentic workflow patterns and when each fits.

- **Prompt chaining** — split a task into sequential LLM steps, each feeding the next (draft → critique → polish). Use when the task has clear stages; add a gate between steps to catch errors.
- **Routing** — a classifier LLM sends the input to a specialised handler/prompt/model. Use for distinct input categories (billing vs technical support) so each gets a tuned path.
- **Parallelization** — run subtasks concurrently and aggregate. Two flavours: **sectioning** (independent parts) and **voting** (same task several times, take consensus). Use for speed or to raise reliability via multiple attempts.
- **Orchestrator-workers** — a central LLM dynamically breaks a task into subtasks, dispatches them to worker LLMs, and synthesises results. Use when subtasks aren't known in advance (e.g. search across many sources).
- **Evaluator-optimizer** — one LLM generates, another critiques against criteria, loop until it passes. Use when you have clear quality criteria and iteration helps (translation, code).

<svg viewBox="0 0 250 56" role="img" aria-label="Orchestrator splits work to parallel workers, then synthesizes their results" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="96" y="6" width="58" height="14" rx="2" fill="#24405e"/><text x="125" y="16" text-anchor="middle" fill="#fff">orchestrator</text>
  <rect x="20" y="36" width="40" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="40" y="46" text-anchor="middle">worker</text>
  <rect x="105" y="36" width="40" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="125" y="46" text-anchor="middle">worker</text>
  <rect x="190" y="36" width="40" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="210" y="46" text-anchor="middle">worker</text>
  <path d="M110 20 L45 34" stroke="#1a1a1a" marker-end="url(#wp)"/><path d="M125 20 L125 34" stroke="#1a1a1a" marker-end="url(#wp)"/><path d="M140 20 L205 34" stroke="#1a1a1a" marker-end="url(#wp)"/>
  <defs><marker id="wp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

:::interview
What's really being tested: that you can name chaining/routing/parallelization/orchestrator-workers/evaluator-optimizer and match each to a task shape — the vocabulary of practical agent design.
:::
