## Self-attention from scratch

- Given each token's query, key, and value vectors (page 07-04 shows where they come from), self-attention is **three steps**, and every one is something from Booklet 1.
  1. **Score** — dot each token's query against every key. High dot product = "these two are relevant to each other."
  2. **Weight** — softmax the scores of each query across all keys, turning them into weights that sum to 1.
  3. **Blend** — each token's output is the sum of all value vectors, weighted by those numbers.

:::mint
```python
import numpy as np
def self_attention(Q, K, V):
    scores = Q @ K.T                      # (n, n)  every query vs every key
    scores = scores / np.sqrt(K.shape[-1])  # scale (next page: why)
    weights = softmax(scores, axis=-1)    # (n, n)  each row sums to 1
    return weights @ V                    # (n, d_v) weighted blend of values
```
:::

- The score matrix is `n × n` — one number for every ordered pair of tokens. Row *i* is "how much token *i* attends to each other token." That matrix **is** the attention pattern; you can print it and read which words looked at which.

<svg viewBox="0 0 300 96" role="img" aria-label="A 3x3 attention weight matrix, each row summing to one, mapping which token attends to which" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="150" y="10" text-anchor="middle" fill="#6b6b6b">attention weights (rows sum to 1)</text>
  <g font-size="7" text-anchor="middle" fill="#6b6b6b"><text x="60" y="26">the</text><text x="100" y="26">cat</text><text x="140" y="26">sat</text></g>
  <g><rect x="40" y="30" width="40" height="18" fill="#24405e" fill-opacity="0.8"/><rect x="80" y="30" width="40" height="18" fill="#24405e" fill-opacity="0.15"/><rect x="120" y="30" width="40" height="18" fill="#24405e" fill-opacity="0.05"/>
     <rect x="40" y="48" width="40" height="18" fill="#24405e" fill-opacity="0.1"/><rect x="80" y="48" width="40" height="18" fill="#24405e" fill-opacity="0.7"/><rect x="120" y="48" width="40" height="18" fill="#24405e" fill-opacity="0.2"/>
     <rect x="40" y="66" width="40" height="18" fill="#24405e" fill-opacity="0.2"/><rect x="80" y="66" width="40" height="18" fill="#24405e" fill-opacity="0.5"/><rect x="120" y="66" width="40" height="18" fill="#24405e" fill-opacity="0.3"/></g>
  <g font-size="7" text-anchor="end" fill="#6b6b6b"><text x="36" y="43">the</text><text x="36" y="61">cat</text><text x="36" y="79">sat</text></g>
  <text x="200" y="58" font-size="7" fill="#6b6b6b">darker = more attention</text>
</svg>

:::note
No recurrence, no loop over positions — the whole thing is two matrix multiplies and a softmax, so a GPU computes every token's new vector **at once**. That parallelism is the transformer's superpower. The cost: the `n × n` score matrix grows with the *square* of sequence length — the quadratic wall that pages 07-17 to 07-22 spend their time fighting.
:::
