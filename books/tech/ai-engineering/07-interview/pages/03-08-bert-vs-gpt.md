## BERT vs GPT — what's the core difference and when would you still pick BERT?

- **BERT** is encoder-only, trained with **masked language modelling** (hide 15% of tokens, predict them using both sides). Bidirectional context makes it strong at understanding.
- **GPT** is decoder-only, trained with **causal language modelling** (predict the next token). Autoregressive, so it can generate.
- When to still pick a BERT-style model:
  - **Embeddings / retrieval** — a small bidirectional encoder produces one high-quality vector per text, far cheaper than an LLM.
  - **High-throughput classification** (spam, sentiment, routing) where you process millions of items and don't need generation.
  - **Token-level tagging** (NER, extraction) where bidirectional context helps.
- For anything generative or few-shot/instruction-following, GPT-style wins. The industry shifted to decoder-only for general models, but encoders are alive in the retrieval/classification layer.

:::interview
What's really being tested:

MLM-vs-CLM and the practical judgment that a small encoder still beats an LLM on cost for embeddings and bulk classification.
:::
