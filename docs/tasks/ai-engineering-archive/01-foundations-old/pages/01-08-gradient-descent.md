## Gradient descent, SGD, momentum, and Adam

- **Gradient descent** — the fundamental optimization algorithm: `w ← w − η·∇L(w)`. Repeat until the gradient is near zero. The loss surface is a landscape; descent walks downhill
- **Learning rate η** — the step size. Too large: weights overshoot the minimum, loss oscillates or diverges. Too small: convergence takes thousands of unnecessary steps. Neither has a formula; start at `3e-4` with Adam
- **Mini-batch SGD** — computing the gradient on a random batch of 32–256 samples rather than the full dataset. The noise helps escape shallow local minima and is computationally necessary for large datasets

### What each optimizer fixes about the previous

<svg viewBox="0 0 460 96" role="img" aria-label="Optimizer lineage: GD baseline, Momentum adds velocity, Adam adds per-weight adaptive rates" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="8" width="136" height="80" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="72" y="28" text-anchor="middle" font-weight="bold">Vanilla GD</text>
  <text x="72" y="46" text-anchor="middle" fill="#6b6b6b">w ← w − η·g</text>
  <text x="72" y="62" text-anchor="middle" fill="#6b6b6b">Problem: zigzags</text>
  <text x="72" y="78" text-anchor="middle" fill="#6b6b6b">in narrow valleys</text>
  <path d="M140 48 L162 48" stroke="#1a1a1a" fill="none" marker-end="url(#ao)"/>
  <rect x="162" y="8" width="136" height="80" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="230" y="28" text-anchor="middle" font-weight="bold">+ Momentum</text>
  <text x="230" y="46" text-anchor="middle" fill="#6b6b6b">v ← βv + g</text>
  <text x="230" y="58" text-anchor="middle" fill="#6b6b6b">w ← w − η·v</text>
  <text x="230" y="74" text-anchor="middle" fill="#6b6b6b">Fixes: smooths zigzags</text>
  <text x="230" y="86" text-anchor="middle" fill="#6b6b6b">Problem: one lr for all</text>
  <path d="M298 48 L320 48" stroke="#1a1a1a" fill="none" marker-end="url(#ao)"/>
  <rect x="320" y="8" width="136" height="80" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="388" y="28" text-anchor="middle" font-weight="bold">Adam</text>
  <text x="388" y="44" text-anchor="middle" fill="#24405e">m ← β₁m + (1−β₁)g</text>
  <text x="388" y="58" text-anchor="middle" fill="#24405e">v ← β₂v + (1−β₂)g²</text>
  <text x="388" y="72" text-anchor="middle" fill="#6b6b6b">w ← w − η·m̂/√v̂</text>
  <text x="388" y="86" text-anchor="middle" fill="#6b6b6b">Per-weight adaptive lr</text>
  <defs><marker id="ao" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

**Adam** (Adaptive Moment Estimation) maintains a running mean `m` of gradients (momentum) and a running mean `v` of squared gradients (scale). The update `m/√v` gives each weight its own effective learning rate — large for weights that rarely receive signal, small for weights that receive large consistent gradients.

### Learning rate schedules

| Schedule | Shape | When to use |
|---|---|---|
| **Warmup** | increases for first N steps | Adam can diverge with large lr at step 0 |
| **Cosine annealing** | decays as cosine | standard for transformer training |
| **Step decay** | drops by factor at milestones | classical CNN training |

:::warn
Adam has a known failure mode: it can converge to sharp minima that generalize poorly. For computer vision, SGD+momentum often produces better final accuracy than Adam despite slower convergence. Use Adam for language models and transformers; SGD+momentum remains competitive for CNNs.
:::
