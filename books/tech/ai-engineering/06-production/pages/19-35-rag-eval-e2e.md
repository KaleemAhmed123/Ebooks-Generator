## RAG: evaluation and end-to-end

- RAG has two failure surfaces (19-06), so it needs two evals. Build both; without them you cannot tell whether a change helped.

:::mint
```python
# retrieval eval: did the right chunk come back? (needs a labelled set)
def recall_at_k(queries, gold_ids, k=5):
    hit = lambda q, g: g in [c["id"] for c in rerank(q, hybrid_retrieve(q), k)]
    return sum(hit(q, g) for q, g in zip(queries, gold_ids)) / len(queries)

# generation eval: is the answer grounded in the retrieved context?
def faithfulness(answer, context):
    v = llm(f"Context:\n{context}\nAnswer:\n{answer}\n"
            f"Is every claim supported by the context? SUPPORTED / UNSUPPORTED.")
    return v.startswith("SUPPORTED")
```
:::

- **Recall@k** measures the retriever: of the queries with a known answer-chunk, how often is it in the top-k? If recall is low, the fix is upstream (chunking, hybrid, rerank, HyDE) — a better generator cannot answer from context it never received.
- **Faithfulness** measures the generator: is every claim in the answer supported by the retrieved context? An LLM-judge scores it. Low faithfulness with high recall means the model is *hallucinating despite* having the answer — a prompt/grounding problem, fixed with a groundedness gate and citation requirements.

- **The end-to-end loop:** query → HyDE rewrite → hybrid retrieve (BM25+dense, RRF) → rerank top-5 → generate with citations → faithfulness gate. Instrument recall and faithfulness continuously (online eval, 17-46a) so a corpus change or model swap that degrades either pages you.

:::interview
"Your RAG recall is 95% but users still get wrong answers. Where do you look?"

At the *generation* surface, since retrieval is clearly fine — recall@k of 95% means the answer chunk is almost always retrieved, so the failure is downstream: the model is ignoring or misreading the context (hallucinating despite grounding), the context is being crowded out by too many chunks, or citations aren't enforced. I'd measure **faithfulness** with an LLM-judge, tighten the prompt to demand grounded, cited answers, add a groundedness gate that rejects unsupported claims, and reduce k if distraction is the issue. The diagnostic discipline — recall isolates retrieval, faithfulness isolates generation — is the answer; they fail independently and need different fixes.
:::
