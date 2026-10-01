## LlamaIndex: indexes and query engines

- The two core objects are the **index** (your data, made searchable) and the **query engine** (the thing that answers questions over it). Together they are RAG in a few lines. **[VERIFY current API]**

:::mint
```python
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

docs = SimpleDirectoryReader("./data").load_data()   # ingest a folder
index = VectorStoreIndex.from_documents(docs)         # chunk + embed + store
engine = index.as_query_engine()                      # a RAG query engine

engine.query("What is our refund policy?")
# → retrieves relevant chunks, stuffs them in a prompt, returns a grounded answer
```
:::

- **The index** ingests documents and builds a searchable structure — most commonly a **vector index** (chunk → embed → store, Booklet 4). LlamaIndex also offers other index types (summary, keyword, knowledge-graph) for different retrieval needs, but vector is the workhorse.
- **The query engine** wraps retrieval + generation: given a question, it retrieves the top-k relevant chunks, assembles them into a prompt, and asks the LLM — returning a grounded answer with source citations. This is the RAG core loop (Booklet 4) as a single object you call.
- **Configurable at every stage:** the retriever (how chunks are found — vector, hybrid, with re-ranking), the response synthesizer (how chunks become an answer), and post-processors (filtering, re-ranking). This is where LlamaIndex's depth shows — the RAG failure-mode fixes of Booklet 4 (re-ranking, hybrid search) are built-in knobs, not things you assemble.

:::interview
"How is RAG expressed in LlamaIndex?"

As an index plus a query engine. You load documents, build a `VectorStoreIndex` (which chunks, embeds, and stores them), and call `.as_query_engine()` to get an object that, on a query, retrieves the top-k relevant chunks, prompts the LLM with them, and returns a grounded, cited answer. Every stage is configurable — the retriever (vector/hybrid/re-ranked), the synthesizer, and post-processors — so the RAG-quality techniques from the retrieval chapter are built-in options rather than custom code. That maturity is why it's the go-to for data-heavy agents.
:::
