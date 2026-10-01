## RAG: reranking and HyDE

- Hybrid retrieval returns ~20 candidates fast but *imprecisely* — the best answer might be at rank 8. A **cross-encoder reranker** reads each `(query, chunk)` pair *together* and scores relevance precisely, reordering the candidates so the top few are genuinely the best.

:::mint
```python
from sentence_transformers import CrossEncoder
reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")     # [VERIFY current model]

def rerank(query, candidates, top_n=5):
    pairs = [(query, c["text"]) for c in candidates]
    scores = reranker.predict(pairs)                    # joint relevance score
    ranked = sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True)
    return [c for c, _ in ranked[:top_n]]
```
:::

- **Bi-encoder vs cross-encoder** (Booklet 4). The retriever is a *bi-encoder* — embeds query and docs separately, fast but coarse. The reranker is a *cross-encoder* — processes them together, accurate but too slow for the whole corpus, perfect on 20 candidates. Retrieve wide-and-fast, rerank narrow-and-precise.
- **HyDE** (Hypothetical Document Embeddings) fixes a different mismatch: users ask *questions*, but documents are *answers*, so their embeddings don't align. HyDE asks the LLM to draft a hypothetical answer, then embeds *that* to search — an answer-shaped query matches answer-shaped docs.

:::mint
```python
def hyde_query(question):
    draft = llm(f"Write a short passage that answers: {question}")
    return embed_model.encode(draft)     # search with the answer's embedding
```
:::

:::note
The two-stage retrieve-then-rerank pattern is the single highest-leverage RAG upgrade, mirroring model routing (17-44): a cheap wide net (bi-encoder over the corpus) then an expensive precise filter (cross-encoder over top-k), spending compute only where it matters. HyDE attacks the *query* side of the same recall problem. Together they are why production RAG recalls the right chunk on hard queries a naive cosine search misses — and retrieval recall, not model size, caps RAG quality.
:::
