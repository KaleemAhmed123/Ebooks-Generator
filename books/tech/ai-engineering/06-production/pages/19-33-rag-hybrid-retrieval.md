## RAG: hybrid retrieval

- Dense vector search finds *semantic* matches ("car" ≈ "automobile") but misses *exact* terms (a part number, an error code, a rare name) that keyword search nails. **Hybrid retrieval** runs both and fuses the results, covering each other's blind spots.

:::mint
```python
def hybrid_retrieve(query, k=20):
    dense = vector_db.search(embed_model.encode(query), top_k=k)   # semantic
    sparse = bm25.search(query, top_k=k)                           # keyword
    return reciprocal_rank_fusion([dense, sparse], k=60)

def reciprocal_rank_fusion(rankings, k=60):
    scores = {}
    for ranking in rankings:
        for rank, doc_id in enumerate(ranking):        # rank = 0,1,2,...
            scores[doc_id] = scores.get(doc_id, 0) + 1 / (k + rank + 1)
    return sorted(scores, key=scores.get, reverse=True)
```
:::

- **BM25** is the classic keyword-ranking algorithm (term frequency × inverse document frequency, length-normalised) — decades old, fast, and unbeatable at exact-term matching. Dense search is the semantic complement. You genuinely need both.
- **Reciprocal Rank Fusion (RRF)** merges rankings without needing the two scores to be comparable — it scores each document by `1/(k + rank)` in each list and sums. A document ranked highly by *either* method floats up; one ranked highly by *both* wins. `k≈60` is the standard constant, and RRF's robustness (no score calibration) is why it is the default fusion.

:::note
The reason hybrid beats either alone is that dense and sparse fail on *different* queries: dense misses the exact-identifier query ("what does error E4017 mean?" — the code is a rare token the embedding blurs), sparse misses the paraphrased-concept query ("how do I make the app faster?" vs docs about "latency optimisation"). RRF lets you get both recalls without tuning a weighted score, which is fragile across query types. In interviews, "hybrid + RRF" is the expected answer to "how do you improve retrieval recall" — and knowing *why* (complementary failure modes) is the depth.
:::
