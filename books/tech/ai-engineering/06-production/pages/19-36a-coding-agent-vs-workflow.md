## Coding agent: agent or workflow?

- Before building an *agent* (Flagship 4), ask whether you need one. Booklet 5's distinction is a production decision with real cost implications: an **agent** decides its own steps dynamically; a **workflow** runs a fixed, predetermined sequence. Many "agent" tasks are workflows in disguise.

<svg viewBox="0 0 360 78" role="img" aria-label="Workflow: fixed known steps. Agent: dynamic steps decided at runtime. Choose by whether the path is knowable in advance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">workflow (path known)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="20" y="20" width="30" height="14" rx="2"/><rect x="66" y="20" width="30" height="14" rx="2"/><rect x="112" y="20" width="30" height="14" rx="2"/></g>
  <path d="M50 27 L64 27 M96 27 L110 27" stroke="#888" marker-end="url(#aw)"/>
  <text x="90" y="52" text-anchor="middle" font-size="6.5" fill="#a03050">agent (path decided at runtime)</text>
  <circle cx="40" cy="66" r="6" fill="#fdeef2" stroke="#a03050"/><circle cx="90" cy="60" r="6" fill="#fdeef2" stroke="#a03050"/><circle cx="90" cy="74" r="6" fill="#fdeef2" stroke="#a03050"/><circle cx="140" cy="66" r="6" fill="#fdeef2" stroke="#a03050"/>
  <path d="M46 66 L84 61 M46 66 L84 73 M96 60 L134 65 M96 74 L134 67" stroke="#888"/>
  <defs><marker id="aw" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Prefer a workflow when the path is knowable** (Booklet 5's Anthropic patterns). "Summarize then translate then format" is a fixed pipeline — hard-code it. Workflows are cheaper (no per-step planning calls), faster, more predictable, and easier to debug and test. You reach for an agent only when the steps *genuinely can't be known in advance*.
- **Agents cost more and fail more.** Each planning step is an LLM call (latency + cost), and dynamic control flow means more ways to loop, err, or be hijacked (Module 18). So the decision is economic and reliability-driven: use the least-agentic structure that solves the problem — a workflow if the path is fixed, an agent only where genuine runtime decisions are unavoidable.

:::interview
"Everyone's building agents — when should you *not*?"

When the task's path is knowable in advance, which is more often than the hype suggests. If the steps are fixed ("extract → validate → route", "summarize → translate → format"), build a **workflow** — hard-coded control flow with LLM calls at the steps — because it's cheaper (no per-step planning calls), faster, predictable, and testable. Reserve **agents** for tasks where the steps *genuinely can't be predetermined* (debugging an unknown failure, open-ended research), because dynamic planning costs an LLM call per step and multiplies the failure and attack surface (loops, hijacking). The senior instinct is to use the *least*-agentic structure that solves the problem — many production "agents" are workflows that would be cheaper and more reliable if built as such. Choosing workflow-vs-agent by "is the path knowable?" is the answer.
:::
