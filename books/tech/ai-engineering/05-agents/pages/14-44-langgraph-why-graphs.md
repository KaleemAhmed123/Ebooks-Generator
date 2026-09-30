## LangGraph: why graphs

- **LangGraph** (from the LangChain team) models an agent as an explicit **graph**: nodes are steps, edges are transitions, and a shared **state** object flows through and is updated by each node. Instead of hoping a while-loop behaves, you *draw the control flow*. **[VERIFY current API]**
- The bet: production agents need **explicit, inspectable control flow and durable state**, not clever prompting. That is why it is the default for complex, long-running, must-be-reliable agents.

<svg viewBox="0 0 360 92" role="img" aria-label="An agent as a graph: nodes for think and act, a conditional edge to end, state flowing through" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <circle cx="80" cy="46" r="20" fill="#24405e"/><text x="80" y="49" text-anchor="middle" fill="#fff" font-size="7">think</text>
  <circle cx="200" cy="46" r="20" fill="#6a9bd0"/><text x="200" y="49" text-anchor="middle" fill="#fff" font-size="7">act</text>
  <rect x="290" y="36" width="46" height="20" rx="3" fill="#1a3a2a"/><text x="313" y="49" text-anchor="middle" fill="#fff" font-size="6">END</text>
  <path d="M100 40 L180 40" stroke="#1a1a1a" marker-end="url(#lg1)"/><text x="140" y="34" text-anchor="middle" font-size="5">tool_calls</text>
  <path d="M180 52 L100 52" stroke="#c0392b" marker-end="url(#lg1r)"/><text x="140" y="64" text-anchor="middle" font-size="5" fill="#c0392b">result</text>
  <path d="M100 46 L288 46" stroke="#888" stroke-dasharray="3,2" marker-end="url(#lg1)"/><text x="250" y="42" font-size="5" fill="#6b6b6b">done</text>
  <text x="180" y="86" text-anchor="middle" font-size="6" fill="#6b6b6b">state flows through every node, updated as it goes</text>
  <defs><marker id="lg1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker><marker id="lg1r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

- **Why a graph and not a loop?** A raw `while` loop is opaque — you cannot pause it, resume it after a crash, inspect its state, insert a human approval, or replay it. A graph makes the control flow a *data structure* the framework can persist, visualize, interrupt, and rewind. Those capabilities (the next pages) are exactly what production agents need and ad-hoc loops lack.
- **The cost:** it is lower-level and more verbose than role-based frameworks (CrewAI). You wire the graph yourself. That verbosity *is* the control — which is why teams choose it when reliability matters more than speed-to-prototype.

:::note
The whole LangGraph cluster is an unfolding of one idea: **make the agent's control flow and state explicit data, so the framework can do things to it** — persist it (checkpointers), pause it (interrupts), rewind it (time travel), compose it (subgraphs), and stream it. Keep that lens; each feature ahead is "because the graph is inspectable data, we can now do X."
:::
