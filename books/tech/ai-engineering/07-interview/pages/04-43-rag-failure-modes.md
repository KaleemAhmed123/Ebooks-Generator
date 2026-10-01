## A RAG system gives wrong answers. How do you debug it?

- First **localise**: is the right chunk in the retrieved context or not? Print the retrieved chunks for failing queries. This one check splits the problem cleanly.
- **If the right chunk wasn't retrieved** (a retrieval failure):
  - Chunking cut the fact apart or buried it → fix chunk strategy/size.
  - Embedding model weak on your domain → better model or fine-tune; add hybrid/BM25 for exact terms.
  - Query phrased unlike docs → query rewriting/HyDE.
  - Right chunk retrieved but ranked low → add a re-ranker.
- **If the right chunk *was* retrieved but the answer is still wrong** (a generation failure):
  - Context lost in the middle → re-rank, fewer/better chunks, reorder.
  - Model ignored context and used its memory → stronger "use only the context" instruction, lower temperature.
  - Context contradictory or noisy → tighten retrieval precision.
- Most "RAG doesn't work" complaints are **retrieval** failures, which is why that first localisation step matters most.

:::interview
What's really being tested: a systematic split — retrieved-or-not? — then a targeted fix per branch, rather than randomly swapping models or prompts.
:::
