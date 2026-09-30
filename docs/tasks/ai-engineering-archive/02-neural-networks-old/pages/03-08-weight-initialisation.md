## Weight initialisation — before training, the model is already set up to fail or succeed

- Initialise all weights to zero: every neuron in a layer computes the same output and receives the same gradient. After 10,000 steps, you have 512 identical neurons. **Symmetry breaking** requires random initialisation
- Initialise random weights from N(0,1): output variance at each layer = `fan_in · Var(w) · Var(x)`. With fan_in = 512, Var(w) = 1: variance multiplied by 512 per layer → explosion. Scale too small → vanish. The window between the two is razor-thin
- The goal: choose `Var(w)` so that signal magnitude stays constant across layers

### Xavier and Kaiming — why different activations need different scales

<svg viewBox="0 0 460 80" role="img" aria-label="Xavier init for sigmoid and tanh, Kaiming init for ReLU and GELU. Kaiming doubles the variance to compensate for ReLU zeroing half the activations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <rect x="4" y="8" width="218" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="113" y="26" text-anchor="middle" font-weight="bold">Xavier / Glorot (2010)</text>
  <text x="113" y="40" text-anchor="middle">Var(w) = 2 / (fan_in + fan_out)</text>
  <text x="113" y="56" text-anchor="middle" fill="#6b6b6b">For sigmoid, tanh — roughly linear at 0</text>
  <rect x="238" y="8" width="218" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="347" y="26" text-anchor="middle" font-weight="bold">Kaiming / He (2015)</text>
  <text x="347" y="40" text-anchor="middle">Var(w) = 2 / fan_in</text>
  <text x="347" y="56" text-anchor="middle" fill="#24405e">For ReLU, GELU — 2× because ReLU zeros half</text>
</svg>

### Kaiming intuition — why the factor of 2

ReLU kills ~50% of activations (all negative inputs → zero). The effective fan_in is halved. Xavier init with fan_in = 512 gives `Var(w) = 1/512`. But with ReLU, only 256 inputs survive on average, so the signal shrinks by 0.5× per layer. Kaiming's factor-of-2 exactly compensates:

:::mint
```python
import torch.nn as nn
# PyTorch defaults:
nn.Linear(in, out)          # Xavier uniform by default
nn.Conv2d(in_c, out_c, k)  # Kaiming uniform by default (ReLU)

# Explicit for custom layers:
nn.init.kaiming_normal_(layer.weight, mode='fan_in', nonlinearity='relu')
nn.init.xavier_normal_(layer.weight)
```
:::

### Residual connection scale trick (GPT-style)

For transformer residual streams, GPT-2 scales down projection layers by `1/√N` where N = number of residual layers. This prevents the residual stream magnitude from growing as depth increases.

:::note
Modern frameworks set the correct initialiser automatically based on the layer type. The main case where you must choose explicitly is **custom layers**. When in doubt: ReLU/GELU → Kaiming. Sigmoid/tanh → Xavier. Transformer attention projections → small normal (scale ∝ 1/√d_model). Embeddings → small normal N(0, 0.02).
:::
