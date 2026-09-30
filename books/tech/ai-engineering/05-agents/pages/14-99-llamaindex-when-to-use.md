## LlamaIndex: when to use it

- LlamaIndex's fit follows directly from its data-first center of gravity.

<svg viewBox="0 0 360 84" role="img" aria-label="LlamaIndex fits data/RAG-heavy agents; control-heavy or simple agents fit other frameworks" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="165" height="58" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="92" y="30" text-anchor="middle" font-size="6.5" fill="#1a3a2a">reach for LlamaIndex</text><text x="92" y="44" text-anchor="middle" font-size="6">RAG / knowledge assistant</text><text x="92" y="55" text-anchor="middle" font-size="6">many data sources</text><text x="92" y="66" text-anchor="middle" font-size="6">retrieval quality is the job</text>
  <rect x="185" y="16" width="165" height="58" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="267" y="30" text-anchor="middle" font-size="6.5" fill="#a03050">prefer others when</text><text x="267" y="44" text-anchor="middle" font-size="6">control-heavy flow → LangGraph</text><text x="267" y="55" text-anchor="middle" font-size="6">no real data need → OpenAI SDK</text><text x="267" y="66" text-anchor="middle" font-size="6">computer-operating → Claude SDK</text>
</svg>

- **Choose LlamaIndex when:**
  - The agent is **RAG-centric** — a documentation assistant, a research tool, an enterprise knowledge bot — where answering over a corpus *is* the product.
  - You have **many or messy data sources** and want mature connectors, indexing, and retrieval rather than building the pipeline.
  - **Retrieval quality is the hard part** — you need hybrid search, re-ranking, sub-question decomposition out of the box.
- **Prefer another framework when:**
  - Control flow is the challenge, not data → **LangGraph**.
  - The agent barely touches data (mostly actions/tools) → the **OpenAI Agents SDK**'s simplicity.
  - It operates a computer/codebase → the **Claude Agent SDK**.
- **Combine, don't compete.** A common production shape is LangGraph for orchestration with LlamaIndex *inside a node* doing retrieval — each framework where it is strongest.

:::interview
**"When is LlamaIndex the right framework?"** When retrieval is the hard part. For RAG-centric agents — knowledge assistants, research tools, enterprise doc bots — over many or messy sources, LlamaIndex's mature connectors, indexes, and retrieval (hybrid, re-ranking, sub-question) are a real edge you'd otherwise hand-build. If the challenge is control flow, LangGraph fits better; if the agent barely touches data, a lighter SDK does. And they compose: a common pattern is LangGraph orchestrating, with LlamaIndex doing retrieval inside a node. Pick by where your difficulty lives — for data, it's LlamaIndex.
:::
