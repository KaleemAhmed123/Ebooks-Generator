## What does the dot product actually measure, and why does attention use it?

- The **dot product** of two vectors sums their element-wise products. Geometrically it is `|a||b|cos θ` — large and positive when they point the same way, zero when orthogonal, negative when opposed.
- So it is an unnormalised **similarity score**: "how much does a align with b?"
- **Attention** needs, for each query token, a relevance score against every other token. It computes `query · key` for every pair — one dot product per pair — then softmaxes those scores into weights.
- This is why attention is a matrix multiply: stacking all those dot products *is* `Q·Kᵀ`. The hardware loves it, which is half the reason transformers scale.

:::mint
```text
score(q, k) = q · k = Σ qᵢ kᵢ
attention weights = softmax( Q·Kᵀ / √d )   # √d keeps scores from blowing up
```
:::

:::interview
What's really being tested:

that you can connect a primitive (dot product = alignment) to why the transformer is built the way it is — similarity, done as one big matmul, is the whole engine.
:::
