## What chunking strategies exist, and what's the tradeoff?

- A **chunk** is the unit you embed and retrieve. Chunking decides what the retriever can even find, so it's the highest-leverage, most-underrated RAG decision.
- Strategies:
  - **Fixed-size** (e.g. 500 tokens, with overlap) — simple, but blindly cuts mid-sentence/mid-idea.
  - **Recursive/structural** — split on natural boundaries (paragraphs, headings, markdown/code structure) first, then size-limit. Usually the better default.
  - **Semantic** — split where the topic shifts (embedding-distance based). Cleaner boundaries, more compute.
  - **Document-/section-aware** — keep tables, code blocks, and list items intact; attach titles/breadcrumbs.
- **Overlap** (sharing tokens between adjacent chunks) avoids orphaning a fact that straddles a boundary.

:::warn
Too-small chunks lose context (a pronoun with no antecedent); too-large chunks dilute the embedding and bury the relevant sentence among noise, hurting retrieval precision. There's a sweet spot per corpus.
:::

:::interview
What's really being tested: that chunking defines retrievability, that structure/semantics beat blind fixed cuts, and that chunk size trades context against precision.
:::
