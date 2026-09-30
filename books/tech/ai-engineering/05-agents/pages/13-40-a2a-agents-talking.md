## A2A: agents talking to agents

- MCP connects an agent to **tools**. **A2A (Agent2Agent)** connects an agent to **other agents** — a standard for agents built by different teams or companies to discover each other and delegate work. Announced 2025 (Google, then broadly adopted). **[VERIFY status/governance]**
- The difference in one line: MCP treats the other side as a *tool you call*; A2A treats it as a *peer you delegate a task to* — an autonomous agent that may take time, ask clarifying questions, and stream progress back.

<svg viewBox="0 0 360 92" role="img" aria-label="MCP connects an agent to tools; A2A connects an agent to peer agents" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">MCP: agent → tools</text>
  <circle cx="50" cy="46" r="16" fill="#24405e"/><text x="50" y="49" text-anchor="middle" fill="#fff" font-size="6">agent</text>
  <rect x="100" y="30" width="40" height="14" rx="2" fill="#fdeef2" stroke="#a03050"/><rect x="100" y="50" width="40" height="14" rx="2" fill="#fdeef2" stroke="#a03050"/>
  <path d="M66 42 L98 38" stroke="#888" marker-end="url(#a2)"/><path d="M66 50 L98 56" stroke="#888" marker-end="url(#a2)"/>
  <line x1="185" y1="12" x2="185" y2="80" stroke="#eee"/>
  <text x="280" y="14" text-anchor="middle" font-size="6.5" fill="#1a3a2a">A2A: agent ⇄ agent</text>
  <circle cx="235" cy="46" r="16" fill="#24405e"/><text x="235" y="49" text-anchor="middle" fill="#fff" font-size="6">agent</text>
  <circle cx="325" cy="46" r="16" fill="#1a3a2a"/><text x="325" y="49" text-anchor="middle" fill="#fff" font-size="6">agent</text>
  <path d="M251 42 L309 42" stroke="#888" marker-end="url(#a2)"/><path d="M309 50 L251 50" stroke="#888" marker-end="url(#a2)"/>
  <defs><marker id="a2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why a separate protocol:** delegating to a peer agent needs things tool-calling lacks — the peer keeps its *own* internal state and tools (opaque to you), a task may run long and asynchronously, and the two agents may need to negotiate or exchange rich artifacts (files, structured results), across organizational and trust boundaries.
- A2A and MCP are **complementary**, not competing: an agent uses MCP to reach its tools and A2A to reach other agents. A "travel agent" might call flight/hotel MCP tools *and* delegate visa questions to a specialist agent over A2A.

:::note
The mental split: **MCP is vertical** (an agent reaching down to its tools and data), **A2A is horizontal** (agents reaching across to peers). Multi-agent systems (Module 16) are the payoff — A2A is the wire standard that lets independently-built agents form one system without hard-coding each other's internals.
:::
