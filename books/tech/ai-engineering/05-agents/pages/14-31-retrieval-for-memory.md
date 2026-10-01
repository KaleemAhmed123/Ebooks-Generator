## Retrieving from memory

- Memory is only as good as your ability to pull the *right* piece back. Three retrieval methods, each strong where the others are weak — and the best systems use all three.

<svg viewBox="0 0 360 96" role="img" aria-label="Vector search for similarity, graph traversal for relationships, and recency or key lookup" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="18" width="110" height="66" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="63" y="32" text-anchor="middle" font-size="6.5">vector</text><text x="63" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"what's similar</text><text x="63" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">to now?"</text><text x="63" y="70" text-anchor="middle" font-size="5.5" fill="#6b6b6b">episodic, fuzzy</text>
  <rect x="126" y="18" width="110" height="66" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="181" y="32" text-anchor="middle" font-size="6.5">graph</text><text x="181" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"what's related</text><text x="181" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">to X?"</text><text x="181" y="70" text-anchor="middle" font-size="5.5" fill="#6b6b6b">entities, multi-hop</text>
  <rect x="244" y="18" width="108" height="66" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="298" y="32" text-anchor="middle" font-size="6.5">key / recency</text><text x="298" y="46" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"the user's name"</text><text x="298" y="55" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"last 5 turns"</text><text x="298" y="70" text-anchor="middle" font-size="5.5" fill="#6b6b6b">facts, direct lookup</text>
</svg>

- **Vector (semantic) search.** Embed the current situation, find the most similar stored memories. Great for **episodic** recall ("have I seen something like this?") and fuzzy matching — the RAG mechanism (Booklet 4) on the agent's history. Weak on precise, relational queries.
- **Graph traversal.** Follow explicit relationships between entities. Great for **multi-hop** and relational queries ("who owns the project Sam mentioned?"). Precise where vectors are vague, but needs a maintained graph.
- **Key lookup / recency.** Direct fetch of a known fact (the `human` memory block) or the last N turns. Cheapest and most reliable for facts you *always* want (user identity, current task) — no search needed, just keep them in context.

- **Combine them.** A mature agent keeps identity/task facts always-in-context (key), searches episodic memory by vector when facing a new problem, and traverses a graph for relational questions. Retrieval quality — not storage — is usually what makes or breaks memory.

:::interview
"Vector search or a knowledge graph for agent memory?"

Both, for different queries. Vector search retrieves by *similarity* — ideal for episodic recall and fuzzy "what's like this?" lookups, but poor at precise relationships. A graph retrieves by *relationship* — ideal for multi-hop, entity-linked questions ("the project owned by the person who filed this ticket"), but needs extraction and maintenance. Add direct key lookup for always-needed facts. The strong systems route each query to the method that fits it rather than forcing one.
:::
