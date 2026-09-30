## Attention is quadratic

- Self-attention's power has a price. Every token attends to every other token, so for a sequence of length `n` the attention matrix has `n × n` entries. Double the context, **quadruple** the cost. This one fact drives most transformer efficiency work.

:::mint
```
scores = Q Kᵀ        # shape n × n
compute: O(n² · d)    time
memory:  O(n²)        the score matrix itself
```
n = tokens, d = head dimension.
:::

<svg viewBox="0 0 316 74" role="img" aria-label="As sequence length doubles, the attention matrix area quadruples" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="20" y="30" width="24" height="24" fill="#cfe3f5" stroke="#24405e"/><text x="32" y="66" text-anchor="middle" fill="#6b6b6b">n</text>
  <rect x="90" y="18" width="48" height="48" fill="#cfe3f5" stroke="#24405e"/><text x="114" y="76" text-anchor="middle" fill="#6b6b6b">2n → 4× area</text>
  <rect x="200" y="6" width="96" height="60" fill="#cfe3f5" stroke="#24405e"/><text x="248" y="76" text-anchor="middle" fill="#6b6b6b">4n → 16× area</text>
</svg>

- Consequences you feel in production: long documents blow up memory, doubling the context window more than doubles cost and latency, and the KV cache (page 07-17) grows linearly per token but is read on every step.
- The mitigations, each its own page: **FlashAttention** (07-18) cuts the *memory* by never storing the full matrix (compute stays O(n²)); **sparse / sliding-window and MQA/GQA** (07-16) cut what is attended to; **KV cache** (07-17) avoids recomputing past tokens.

:::warn
"Just use a 1M-token context" is not free. Nothing removes the O(n²) compute — FlashAttention makes it *fit in memory*, not *cheap*. Every extra thousand tokens of context costs real money and latency on every request, which is why context engineering (Booklet 4, page 11-05) matters even when the window is huge.
:::
