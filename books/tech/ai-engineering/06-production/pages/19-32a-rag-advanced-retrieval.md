## RAG: metadata filtering and multi-vector

- Basic RAG retrieves by embedding similarity alone. Production RAG uses the *structure* around the text — metadata and multiple vectors per document — to retrieve far more precisely.
- **Metadata filtering** combines a semantic search with a *structured* filter: "find chunks similar to the query **where** `department = finance` **and** `date > 2025`". The vector search finds semantic matches; the filter enforces hard constraints similarity can't.

:::mint
```python
# hybrid semantic + structured retrieval
results = vector_db.search(
    embed(query), top_k=20,
    filter={"department": "finance", "date": {"$gte": "2025-01-01"},
            "access_level": {"$lte": user.clearance}})   # also enforces authz!
```
:::

- **Metadata filtering is also access control.** Filtering retrieval by the user's clearance level ensures RAG never surfaces a document the user can't see — a critical, often-missed security control (a RAG system that retrieves across tenants or clearance levels is a data leak, 18-39a). Authorization belongs *in the retrieval filter*, not bolted on after.
- **Multi-vector** stores several embeddings per document — e.g. one per section, plus a summary embedding, plus embeddings of hypothetical questions the doc answers. A query can match the *most relevant part* or the *gist*, improving recall over a single averaged document vector (the ColBERT/ColPali family from Booklet 5 takes this to the token level).

:::interview
"How do you keep RAG from leaking documents a user shouldn't see?"

Put authorization *in the retrieval filter*, not after generation. Every chunk carries access metadata (owner, tenant, clearance), and the vector search includes a **structured filter** on the user's permissions — so a document the user can't access is never retrieved, never enters the prompt, and can't be leaked or cited. Filtering after retrieval is too late (it's already in context and the model may reference it); filtering in the query is the control. This is metadata filtering doing double duty — precision *and* security — and it's the answer to both "improve retrieval precision" (hard constraints similarity can't enforce) and "prevent cross-tenant leaks" (authz as a retrieval filter).
:::
