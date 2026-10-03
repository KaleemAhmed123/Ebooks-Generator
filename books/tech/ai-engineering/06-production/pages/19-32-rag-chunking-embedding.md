## RAG: chunking and embedding

- **Chunking** splits documents into retrievable units, and it is the most under-rated lever in RAG — too big and a chunk buries the answer in noise; too small and it loses the context needed to be understood. Structure-aware chunking beats fixed-size.

:::mint
```python
def chunk(text, target=512, overlap=64):
    # split on paragraph boundaries, pack up to ~target tokens, with overlap
    paras, chunks, cur = text.split("\n\n"), [], []
    size = 0
    for p in paras:
        n = len(p.split())
        if size + n > target and cur:
            chunks.append(" ".join(cur))
            cur = cur[-overlap:]                 # carry overlap for context
            size = sum(len(c.split()) for c in cur)
        cur.append(p); size += n
    if cur: chunks.append(" ".join(cur))
    return chunks
```
:::

- **Overlap prevents boundary loss.** A sentence split across two chunks is retrievable from neither cleanly; a small overlap (~10–15%) means the answer is whole in at least one chunk. Split on *natural boundaries* (paragraphs, headings, code blocks) so a chunk is a coherent unit, not a fixed-token slice through the middle of a sentence.
- **Embedding turns chunks into vectors** for dense search. Use a strong embedding model (Booklet 4), embed once at ingestion (the batch-tier, prefill-only workload of 17-28a), and store `(vector, chunk_text, metadata)` in the vector DB.

:::mint
```python
# ingestion: embed chunks and upsert (embedding model served separately, 17-28a)
vectors = embed_model.encode([c for c in chunks])     # (n_chunks, d)
vector_db.upsert(ids, vectors, metadatas=[{"text": c, "doc": doc_id} for c in chunks])
```
:::

:::warn
Store the **chunk text and its source metadata alongside the vector**, not just the vector — a vector alone is useless at generation time, when you need the actual text to put in the prompt and the source to cite. And keep a **doc→chunks mapping** so that when a document changes, you delete and re-embed *its* chunks specifically, not rebuild the whole index — the difference between a demo and a system that survives 500k daily-updated docs.
:::
