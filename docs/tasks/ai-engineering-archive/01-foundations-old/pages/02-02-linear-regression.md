## Linear regression — the complete training loop

- **Linear regression** — predicts a continuous output as a weighted sum of inputs: `ŷ = w·x + b`. The model has two sets of parameters to learn: weights `w` (one per feature) and bias `b`
- **MSE** (Mean Squared Error) = `(1/n)Σ(ŷ − y)²` — the loss function. Squaring penalizes large errors disproportionately and keeps the loss smooth everywhere, so gradients are always defined
- **Normal equation** `w = (XᵀX)⁻¹Xᵀy` — an exact closed-form solution. O(n³) to compute (matrix inverse); impractical for n > ~10,000 features. Gradient descent scales to millions of features

### The training loop

<svg viewBox="0 0 460 72" role="img" aria-label="Training loop: initialize weights, compute predictions, compute MSE loss, compute gradients, update weights, repeat" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="20" width="68" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="38" y="37" text-anchor="middle">Init w,b</text>
  <path d="M72 34 L88 34" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <rect x="88" y="20" width="76" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="126" y="33" text-anchor="middle">ŷ = Xw + b</text>
  <text x="126" y="43" text-anchor="middle" font-size="8" fill="#6b6b6b">forward</text>
  <path d="M164 34 L180 34" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <rect x="180" y="20" width="72" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="216" y="33" text-anchor="middle">L = MSE</text>
  <text x="216" y="43" text-anchor="middle" font-size="8" fill="#6b6b6b">loss</text>
  <path d="M252 34 L268 34" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <rect x="268" y="20" width="76" height="28" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="306" y="33" text-anchor="middle">∇w, ∇b</text>
  <text x="306" y="43" text-anchor="middle" font-size="8" fill="#6b6b6b">backward</text>
  <path d="M344 34 L360 34" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <rect x="360" y="20" width="96" height="28" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="408" y="33" text-anchor="middle" fill="#24405e">w ← w − η∇w</text>
  <text x="408" y="43" text-anchor="middle" font-size="8" fill="#6b6b6b">update</text>
  <path d="M408 48 L408 65 L38 65 L38 48" stroke="#1a1a1a" fill="none" stroke-dasharray="3 2" marker-end="url(#al)"/>
  <defs><marker id="al" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### MSE gradients — derived once, used everywhere

:::mint
```
dL/dw = (2/n) · Xᵀ(ŷ − y)      # shape (d,) — one gradient per feature
dL/db = (2/n) · Σ(ŷ − y)       # scalar
w ← w − η · dL/dw
b ← b − η · dL/db
```
:::

### Ridge regression — L2 regularization

Adding `λ·‖w‖²` to MSE penalizes large weights. The modified loss: `L = MSE + λ‖w‖²`. The gradient gains a term: `dL/dw = (2/n)Xᵀ(ŷ−y) + 2λw`. This pulls weights toward zero during every update, preventing any single feature from dominating.

:::note
**Feature standardization is not optional for gradient descent.** If one feature has range [0, 1000] and another [0, 1], their optimal learning rates differ by ~1000×. Standardize: `x = (x − μ) / σ` before training. Weights then update at comparable rates and the loss surface is far more spherical — convergence is dramatically faster.
:::
