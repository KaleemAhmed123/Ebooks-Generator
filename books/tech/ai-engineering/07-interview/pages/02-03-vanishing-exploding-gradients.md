## What is the vanishing/exploding gradient problem, and what are the standard fixes?

- Backprop multiplies many per-layer gradients together (chain rule). If each factor is <1, the product **vanishes** toward zero in early layers; if >1, it **explodes** to huge values or NaN.
- **Vanishing** → early layers barely update, the net won't learn long-range structure. **Exploding** → unstable, loss diverges.
- The modern fix stack:
  - **Good initialisation** (He for ReLU, Xavier for tanh) keeps signal variance stable across layers.
  - **Residual connections** give gradients a shortcut path — the single biggest unlock for depth.
  - **Normalisation** (batch/layer norm) keeps activations in a sane range.
  - **Gradient clipping** caps the norm to stop explosions (standard in RNNs/transformers).

:::interview
What's really being tested:

that you trace the problem to the *product of many factors* in the chain rule, then name fixes that each attack it — not a memorised list but why each one helps.
:::
