## Context engineering

- Prompt engineering is about wording. **Context engineering is about what goes in the window at all**, and it is the harder problem
- The window is a fixed budget shared by the system prompt, tools, retrieved documents, history and the answer
- Every one of those grows on its own. Without an explicit budget, whichever grows fastest crowds out the rest

```text
  200k window
  ------------------------------------------------
  system + tools     4k    fixed, cached
  retrieved docs    12k    top 5 chunks, capped
  history           20k    last 10 turns, older summarized
  the question       1k
  output reserve     8k    max_tokens
  ------------------------------------------------
  headroom         155k
```

### Why more context is not better

- **Attention thins as the window fills.** A fact in the middle of 150k tokens is measurably less likely to be used than the same fact in 10k
- Irrelevant retrieved text does not sit there harmlessly. It competes, and it makes wrong answers more likely
- Cost and latency both rise linearly with input, on every single turn

### The four moves

| Move | Does |
|---|---|
| **select** | retrieve only what this question needs |
| **compress** | summarize old turns instead of carrying them |
| **isolate** | give a sub-task its own clean window |
| **offload** | write to memory or a file, read it back on demand |

- **Aim for the smallest context that answers the question**, not the largest that fits. That single reframing fixes most quality problems in this area
