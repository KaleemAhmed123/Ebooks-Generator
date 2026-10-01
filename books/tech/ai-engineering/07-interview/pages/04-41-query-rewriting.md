## How do query rewriting, expansion, and HyDE improve retrieval?

- The query a user types is often a bad search key: too short, ambiguous, full of pronouns, or phrased unlike the documents. Fix the **query side**, not just the index.
- Techniques:
  - **Query rewriting** — an LLM rephrases the question into a cleaner search query, resolving "it/they" from chat history (crucial for multi-turn RAG).
  - **Query expansion / multi-query** — generate several paraphrases, retrieve for each, and merge. Covers more phrasings of the answer.
  - **HyDE (hypothetical document embeddings)** — ask the LLM to *write a hypothetical answer*, then embed **that** and retrieve. A fake answer is lexically/semantically closer to real answer passages than a short question is.
  - **Decomposition** — split a multi-part question into sub-questions, retrieve for each.
- Cost: extra LLM calls and latency per query. Use where retrieval is the bottleneck, especially conversational and complex questions.

:::interview
What's really being tested: that you treat the query as a tunable surface (rewrite for coreference, expand for coverage, HyDE to close the question-answer gap), with the latency cost in mind.
:::
