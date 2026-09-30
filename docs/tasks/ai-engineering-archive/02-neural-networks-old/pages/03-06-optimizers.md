## Optimizers — from SGD to AdamW

- **SGD** `w ← w − η·∇L` — the base algorithm. One learning rate for every parameter on every step. Oscillates in narrow valleys; crawls on flat regions; highly sensitive to η
- **Momentum** — adds a velocity term: `v ← βv + g; w ← w − η·v`. Gradients in consistent directions accumulate; gradients that flip cancel. Reduces oscillation by ~3×
- **Adam** — combines momentum (first moment `m`) and per-parameter adaptive learning rates (second moment `v`). Works well on 80% of problems with default hyperparameters

### Adam update — the complete picture

<svg viewBox="0 0 460 88" role="img" aria-label="Adam state machine: each step computes gradient g, updates first moment m and second moment v with beta1 and beta2, applies bias correction, then updates w with lr times m-hat over sqrt v-hat" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="8" width="88" height="72" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="48" y="26" text-anchor="middle" font-weight="bold">Step t</text>
  <text x="48" y="40" text-anchor="middle">g = ∇L(w)</text>
  <text x="48" y="54" text-anchor="middle" font-size="8">compute gradient</text>
  <path d="M92 44 L116 44" stroke="#1a1a1a" fill="none" marker-end="url(#a2)"/>
  <rect x="116" y="8" width="108" height="72" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="170" y="26" text-anchor="middle" font-weight="bold">Moments</text>
  <text x="170" y="40" text-anchor="middle">m ← β₁m + (1−β₁)g</text>
  <text x="170" y="54" text-anchor="middle">v ← β₂v + (1−β₂)g²</text>
  <path d="M224 44 L248 44" stroke="#1a1a1a" fill="none" marker-end="url(#a2)"/>
  <rect x="248" y="8" width="100" height="72" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="298" y="26" text-anchor="middle" font-weight="bold" fill="#24405e">Bias correct</text>
  <text x="298" y="40" text-anchor="middle">m̂ = m/(1−β₁ᵗ)</text>
  <text x="298" y="54" text-anchor="middle">v̂ = v/(1−β₂ᵗ)</text>
  <path d="M348 44 L372 44" stroke="#1a1a1a" fill="none" marker-end="url(#a2)"/>
  <rect x="372" y="8" width="84" height="72" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="414" y="26" text-anchor="middle" font-weight="bold">Update</text>
  <text x="414" y="42" text-anchor="middle">w ← w −</text>
  <text x="414" y="56" text-anchor="middle">η·m̂/√(v̂+ε)</text>
  <defs><marker id="a2" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

**Default hyperparameters:** `lr=0.001, β₁=0.9, β₂=0.999, ε=1e-8`. Change `lr` first when tuning. Almost never change β₁ or ε.

### AdamW — Adam with weight decay done right

Adam with L2 regularisation (`loss + λ‖w‖²`) conflates the regularisation term with the gradient — the adaptive learning rate also scales down the weight decay, making it ineffective. **AdamW** decouples weight decay and applies it directly to the weights:

:::mint
```python
# Adam: gradient includes λw → adaptive rate scales down weight decay
# AdamW: correct separation
optimizer = torch.optim.AdamW(model.parameters(), lr=3e-4, weight_decay=0.1)
# weight_decay applied as: w ← w*(1 − lr*wd) separately from gradient step
```
:::

### Which optimizer for which task

| Task | Optimizer | Notes |
|---|---|---|
| Transformer pretraining | **AdamW** | Default in all modern LLM work |
| CNN training | SGD + momentum | Better generalisation than Adam for vision |
| Fine-tuning | AdamW | Lower lr (1e-5 to 1e-4) |
| GAN generator/discriminator | Adam | Separate optimizers per network |

:::note
Why SGD + momentum outperforms Adam on vision tasks: SGD finds flatter minima, which generalise better. Adam's adaptive rates let it converge faster but often to sharper minima. When training time is unlimited and generalisation matters more than speed — ImageNet-scale training — SGD with momentum plus a warm-up schedule typically beats AdamW. For everything else, AdamW is the safe default.
:::
