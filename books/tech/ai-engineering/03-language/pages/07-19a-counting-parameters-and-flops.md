## Counting parameters and FLOPs

- "How big is this model, and how much compute to train it?" is a standard interview question with clean back-of-envelope answers. **FLOP** = one floating-point operation; parameters = the learned weights.
- Where a transformer's parameters live (per layer, hidden size `d`):

:::mint
```
attention  ≈ 4 d²      (Q, K, V, output projections)
feed-forward ≈ 8 d²    (two layers, inner size 4d)
per layer  ≈ 12 d²     → total ≈ 12 · L · d²  (+ embeddings)
```
L = number of layers. Embeddings add vocab × d.
:::

- **Training compute** has a famous rule: **C ≈ 6 · N · D** FLOPs, where `N` = parameters and `D` = training tokens. The 6 = 2 for the forward pass + 4 for the backward pass, per parameter per token.
- **Inference** costs ≈ **2 · N** FLOPs per generated token (forward pass only). And the **KV cache** size ≈ `2 · L · d · n · bytes` — the memory that grows with context length `n`.

<svg viewBox="0 0 314 52" role="img" aria-label="Training cost is six times parameters times tokens; inference is two times parameters per token" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="14" y="14" width="130" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="79" y="24" text-anchor="middle" font-size="7.5" fill="#24405e">train ≈ 6·N·D</text><text x="79" y="35" text-anchor="middle" font-size="6.5" fill="#6b6b6b">params × tokens</text>
  <rect x="170" y="14" width="130" height="26" rx="3" fill="#24405e"/><text x="235" y="24" text-anchor="middle" font-size="7.5" fill="#fff">infer ≈ 2·N / token</text><text x="235" y="35" text-anchor="middle" font-size="6.5" fill="#ccd">forward pass only</text>
</svg>

- Worked check: a 7B model on 2T tokens ≈ 6 × 7e9 × 2e12 ≈ **8.4 × 10²²** FLOPs — days on a large GPU cluster. The same formula sizes any training budget.

:::warn
These are order-of-magnitude estimates, not exact. They ignore attention's O(n²) term (page 07-15a), which dominates only at very long context, plus optimizer memory, activations, and hardware efficiency (real utilisation is often 30–50%). Good enough to reason about scale in an interview; not a substitute for profiling a real run.
:::
