## What tradeoffs do AI system design interviewers always probe?

- Most follow-ups orbit the **quality ↔ latency ↔ cost** triangle — you rarely get all three, so state which you're optimising and why.
  - **Bigger/frontier model** → higher quality, higher latency and cost. **Smaller/quantized** → cheaper/faster, lower quality. (Lever: routing/cascades to get both.)
  - **More context / re-ranking / agentic loops** → better answers, more tokens/latency/cost.
  - **Bigger batches** → higher throughput / lower cost, worse per-request latency (goodput framing).
  - **Caching** → lower cost/latency, risk of staleness or (semantic) wrong hits.
  - **Self-host** → cheaper at scale, more ops burden and slower iteration than managed.
- Other axes they probe: **build vs buy** (managed vs self-host), **RAG vs fine-tune vs long-context**, **consistency vs freshness** (cache/index staleness), **accuracy vs coverage** (precision/recall of retrieval/moderation), and **autonomy vs control** (agents).
- The senior move: don't claim a free lunch — **name the tradeoff, tie it to the stated requirement/SLO, and justify your pick**, noting what you'd change if the requirement changed.

:::interview
What's really being tested: that you reason explicitly about the quality/latency/cost triangle (and build-vs-buy, RAG-vs-finetune), picking a point justified by the requirements rather than asserting a best option.
:::
