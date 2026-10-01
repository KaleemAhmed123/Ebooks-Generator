## Can you read a model's reasoning off its attention weights?

- Tempting but largely **no**. High attention weight from token A to token B does not reliably mean "B caused A's output." Attention is one of many operations; the Value vectors, FFNs, and residual stream all reshape what actually propagates.
- Known pitfalls: attention weights can be **moved around** without changing the output (not unique), heads are often redundant or diffuse, and much mass lands on uninformative tokens (the first token, punctuation) as "no-op" sinks.
- Research consensus: raw attention maps are **weak, sometimes misleading** explanations. Better interpretability uses attribution (gradient-based), activation patching, and sparse autoencoders on the residual stream.
- Interview-safe stance: attention maps are a useful *hint* for debugging, not a faithful explanation of the model's computation.

:::warn
Claiming "the attention heatmap shows the model focused on X, so that's why it answered Y" is a common overreach. Interviewers probing interpretability want you to know the caveats.
:::

:::interview
What's really being tested:

epistemic caution — that attention ≠ explanation, with the specific reasons (non-uniqueness, sinks, downstream transforms).
:::
