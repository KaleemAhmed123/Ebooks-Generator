## The building-blocks reference

- Before the mocks, one reference page: the reusable blocks (17-62) that every AI-system design composes from, with the one-line "what it does" and the page that builds each. Memorize this table and you can assemble any AI system fast — the next page shows how to compose them.

| Block | What it does | Built in |
|---|---|---|
| **gateway** | auth, routing, budgets, guardrails, tracing | 17-47 |
| **serving engine** | runs the model (vLLM/SGLang/TRT-LLM or an API) | 17-12…28 |
| **cache** | prompt + semantic reuse, cuts cost and latency | 17-41/42 |
| **embedding service** | text → vectors (a prefill-only workload) | 17-28a |
| **vector DB** | ANN retrieval over embeddings | 17-28c |
| **retriever** | hybrid search + rerank + query rewrite | 19-31…34 |
| **queue** | buffers async / agent work | 17-30a |
| **memory / session store** | conversation + long-term state | Booklet 5 |
| **tool layer** | function calls, MCP, sandboxed execution | 19-37/55 |
| **safety gate** | input/output classifiers + constitution | 19-59 |
| **eval loop** | offline CI gate + online sampling | 19-70 |
| **observability** | traces, cost, quality, safety metrics | 17-45 |

:::note
This table is the whole point of the mocks and flagships: they are not a hundred separate systems to memorize, but the *same dozen blocks* in different arrangements. A chat product is gateway + serving + cache + session store; a RAG system adds the retriever, vector DB, and embedding service; an agent adds the tool layer, queue, and safety gate. Once the blocks are second nature, a new design question stops being "invent an architecture" and becomes "which of these, wired how" — a far faster and more reliable way to think under interview pressure.
:::
