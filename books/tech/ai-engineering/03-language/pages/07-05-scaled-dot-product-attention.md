## Scaled dot-product attention

- The full attention formula from the 2017 paper, in one line:

:::mint
```
Attention(Q, K, V) = softmax( Q Kᵀ / √d_k ) V
```
`Q Kᵀ` = all query·key scores · `√d_k` = scale ·
softmax → weights · `× V` = blend
:::

- Every symbol is now familiar. The only new piece is the **√d_k** divisor. It matters more than it looks.

### Why divide by √d_k

- A dot product of two `d_k`-long vectors sums `d_k` products. The larger `d_k` is, the larger the scores swing — variance grows with `d_k`.
- Feed large numbers into softmax and it **saturates**: one weight goes to ~1, the rest to ~0. The distribution becomes a hard, one-hot spike.
- A saturated softmax has near-zero gradient (Booklet 2's vanishing-gradient problem), so training stalls. Dividing by √d_k rescales the scores back to unit variance, keeping softmax in its responsive range.

<svg viewBox="0 0 360 78" role="img" aria-label="Without scaling softmax spikes to one value; with scaling it stays a smooth distribution" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="80" y="12" text-anchor="middle" fill="#c0392b">unscaled: spike</text>
  <g fill="#c0392b"><rect x="30" y="58" width="14" height="4"/><rect x="50" y="20" width="14" height="42"/><rect x="70" y="59" width="14" height="3"/><rect x="90" y="60" width="14" height="2"/></g>
  <text x="280" y="12" text-anchor="middle" fill="#1a3a2a">scaled: usable spread</text>
  <g fill="#1a3a2a"><rect x="230" y="44" width="14" height="18"/><rect x="250" y="30" width="14" height="32"/><rect x="270" y="40" width="14" height="22"/><rect x="290" y="50" width="14" height="12"/></g>
  <line x1="20" y1="62" x2="120" y2="62" stroke="#1a1a1a"/><line x1="220" y1="62" x2="320" y2="62" stroke="#1a1a1a"/>
</svg>

:::warn
Skip the scaling and large models simply fail to train — the loss plateaus and nobody can see why. It is one square-root that beginners drop when re-implementing attention, and the model quietly refuses to learn. When your from-scratch transformer won't converge, check the `/ √d_k` first.
:::
