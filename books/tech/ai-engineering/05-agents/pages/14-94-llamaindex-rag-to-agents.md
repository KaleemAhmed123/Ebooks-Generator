## LlamaIndex: from RAG to agents

- A query engine answers *one* question over *one* index. Real questions need more: choosing among several data sources, multi-step reasoning, and calling tools. Wrapping query engines as **tools** an agent can call turns RAG into an agent. **[VERIFY current API]**

<svg viewBox="0 0 360 96" role="img" aria-label="An agent chooses among multiple query-engine tools and function tools to answer a complex question" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="22" rx="4" fill="#24405e"/><text x="180" y="24" text-anchor="middle" fill="#fff" font-size="6.5">agent (decides)</text>
  <rect x="16" y="52" width="90" height="30" rx="3" fill="#a03050"/><text x="61" y="65" text-anchor="middle" fill="#fff" font-size="6">docs query engine</text><text x="61" y="75" text-anchor="middle" fill="#fc8" font-size="5.5">as a tool</text>
  <rect x="134" y="52" width="90" height="30" rx="3" fill="#a03050"/><text x="179" y="65" text-anchor="middle" fill="#fff" font-size="6">SQL query engine</text><text x="179" y="75" text-anchor="middle" fill="#fc8" font-size="5.5">as a tool</text>
  <rect x="252" y="52" width="92" height="30" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="298" y="65" text-anchor="middle" font-size="6">calculator</text><text x="298" y="75" text-anchor="middle" font-size="5.5" fill="#6b6b6b">function tool</text>
  <path d="M160 32 L70 50" stroke="#888" marker-end="url(#lr)"/><path d="M180 32 L179 50" stroke="#888" marker-end="url(#lr)"/><path d="M200 32 L292 50" stroke="#888" marker-end="url(#lr)"/>
  <defs><marker id="lr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **The key move: a query engine becomes a tool.** Wrap each index's query engine as a `QueryEngineTool` with a description ("use this to answer questions about the product docs"). Now an agent with several such tools can *decide* which data source to consult — the product docs, the SQL database, the support tickets — per question, and combine them.
- **This is agentic RAG** (Booklet 4's preview realized): instead of always retrieving from one index, the agent reasons about *what to retrieve and from where*, retrieves, maybe retrieves again from another source, and synthesizes. It handles complex, multi-source questions a single query engine cannot.
- Mix in ordinary **function tools** (a calculator, an API call) and the agent fluidly combines retrieval and action — answer from docs, compute on the numbers, look up a live value.

:::interview
"What is agentic RAG and how does LlamaIndex enable it?"

Agentic RAG puts an agent in charge of retrieval: rather than always fetching from one index, the agent decides *whether*, *what*, and *from where* to retrieve, can retrieve multiple times, and reasons across sources. LlamaIndex enables it by wrapping each query engine as a *tool* (a `QueryEngineTool` with a description), so an agent can choose among several data sources — docs, SQL, tickets — plus ordinary function tools, per question. It turns static single-source RAG into a multi-source, multi-step reasoning process.
:::
