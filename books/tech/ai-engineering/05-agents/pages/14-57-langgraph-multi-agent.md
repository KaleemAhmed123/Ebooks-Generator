## LangGraph: multi-agent

- Multiple agents in LangGraph are just **nodes (or subgraphs) that are themselves agents**, wired by edges. The graph *is* the orchestration — no separate multi-agent framework needed. Two common shapes. **[VERIFY current API]**

<svg viewBox="0 0 360 96" role="img" aria-label="Supervisor topology routes to worker agents; network topology lets agents hand off to each other" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">supervisor</text>
  <circle cx="90" cy="30" r="12" fill="#24405e"/><text x="90" y="33" text-anchor="middle" fill="#fff" font-size="5.5">sup</text>
  <circle cx="45" cy="66" r="11" fill="#6a9bd0"/><text x="45" y="69" text-anchor="middle" fill="#fff" font-size="5">code</text>
  <circle cx="90" cy="66" r="11" fill="#6a9bd0"/><text x="90" y="69" text-anchor="middle" fill="#fff" font-size="5">math</text>
  <circle cx="135" cy="66" r="11" fill="#6a9bd0"/><text x="135" y="69" text-anchor="middle" fill="#fff" font-size="5">web</text>
  <g stroke="#888"><line x1="82" y1="40" x2="52" y2="58"/><line x1="90" y1="42" x2="90" y2="55"/><line x1="98" y1="40" x2="128" y2="58"/></g>
  <line x1="185" y1="8" x2="185" y2="88" stroke="#eee"/>
  <text x="275" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">network (handoffs)</text>
  <circle cx="240" cy="40" r="12" fill="#24405e"/><circle cx="310" cy="40" r="12" fill="#24405e"/><circle cx="275" cy="72" r="12" fill="#24405e"/>
  <g stroke="#888"><line x1="252" y1="40" x2="298" y2="40"/><line x1="245" y1="51" x2="268" y2="63"/><line x1="305" y1="51" x2="282" y2="63"/></g>
</svg>

- **Supervisor topology.** A supervisor node routes each step to a specialized worker agent (code, math, web-research) and synthesizes their results — the orchestrator-workers pattern (14-39) as a graph. A conditional edge from the supervisor picks the next worker based on state.
- **Network / handoff topology.** Agents hand control to each other directly. LangGraph expresses a handoff as a node returning a `Command` that both updates state *and* names the next node to route to — one agent deciding "this is a coding question, hand off to the code agent."
- **Why do this in LangGraph rather than a dedicated multi-agent framework:** you get all the LangGraph machinery — checkpointing, interrupts, streaming, time travel — across the *whole* multi-agent system, and full control over the topology. The tradeoff is that you wire it yourself (CrewAI/AutoGen make simple multi-agent faster to prototype).
- Module 16 covers multi-agent design deeply; here the point is that LangGraph needs no new concepts for it — agents are nodes, orchestration is edges.

:::note
This is LangGraph's quiet strength: single-agent and multi-agent are the *same* primitives (nodes, edges, state), so you scale from one agent to a coordinated team without switching frameworks or losing persistence and observability. The supervisor-with-workers graph is the workhorse production multi-agent shape, and it is just a graph whose nodes happen to be agents.
:::
