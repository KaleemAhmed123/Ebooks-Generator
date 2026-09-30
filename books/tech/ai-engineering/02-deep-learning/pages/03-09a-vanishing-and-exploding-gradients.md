## Vanishing and exploding gradients

- Backprop multiplies gradients layer by layer, back through the network (page 03-09). Multiply many numbers together and the product runs away: if each is <1 the gradient **vanishes** toward zero; if each is >1 it **explodes** toward infinity. The classic reason deep networks were once nearly untrainable.

<svg viewBox="0 0 320 62" role="img" aria-label="Through many layers, gradients below one shrink to zero and gradients above one blow up" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <text x="70" y="12" text-anchor="middle" fill="#c0392b">×0.5 each layer → vanish</text>
  <text x="30" y="34">0.5</text><text x="70" y="34">0.25</text><text x="112" y="34">0.12</text><text x="150" y="34" fill="#c0392b">→0</text>
  <line x1="165" y1="8" x2="165" y2="54" stroke="#ccc"/>
  <text x="250" y="12" text-anchor="middle" fill="#c0392b">×2 each layer → explode</text>
  <text x="200" y="34">2</text><text x="230" y="34">4</text><text x="260" y="34">8</text><text x="292" y="34" fill="#c0392b">→∞</text>
  <text x="160" y="54" text-anchor="middle" fill="#6b6b6b" font-size="7">the deeper the network, the worse the effect</text>
</svg>

- **Vanishing** — early layers get almost no gradient, so they barely learn; training stalls with a flat loss. Worst with saturating activations like sigmoid/tanh, whose slopes are tiny away from zero.
- **Exploding** — gradients grow huge, weights lurch, and the loss spikes to `NaN` (not-a-number). Common in deep or recurrent networks.
- The fix is a stack of ideas from later pages, each attacking one cause:
  - **ReLU** activations (page 03-06) — slope 1 for positive inputs, so it doesn't shrink gradients.
  - **Careful initialization** (Xavier/He, page 03-11) — keeps signal variance stable across layers.
  - **Residual connections** (Booklet, ResNet) — give gradients a shortcut straight back.
  - **Batch/layer normalization** (page 03-14) — rescales activations each layer.
  - **Gradient clipping** — cap the gradient's magnitude to a ceiling; the standard, direct cure for *exploding* gradients (essential for RNNs).

:::warn
A flat loss and a `NaN` loss look like different bugs but are two faces of the same cause. Before rewriting the model, suspect gradients first: check activations, initialization, and learning rate, and add clipping if the loss ever spikes. Most "my deep net won't train" problems are gradient-scale problems, not architecture problems.
:::
