## RAG: agentic retrieval

- Fixed RAG retrieves *once* on the raw query, then generates. **Agentic RAG** lets the model *decide* whether, what, and how many times to retrieve — turning retrieval into a tool the agent (Flagship 4) calls in a loop. It fixes the queries fixed RAG can't answer in one shot.

<svg viewBox="0 0 360 84" role="img" aria-label="Agentic RAG loop: the model decides to retrieve, reformulates queries, retrieves again, until it can answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="34" width="60" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="44" y="46" text-anchor="middle" font-size="6">agent</text>
  <rect x="98" y="14" width="80" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="138" y="25" text-anchor="middle" font-size="5.5">need info? retrieve</text>
  <rect x="98" y="56" width="80" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="138" y="67" text-anchor="middle" font-size="5.5">reformulate + retrieve again</text>
  <rect x="200" y="34" width="66" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="233" y="46" text-anchor="middle" font-size="6">enough?</text>
  <rect x="290" y="34" width="60" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="320" y="46" text-anchor="middle" font-size="6">answer</text>
  <path d="M74 40 L96 24 M74 46 L96 62 M178 22 L200 40 M178 64 L200 46 M266 43 L288 43" stroke="#888" marker-end="url(#ar2)"/>
  <path d="M233 52 Q233 78 138 72" fill="none" stroke="#a03050" stroke-dasharray="3 2" marker-end="url(#ar2)"/><text x="180" y="82" text-anchor="middle" font-size="5" fill="#a03050">not enough → retrieve more</text>
  <defs><marker id="ar2" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **What it unlocks.** *Multi-hop* — retrieve, read, then retrieve *again* on what you learned ("find X's CEO" → "find that person's other companies"). *Query reformulation* — the raw query retrieves badly, so the agent rephrases and retries. *Source selection* — decide *which* index or tool to query. *Self-correction* — notice the retrieved context doesn't answer the question and retrieve differently. Fixed one-shot RAG can do none of these.
- **The cost is latency and tokens** — each retrieval round is another LLM call, so agentic RAG is slower and pricier than one-shot. Use it where questions genuinely need iteration; keep fixed RAG for the simple-lookup majority (a router, 17-44, decides which).

:::interview
"When would you make RAG agentic instead of a fixed pipeline?"

When questions need *iteration* a single retrieval can't serve: **multi-hop** (the answer depends on what an earlier retrieval returned), **query reformulation** (the raw phrasing retrieves poorly), **multi-source** (decide which index/tool to hit), or **self-correction** (notice the context is insufficient and retrieve again). Agentic RAG makes retrieval a tool the model calls in a loop, which handles all of these — at the cost of more LLM calls, so higher latency and spend. So I'd **route**: fixed one-shot RAG for the simple-lookup majority, agentic RAG for the complex minority, rather than paying the loop's cost on every query. Matching retrieval strategy to question complexity is the judgment.
:::
