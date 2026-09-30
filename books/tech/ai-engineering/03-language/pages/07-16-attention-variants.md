## Attention variants

- Standard multi-head attention has a cost that hurts at inference: each head keeps its **own** keys and values, and all of them must be stored and re-read for every generated token. Two variants cut that memory.
- **Multi-query attention (MQA).** All heads *share one* set of keys and values (only the queries differ). Slashes the memory read per step, but can dent quality.
- **Grouped-query attention (GQA).** The middle ground: heads are split into a few groups, each group sharing one key/value set. Most of MQA's savings, almost none of the quality loss. **GQA is standard in 2026** — Llama, Mistral, and most open models use it.

<svg viewBox="0 0 360 78" role="img" aria-label="MHA has one KV per head, MQA one KV for all heads, GQA one KV per group" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="55" y="12" text-anchor="middle" fill="#6b6b6b">MHA</text><text x="180" y="12" text-anchor="middle" fill="#6b6b6b">GQA</text><text x="305" y="12" text-anchor="middle" fill="#6b6b6b">MQA</text>
  <g fill="#24405e"><circle cx="25" cy="30" r="6"/><circle cx="45" cy="30" r="6"/><circle cx="65" cy="30" r="6"/><circle cx="85" cy="30" r="6"/></g>
  <g fill="#c0392b"><rect x="20" y="50" width="10" height="10"/><rect x="40" y="50" width="10" height="10"/><rect x="60" y="50" width="10" height="10"/><rect x="80" y="50" width="10" height="10"/></g>
  <g fill="#24405e"><circle cx="150" cy="30" r="6"/><circle cx="170" cy="30" r="6"/><circle cx="190" cy="30" r="6"/><circle cx="210" cy="30" r="6"/></g>
  <g fill="#c0392b"><rect x="155" y="50" width="10" height="10"/><rect x="195" y="50" width="10" height="10"/></g>
  <g fill="#24405e"><circle cx="275" cy="30" r="6"/><circle cx="295" cy="30" r="6"/><circle cx="315" cy="30" r="6"/><circle cx="335" cy="30" r="6"/></g>
  <rect x="300" y="50" width="10" height="10" fill="#c0392b"/>
  <text x="180" y="74" text-anchor="middle" fill="#6b6b6b">blue = query heads · red = key/value sets</text>
</svg>

- A separate axis attacks the **quadratic** cost of attending to every token: **sparse / sliding-window attention** limits each token to a local window (Mistral) or a sparse pattern, trading full reach for near-linear cost on long sequences.

:::note
These are not exotic — GQA in particular is in nearly every model you will deploy in 2026. When a model card lists "8 KV heads, 32 query heads," that is GQA, and it is the reason the model's memory footprint at long context is far smaller than plain multi-head would allow. The next page, the KV cache, is *why* this memory matters so much.
:::
