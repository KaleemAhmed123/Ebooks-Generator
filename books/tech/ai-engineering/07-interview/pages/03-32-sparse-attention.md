## How do sparse and sliding-window attention cut the O(n²) cost?

- Instead of letting every token attend to every token, **restrict the pattern** so each token attends to only a subset — turning O(n²) into roughly O(n·w) for window size w.
- Common patterns:
  - **Sliding window** (Longformer, Mistral): each token attends to its w nearest neighbours. Stacking layers still propagates information globally, like a CNN's growing receptive field.
  - **Global + local:** a few special tokens attend to everything (and are attended by everything); the rest stay local.
  - **Dilated / block-sparse:** strided or block patterns to cover distance cheaply.
- **Attention sinks:** models lean heavily on the first few tokens; keeping them in the window ("sink tokens") stabilises streaming/long generation when you'd otherwise evict them.
- Tradeoff: you lose some exact long-range links for big efficiency gains — fine for many tasks, lossy for others.

:::interview
What's really being tested:

that sparsity trades exactness for linear-ish cost, that stacked local windows still reach global range, and awareness of attention sinks in streaming.
:::
