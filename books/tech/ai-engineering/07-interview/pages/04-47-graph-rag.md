## What is GraphRAG, and what does it solve that vector RAG can't?

- Plain vector RAG retrieves **independent chunks** by similarity. It's bad at **global, multi-hop, and aggregative** questions: "what are the main themes across all these reports?" or "how is A connected to C via B?" — no single chunk contains the answer, and similarity won't assemble it.
- **GraphRAG** builds a **knowledge graph** from the corpus (entities as nodes, relationships as edges, often with LLM-extracted community summaries), then retrieves by **traversing** the graph, not just nearest-neighbour.
- Wins:
  - **Multi-hop reasoning** — follow relationships across documents.
  - **Global summarisation** — pre-computed community summaries answer "big picture" questions.
  - **Explainability** — the traversed path is an auditable trail.
- Cost: expensive to build and maintain the graph (lots of LLM extraction), and overkill for simple fact lookup. Use it for connected, analytical corpora; stick with vector RAG for straightforward Q&A.

:::interview
What's really being tested: that you know vector RAG's weakness on multi-hop/global questions and that GraphRAG trades build cost for relationship traversal and global summaries.
:::
