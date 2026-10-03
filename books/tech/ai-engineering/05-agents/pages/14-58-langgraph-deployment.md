## LangGraph: deployment

- A compiled graph runs anywhere Python runs, but production agents need more: durable state in a real database, concurrency, scheduling, retries, and an API. The **LangGraph Platform / Server** provides this managed runtime; you can also self-host the pieces.

<svg viewBox="0 0 360 92" role="img" aria-label="A deployed graph gets a persistent store, task queue, API endpoints, and monitoring" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="22" rx="4" fill="#24405e"/><text x="180" y="24" text-anchor="middle" fill="#fff" font-size="6.5">your compiled graph</text>
  <rect x="14" y="52" width="76" height="28" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="52" y="64" text-anchor="middle" font-size="6">Postgres</text><text x="52" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">checkpoints+store</text>
  <rect x="98" y="52" width="76" height="28" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="136" y="64" text-anchor="middle" font-size="6">task queue</text><text x="136" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">long runs, retries</text>
  <rect x="182" y="52" width="76" height="28" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="220" y="64" text-anchor="middle" font-size="6">API + streaming</text>
  <rect x="266" y="52" width="80" height="28" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="306" y="64" text-anchor="middle" font-size="6">monitoring</text><text x="306" y="74" text-anchor="middle" font-size="5.5" fill="#6b6b6b">LangSmith</text>
  <path d="M180 32 L52 50" stroke="#888" marker-end="url(#dp)"/><path d="M180 32 L136 50" stroke="#888" marker-end="url(#dp)"/><path d="M180 32 L220 50" stroke="#888" marker-end="url(#dp)"/><path d="M180 32 L306 50" stroke="#888" marker-end="url(#dp)"/>
  <defs><marker id="dp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What production adds over `app.invoke()`:**
  - **Durable persistence** — swap `MemorySaver` for a **Postgres** checkpointer and Store so state survives restarts and scales across machines.
  - **Long-running execution** — agent runs can take minutes; a task queue runs them as background jobs with retries, so an HTTP request does not block on a 5-minute run (the durable-execution problem, Module 15).
  - **An API** — endpoints to start runs, stream results, resume from interrupts, and manage threads, so your frontend talks to the agent over HTTP.
  - **Observability** — integration with LangSmith (14-63) for tracing every run.
- **Self-host vs managed:** you can assemble these yourself (Postgres + a queue + your API) or use the managed platform. The graph code is identical either way — deployment is configuration, not a rewrite.

:::note
The deployment story reinforces why the checkpointer mattered from the start: it is the *same* abstraction from a laptop demo (`MemorySaver`) to production (Postgres). You develop against the in-memory saver and deploy against a durable one with a one-line change. Designing agents as persisted graphs from day one is what makes the jump to production configuration rather than a rebuild.
:::
