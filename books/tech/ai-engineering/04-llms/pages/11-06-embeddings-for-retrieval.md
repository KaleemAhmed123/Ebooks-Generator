## Embeddings for retrieval

- To find text by *meaning*, not keywords, you turn each piece of text into a vector — an **embedding** — so that similar meanings land near each other. This is the foundation RAG (next page) is built on.
- Booklet 3 (page 05-25) covered how embedding models are trained. Here is what matters for building retrieval:

<svg viewBox="0 0 314 62" role="img" aria-label="Query and documents become vectors; the closest vectors by cosine similarity are the most relevant" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <circle cx="60" cy="34" r="3" fill="#c0392b"/><text x="60" y="24" text-anchor="middle" font-size="7" fill="#c0392b">query</text>
  <circle cx="80" cy="28" r="3" fill="#1a3a2a"/><circle cx="72" cy="44" r="3" fill="#1a3a2a"/>
  <circle cx="200" cy="18" r="3" fill="#6b6b6b"/><circle cx="230" cy="50" r="3" fill="#6b6b6b"/>
  <text x="150" y="40" fill="#1a3a2a" font-size="7">← near = relevant</text>
  <text x="250" y="34" fill="#6b6b6b" font-size="7">far = unrelated</text>
</svg>

- **Similarity** is measured by **cosine similarity** — the angle between vectors (Booklet 1). Close angle = similar meaning. You embed the query and every document with the *same* model, then find the nearest document vectors.
- Choices that matter:
  - **Model** — pick by your language, domain, and the leaderboard (MTEB). Open options (BGE, E5, GTE) or API (OpenAI, Cohere, Voyage).
  - **Dimension** — bigger vectors capture more but cost more storage and search time; 384–1536 is typical.
  - **Symmetry** — short queries vs long documents behave differently; many models use a query/document **prefix** to bridge the gap.

:::warn
The query and the documents must be embedded with the **exact same model and version**. Mixing models, or upgrading the embedder without re-embedding your whole corpus, silently breaks retrieval — the vectors no longer live in the same space, and "nearest" becomes meaningless. Re-embedding a large corpus is the hidden cost of switching models.
:::
