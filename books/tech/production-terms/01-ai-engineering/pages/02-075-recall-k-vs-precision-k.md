## Recall@k vs Precision@k

Recall@k asks whether the right document is in your top k. Precision@k asks how
much of the top k is noise.

If the answer is not in the retrieved fifty, no prompt engineering recovers it.
Measure recall@50 first, then optimise precision@3.

### How it works

These two measure different stages, and mixing them up sends teams optimising
the wrong thing for weeks.

**Recall@k** — of the documents that could answer this question, how many made
it into my top k? A question about what you *found*.

**Precision@k** — of the k documents I returned, how many are actually relevant?
A question about *noise*.

**The asymmetry is what matters.** A recall failure is unrecoverable: if the
answer is not in what you retrieved, nothing downstream can produce it. Not a
better prompt, not a bigger model, not reranking. The information is simply not
in the context.

A precision failure is recoverable. Noisy results can be reranked and filtered.

So the two stages have different jobs. **Retrieval maximises recall. Reranking
then maximises precision.**

### In practice

This gives a clean debugging procedure:

| Measurement | Means | Fix lives in |
|---|---|---|
| Poor recall@50 | the answer never arrived | chunking, embeddings, hybrid search |
| Good recall, poor answers | it arrived and was mishandled | reranking, ordering, the prompt |

Two very different afternoons of work, and the measurement takes ten minutes to
tell you which one you are having.
