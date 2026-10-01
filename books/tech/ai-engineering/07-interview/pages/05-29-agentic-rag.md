## What is agentic RAG, and how does it differ from a fixed RAG pipeline?

- **Fixed RAG** always does the same thing: embed query → retrieve top-k → generate. One shot, no adaptation.
- **Agentic RAG** makes retrieval a **tool the agent decides how and when to use**. The agent can:
  - Decide **whether** it even needs to retrieve (skip for things it knows).
  - **Reformulate** the query, retrieve, judge if results are sufficient, and **retrieve again** with a better query if not (iterative).
  - Choose **which source/index** to query (route among multiple stores or tools).
  - **Decompose** a complex question into sub-queries and gather each.
- Benefit: handles multi-hop and ambiguous questions that one-shot RAG fails, with self-correction when retrieval is poor.
- Cost: more LLM calls, higher latency, and the usual agent reliability concerns. Use it when fixed RAG demonstrably under-retrieves; keep fixed RAG for simple, predictable lookups.

:::interview
What's really being tested: that agentic RAG turns retrieval into a decided, iterative, self-correcting tool-use loop (good for multi-hop) at extra cost — vs the one-shot fixed pipeline.
:::
