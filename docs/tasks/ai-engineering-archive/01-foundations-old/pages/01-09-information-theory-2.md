### Perplexity — the language model metric

**Perplexity** = `exp(H(P, Q))` — the effective vocabulary size a model is choosing from. A language model with perplexity 10 is roughly as uncertain as choosing uniformly from 10 words. Lower is better. As of September 2026, state-of-the-art LLMs achieve single-digit perplexity on standard benchmarks.

:::note
KL divergence is asymmetric: `D_KL(P‖Q) ≠ D_KL(Q‖P)`. This matters in variational autoencoders and knowledge distillation, where the direction of the KL term produces different behaviors — "zero-forcing" (model avoids regions P does not cover) vs "mass-covering" (model spreads over all regions P covers).
:::
