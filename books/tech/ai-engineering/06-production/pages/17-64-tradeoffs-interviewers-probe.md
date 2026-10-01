## Step 9: the tradeoffs they probe

- Once your design is on the board, the interviewer attacks it — not to break you, but to see if you *knew* what you traded away. Have the answer ready for each recurring probe.

| Probe | The tradeoff | A staff answer names… |
|---|---|---|
| "RAG or fine-tune?" | freshness/citations vs latency/style | RAG for knowledge that changes; fine-tune for behaviour/format; often both |
| "managed or self-host?" | speed-to-ship/flex vs unit-cost/control | cross the volume crossover (17-06); closed models force managed |
| "bigger model or better retrieval?" | capability vs grounding | most "smartness" gaps are retrieval gaps, not model gaps — cheaper to fix retrieval |
| "how do you handle hallucination?" | never zero | ground with RAG + citations, verify with evals, gate high-stakes with a human |
| "one model or a router?" | simplicity vs cost | route by difficulty once traffic justifies the complexity (17-44) |
| "sync or async?" | UX simplicity vs resilience | stream chat; async + durable for agents (17-60) |
| "how do you know it works?" | vibes vs measurement | offline eval set + LLM-judge + sampled production evals (step 6) |

- **The meta-move: acknowledge the tension, pick a side, justify with the requirements.** "Given the 300 ms SLO and the fast-changing KB, I'd use RAG over fine-tuning — I want fresh, citable answers and can afford the retrieval latency in the budget." That is a complete tradeoff answer: named, decided, grounded in a number you were given.
- **Never answer "it depends" and stop.** It always depends — the interviewer wants to hear *on what*, and then your decision.

:::interview
"Wouldn't a bigger model just fix your quality problem?"

Usually not — most quality gaps in a RAG system are *retrieval* gaps: the model never saw the right context, so a smarter model still can't answer. I would first measure whether failures are retrieval misses or generation errors; if retrieval, better chunking/reranking/hybrid search is far cheaper than a bigger model, and if generation, *then* I consider a stronger model or fine-tuning. Diagnosing before upgrading is the point.
:::
