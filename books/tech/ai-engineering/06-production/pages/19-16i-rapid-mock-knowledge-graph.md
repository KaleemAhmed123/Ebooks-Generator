## Rapid mock: knowledge-graph QA

- **Prompt:** "Answer questions over a large knowledge graph / structured enterprise data." **Clarify:** entities and relationships (not documents), multi-hop questions ("which suppliers of X's competitors are in region Y?"), answers must be *exact and auditable*, the graph updates.
- The insight: **vector RAG is wrong for structured multi-hop.** Retrieving text chunks can't reliably answer "3 hops across relationships" — you need the LLM to *query the graph*, not search embeddings.

<svg viewBox="0 0 360 64" role="img" aria-label="Question to LLM that generates a graph query, executed against the graph, results back to the LLM to answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="8" y="24" width="44" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="30" y="35" text-anchor="middle">question</text>
  <rect x="70" y="24" width="70" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="105" y="35" text-anchor="middle" font-size="5.5">LLM → graph query</text>
  <rect x="158" y="24" width="70" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="193" y="35" text-anchor="middle" font-size="5.5">execute (Cypher/SPARQL)</text>
  <rect x="246" y="24" width="50" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="271" y="35" text-anchor="middle" font-size="5.5">LLM answers</text>
  <rect x="304" y="24" width="48" height="16" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="328" y="35" text-anchor="middle" font-size="5.5">+ citation</text>
  <path d="M52 32 L68 32 M140 32 L156 32 M228 32 L244 32 M296 32 L302 32" stroke="#888" marker-end="url(#kg)"/>
  <defs><marker id="kg" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Text-to-query, like text-to-SQL** (19-16a). The LLM translates the question into a graph query (Cypher for Neo4j, SPARQL for RDF), which is *executed* against the graph — so multi-hop traversal is done by the graph engine (exact, auditable), not approximated by embedding similarity. The answer is grounded in real query results with the traversal as its citation.
- **GraphRAG is the hybrid.** For questions mixing structured relationships and unstructured text, combine graph traversal with vector retrieval — traverse the graph for the entities/relationships, retrieve documents for the descriptive content. Same principle: use the structure where structure exists.

:::interview
"RAG or knowledge graph for multi-hop questions over enterprise data?"

For genuinely *structured, multi-hop* questions ("suppliers of competitors in region Y"), vector RAG is the wrong tool — retrieving text chunks can't reliably chain relationships. Use **text-to-graph-query**: the LLM translates the question into Cypher/SPARQL, the graph engine *executes* the traversal (exact and auditable), and the LLM answers from the results with the query as citation — the same verify-don't-generate discipline as text-to-SQL (19-16a). For mixed structured+unstructured needs, **GraphRAG** combines traversal with document retrieval. The judgment that scores: matching the retrieval method to the data's shape — graph query for relationships, vector search for semantics — rather than forcing everything through embeddings.
:::
