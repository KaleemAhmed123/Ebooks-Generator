## What is the feed-forward block for, if attention does the mixing?

- Each transformer layer is **attention + a feed-forward network (FFN)**. Attention mixes information *across* tokens; the FFN processes each token *independently*, applying the same two-layer MLP to every position.
- Division of labour: attention decides **what to gather**; the FFN decides **what to do** with the gathered information — the non-linear transformation and most of the model's stored knowledge.
- The FFN is where most **parameters** live (it expands to ~4× the model dimension and back), which is exactly why **MoE** targets it for sparsification.
- Interpretability work suggests FFN layers act like **key-value memories** storing facts and patterns — part of why bigger FFNs mean more knowledge.

:::interview
What's really being tested:

the across-tokens (attention) vs per-token (FFN) split, and that the FFN holds most parameters/knowledge — the reason MoE replaces it, not attention.
:::
