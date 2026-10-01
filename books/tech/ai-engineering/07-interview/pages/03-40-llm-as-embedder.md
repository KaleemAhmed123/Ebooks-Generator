## Why are decoder-only LLMs now used as embedding models, and what has to change?

- Historically embeddings came from **bidirectional encoders** (BERT/SBERT). Recently, **decoder-only LLMs** are adapted into strong embedders because they already carry rich world knowledge and scale well. [VERIFY: current LLM-based embedder landscape.]
- Two problems to fix:
  - **Causal masking** means the last token sees everything but earlier tokens don't — so naive mean pooling is weak. Fixes: **last-token pooling** (use the final position's hidden state) or enabling bidirectional attention during embedding fine-tuning.
  - **The base objective is generation, not similarity.** You must **contrastively fine-tune** (positive pairs close, in-batch negatives far) to shape a metric space.
- Often paired with **instruction prefixes** ("Represent this sentence for retrieval:") so one model yields task-specific embeddings.

:::interview
What's really being tested:

that you know causal attention + generation objective must be adapted (last-token pooling, contrastive tuning, instructions) to turn an LLM into a good embedder — not that bigger automatically means better embeddings.
:::
