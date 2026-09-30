## Hybrid memory and mem0

- No single memory type wins; production systems **combine** them. **mem0** is a popular open memory layer that packages this hybrid approach behind a simple API — `add()` a memory, `search()` for relevant ones — while managing extraction, storage, and retrieval underneath. **[VERIFY API/status]**

<svg viewBox="0 0 360 98" role="img" aria-label="A memory layer extracts facts from messages, stores them across vector and graph backends, and retrieves the relevant ones" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="38" width="64" height="22" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="44" y="52" text-anchor="middle" font-size="6">messages</text>
  <rect x="92" y="34" width="80" height="30" rx="4" fill="#24405e"/><text x="132" y="47" text-anchor="middle" fill="#fff" font-size="6">extract facts</text><text x="132" y="58" text-anchor="middle" fill="#cdd" font-size="5">(LLM) + dedupe</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="192" y="20" width="70" height="20" rx="2"/><rect x="192" y="46" width="70" height="20" rx="2"/></g><text x="227" y="33" text-anchor="middle" font-size="5.5">vector store</text><text x="227" y="59" text-anchor="middle" font-size="5.5">graph store</text>
  <rect x="284" y="34" width="66" height="30" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="317" y="47" text-anchor="middle" font-size="6">search →</text><text x="317" y="58" text-anchor="middle" font-size="5.5">relevant memories</text>
  <path d="M76 49 L90 49" stroke="#888" marker-end="url(#hm)"/><path d="M172 42 L190 32" stroke="#888" marker-end="url(#hm)"/><path d="M172 52 L190 54" stroke="#888" marker-end="url(#hm)"/><path d="M262 49 L282 49" stroke="#888" marker-end="url(#hm)"/>
  <defs><marker id="hm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What a hybrid layer does for you:**
  - **Extraction.** An LLM pulls durable facts out of raw messages ("user prefers Python") rather than storing the whole transcript.
  - **Deduplication & conflict resolution.** New facts are checked against existing ones; contradictions update rather than pile up.
  - **Multi-backend storage.** Facts go to a **vector store** (for similarity search) and often a **graph store** (for entities/relations), so both fuzzy recall and precise traversal work.
  - **Retrieval.** At query time it returns the relevant memories to inject into context.
- **Why use a library:** memory is fiddly — extraction, dedup, decay, retrieval tuning. mem0 and similar layers (and the memory features inside LangGraph, CrewAI, Letta) let you `add`/`search` and skip building all that. The tradeoff is less control and another dependency.

:::interview
**"How would you give a production assistant durable memory?"** A hybrid layer, not one mechanism. Extract durable facts from conversations with an LLM (don't store raw transcripts), deduplicate and resolve conflicts so memory stays current, store facts in both a vector index (similarity recall) and a graph (entities/relations for precise, multi-hop lookup), and retrieve the relevant subset into context each turn. Use a library like mem0 or a framework's built-in memory to get extraction/dedup/retrieval for free rather than hand-rolling it.
:::
