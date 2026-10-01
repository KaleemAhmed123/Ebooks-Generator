## Your retrieval is good but answers still miss facts in the context. Why?

- **Lost in the middle:** LLMs attend most reliably to the **beginning and end** of the context and are worst at recalling information buried in the middle. A correct chunk placed in position 7 of 12 can be effectively ignored.
- So *having* the right chunk isn't enough — **where** it sits matters.
- Fixes:
  - **Re-rank and keep fewer, better chunks** — 3 strong beats 15 mediocre; less middle to lose.
  - **Order by relevance toward the edges** — put the most relevant chunks first and last, weakest in the middle.
  - **Compress / summarise** retrieved context so the signal is dense.
  - Don't over-stuff: more context is not strictly better, and it raises cost and dilutes attention.
- This is also why "just use a 1M-token window and dump everything" underperforms a tight, re-ranked RAG prompt.

:::interview
What's really being tested: that you know positional recall bias (lost-in-the-middle), and fix it by re-ranking to fewer chunks and ordering by relevance — not by adding more context.
:::
