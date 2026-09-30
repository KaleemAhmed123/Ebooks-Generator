## AutoGen: the actor model

- **AutoGen** (Microsoft) models a system as **conversing agents**. Where LangGraph draws a graph of steps, AutoGen sets up autonomous agents that **talk to each other** to solve a task — the abstraction is a conversation, not a control-flow diagram. **[VERIFY version — v0.4+ rewrite]**
- Its foundation is the **actor model**: independent units (agents) that hold their own state and communicate *only* by **asynchronous messages** — no shared memory. Each agent processes messages and sends messages; the system's behavior emerges from the exchange.

<svg viewBox="0 0 360 92" role="img" aria-label="Independent agents exchange asynchronous messages with no shared memory" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <circle cx="70" cy="46" r="24" fill="#24405e"/><text x="70" y="44" text-anchor="middle" fill="#fff" font-size="6.5">agent A</text><text x="70" y="54" text-anchor="middle" fill="#cdd" font-size="5">own state</text>
  <circle cx="230" cy="46" r="24" fill="#6a9bd0"/><text x="230" y="44" text-anchor="middle" fill="#fff" font-size="6.5">agent B</text><text x="230" y="54" text-anchor="middle" fill="#eef" font-size="5">own state</text>
  <path d="M96 40 L204 40" stroke="#888" marker-end="url(#ag)"/><text x="150" y="34" text-anchor="middle" font-size="6">message →</text>
  <path d="M204 54 L96 54" stroke="#888" marker-end="url(#ag)"/><text x="150" y="68" text-anchor="middle" font-size="6">← reply</text>
  <text x="315" y="48" text-anchor="middle" font-size="6" fill="#6b6b6b">no shared memory</text>
  <defs><marker id="ag" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why the actor model fits multi-agent:** agents are naturally independent — each has its own role, tools, and context. Message-passing (no shared state) means agents can run concurrently, on different machines, and be added or removed without rewiring a central graph. It is the concurrency model built for many independent, communicating units.
- **The v0.4 rewrite** (2024) rebuilt AutoGen around this async, event-driven actor core for scalability and robustness, layering an easier **AgentChat** API on top for common patterns (next pages). **[VERIFY]**

:::note
The framing contrast to hold: **LangGraph is control-flow-first** (you design the graph of steps), **AutoGen is conversation-first** (you design agents and let them talk). Neither is universally better — graph-first gives tight control and reliability; conversation-first gives flexible, emergent multi-agent behavior that is faster to set up for research and exploration. The best choice depends on whether you want to *engineer* the flow or *cultivate* it.
:::
