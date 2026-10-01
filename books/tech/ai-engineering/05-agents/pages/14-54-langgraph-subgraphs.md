## LangGraph: subgraphs

- A **subgraph** is a graph used as a **node** inside another graph. It is how you compose complex agents from smaller, self-contained ones — the modularity that keeps large systems maintainable. **[VERIFY current API]**

<svg viewBox="0 0 360 96" role="img" aria-label="A parent graph whose research node is itself a full subgraph of nodes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="30" width="60" height="24" rx="3" fill="#24405e"/><text x="38" y="45" text-anchor="middle" fill="#fff" font-size="6">plan</text>
  <rect x="150" y="14" width="150" height="66" rx="5" fill="#eef6fb" stroke="#24405e" stroke-dasharray="3,2"/><text x="225" y="26" text-anchor="middle" font-size="6" fill="#24405e">"research" node = a subgraph</text>
  <circle cx="180" cy="52" r="12" fill="#6a9bd0"/><text x="180" y="55" text-anchor="middle" fill="#fff" font-size="5.5">search</text>
  <circle cx="235" cy="52" r="12" fill="#6a9bd0"/><text x="235" y="55" text-anchor="middle" fill="#fff" font-size="5.5">read</text>
  <circle cx="285" cy="52" r="12" fill="#6a9bd0"/><text x="285" y="55" text-anchor="middle" fill="#fff" font-size="5.5">sum</text>
  <path d="M192 52 L222 52" stroke="#888" marker-end="url(#sg)"/><path d="M247 52 L272 52" stroke="#888" marker-end="url(#sg)"/>
  <path d="M68 42 L148 46" stroke="#888" marker-end="url(#sg)"/>
  <rect x="8" y="66" width="60" height="20" rx="3" fill="#1a3a2a"/><text x="38" y="79" text-anchor="middle" fill="#fff" font-size="6">report</text>
  <path d="M150 60 Q90 70 68 74" stroke="#888" fill="none" marker-end="url(#sg)"/>
  <defs><marker id="sg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why compose:** a big agent as one flat graph of 30 nodes is unreadable and untestable. Break it into subgraphs — a "research" subgraph (search → read → summarize), a "write" subgraph, a "review" subgraph — and the parent graph becomes a clean high-level flow. Each subgraph is developed, tested, and reused on its own.
- **State sharing.** A subgraph has its own state schema; LangGraph maps the relevant fields between parent and subgraph state at the boundary. This isolation means a subgraph does not need to know the parent's whole state — it declares what it consumes and produces.
- **Reuse.** The same subgraph (a "web-research" module, say) can be dropped into many agents, like a function. Composition here is the same discipline as functions in code: small, tested, reusable units assembled into larger ones.

:::interview
"How do you keep a large LangGraph agent maintainable?"

Subgraphs. Decompose the agent into self-contained sub-flows — research, write, review — each its own compiled graph with its own state schema, and use each as a single node in the parent graph. You get readability (the parent shows the high-level flow), testability (each subgraph tested in isolation), and reuse (drop a subgraph into multiple agents). It's the function-decomposition discipline applied to agent control flow, and it's how multi-agent systems are structured in LangGraph.
:::
