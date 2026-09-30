## Embedding models today

- word2vec gives one vector per *word*. Modern **embedding models** give one vector per *sentence, paragraph, or document* — and they are context-aware, so *"river bank"* and *"savings bank"* land in different places.
- They are transformers (later in this booklet) fine-tuned for one job: map a piece of text to a single dense vector where **similar meanings sit close** under cosine similarity.

### How they are trained

- **Contrastive learning.** Show the model pairs that should be close (a question and its answer, a sentence and its paraphrase) and pairs that should be far. Pull the "close" pairs together, push the rest apart.
- The result is a space tuned for *retrieval*: nearest-neighbor search returns semantically relevant text.

:::mint
```python
from sentence_transformers import SentenceTransformer
m = SentenceTransformer("all-MiniLM-L6-v2")     # small, fast, 384-dim
v = m.encode(["How do I reset my password?"])    # -> one 384-number vector
# store v in a vector database; query by cosine similarity
```
:::

- Practical choices as of September 2026: small open models (the MiniLM / BGE / E5 families) run locally; hosted APIs (OpenAI, Cohere, Voyage) trade a per-call fee for quality and zero ops. The **MTEB** leaderboard ranks them on real retrieval tasks — check it before picking.

:::note
Embedding models are the backbone of **semantic search and RAG**: embed your documents once, store the vectors, then embed each query and return the nearest documents. Two rules that bite beginners — you must use the **same model** for documents and queries, and **dimension is fixed** per model (384, 768, 1536…), so switching models means re-embedding everything.
:::
