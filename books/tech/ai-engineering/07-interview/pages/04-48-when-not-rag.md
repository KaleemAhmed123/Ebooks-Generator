## When should you NOT use RAG?

- RAG adds retrieval infrastructure, latency, and failure modes. Skip or replace it when:
  - **The knowledge fits in the prompt** and is stable — just put it in the system prompt or context. No index needed.
  - **The task needs behaviour/skill, not facts** — that's fine-tuning or prompting, not retrieval.
  - **The answer needs computation or live data** — use **tools/function calling** (a database query, an API, a calculator), not a document store.
  - **Questions are global/aggregative over the whole corpus** — vector RAG struggles; consider GraphRAG or a structured query.
  - **The corpus is small and static** — long-context "stuff it all in" may be simpler (watch lost-in-the-middle and cost).
- The mature answer: RAG is for **large, changing, private knowledge you must cite**. For anything else, a simpler mechanism (prompt, tool call, fine-tune) is often better.

:::interview
What's really being tested: that you don't reach for RAG reflexively — you match the need (facts vs skill vs computation vs global analysis) to the right mechanism.
:::
