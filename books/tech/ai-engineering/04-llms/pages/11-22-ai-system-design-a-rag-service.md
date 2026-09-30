## System design: a RAG service

- The interview question and the real job: **design a production RAG service** — a support assistant over a company's docs. Every piece in this module has a place on the diagram.

<svg viewBox="0 0 340 118" role="img" aria-label="End-to-end RAG service: request through input guard, cache check, router, query rewrite, hybrid retrieve, re-rank, LLM, output guard, response; with offline indexing and observability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="6" y="20" width="40" height="16" rx="2" fill="#fbeaea" stroke="#c0392b"/><text x="26" y="31" text-anchor="middle">request</text>
  <rect x="54" y="20" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="77" y="31" text-anchor="middle">input guard</text>
  <rect x="108" y="20" width="42" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="129" y="31" text-anchor="middle">rewrite</text>
  <rect x="158" y="20" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="193" y="31" text-anchor="middle">hybrid retrieve</text>
  <rect x="236" y="20" width="44" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="258" y="31" text-anchor="middle">re-rank</text>
  <rect x="288" y="20" width="46" height="16" rx="2" fill="#24405e"/><text x="311" y="31" text-anchor="middle" fill="#fff">LLM+cache</text>
  <rect x="236" y="52" width="52" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="262" y="63" text-anchor="middle">output guard</text>
  <rect x="296" y="52" width="38" height="16" rx="2" fill="#1a3a2a"/><text x="315" y="63" text-anchor="middle" fill="#fff">answer</text>
  <path d="M46 28 L52 28" stroke="#1a1a1a" marker-end="url(#s)"/><path d="M100 28 L106 28" stroke="#1a1a1a" marker-end="url(#s)"/><path d="M150 28 L156 28" stroke="#1a1a1a" marker-end="url(#s)"/><path d="M228 28 L234 28" stroke="#1a1a1a" marker-end="url(#s)"/><path d="M280 28 L286 28" stroke="#1a1a1a" marker-end="url(#s)"/>
  <path d="M311 36 L311 44 L262 44 L262 50" stroke="#1a1a1a" fill="none" marker-end="url(#s)"/><path d="M288 60 L294 60" stroke="#1a1a1a" marker-end="url(#s)"/>
  <rect x="6" y="84" width="150" height="16" rx="2" fill="#eee" stroke="#999"/><text x="81" y="95" text-anchor="middle">offline: chunk → embed → vector store</text>
  <rect x="170" y="84" width="164" height="16" rx="2" fill="#eee" stroke="#999"/><text x="252" y="95" text-anchor="middle">observability: trace · cost · faithfulness · feedback</text>
  <defs><marker id="s" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- **Request path**: input guard → (cache check) → optional router/rewrite → **hybrid retrieve** → **re-rank** → LLM with cached prefix → **output guard** (groundedness) → stream answer with citations.
- **Offline**: ingest, chunk, embed, index; re-index on document changes.
- **Talking points that win the interview**: latency budget (cache + routing), cost per query (11-17), the "I don't know" path (11-13), per-stage evaluation with a golden set (11-12), and prompt-injection limits on any tools (11-21).

:::note
**What comes next (Booklet 5).** The moment this service can *act* — call functions, use tools, follow the **Model Context Protocol (MCP)**, or orchestrate steps with **LangGraph** — it becomes an **agent**. Those are Booklet 5. This booklet built the reliable LLM core they stand on.
:::

:::warn
The demo works in an afternoon; the production system is 90% the parts around the model — retrieval quality, evaluation, guardrails, cost control, and observability. Teams that skip them ship a demo that quietly fails on real traffic. The engineering *is* the unglamorous scaffolding.
:::
