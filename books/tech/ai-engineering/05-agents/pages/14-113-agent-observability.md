## Agent observability

- You cannot improve an agent you cannot see. **Observability** — capturing every model call, tool call, and decision of every run — is how agents move from "works in the demo" to "reliable in production." The dedicated tools are **LangSmith** and **Langfuse**. **[VERIFY current products]**

<svg viewBox="0 0 360 88" role="img" aria-label="An observability platform ingests traces from agent runs and shows debugging, cost, and quality views" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="34" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="49" y="46" text-anchor="middle" font-size="6">agent runs</text><text x="49" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">emit traces</text>
  <rect x="120" y="30" width="90" height="32" rx="4" fill="#24405e"/><text x="165" y="44" text-anchor="middle" fill="#fff" font-size="6.5">LangSmith /</text><text x="165" y="55" text-anchor="middle" fill="#fff" font-size="6.5">Langfuse</text>
  <rect x="246" y="18" width="100" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="30" text-anchor="middle" font-size="6">debug traces</text>
  <rect x="246" y="40" width="100" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="52" text-anchor="middle" font-size="6">cost + latency</text>
  <rect x="246" y="62" width="100" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="74" text-anchor="middle" font-size="6">quality / evals</text>
  <path d="M84 46 L118 46" stroke="#888" marker-end="url(#ob)"/><path d="M210 42 L244 28" stroke="#888" marker-end="url(#ob)"/><path d="M210 46 L244 48" stroke="#888" marker-end="url(#ob)"/><path d="M210 50 L244 68" stroke="#888" marker-end="url(#ob)"/>
  <defs><marker id="ob" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What they do:** ingest **traces** (13-43) from your agent — each run a tree of spans for model and tool calls — and give you a UI to inspect them, plus dashboards for cost, latency, and quality, and hooks to run evaluations. It is the tracing of 13-44 as a product, tuned for LLM apps.
- **LangSmith** (LangChain) integrates tightly with LangChain/LangGraph but works with any framework; **Langfuse** is open-source and framework-agnostic. Both speak OpenTelemetry-style tracing (13-43) underneath, so you instrument once and view in either. Choose on open-source preference, existing stack, and features. **[VERIFY]**
- **Why dedicated tools over generic logging:** LLM traces have special structure — prompts, completions, token counts, tool calls, nested agent steps — that these tools understand and render natively (13-44). Generic logs bury the story; a purpose-built trace view surfaces it.

:::note
Observability is non-negotiable for production agents, not a nice-to-have. Agents are non-deterministic and multi-step; when one gives a wrong answer, a trace is the only way to find *where* — bad tool arguments, a wrong tool result, or a model misread. Instrument from day one. The cheapest time to add tracing is before you need it; the most expensive is at 2 a.m. debugging a production failure with no visibility into what the agent did.
:::
