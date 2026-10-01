## Why divide the attention scores by √d?

- The raw score is a dot product of two d-dimensional vectors. If their entries are roughly independent with unit variance, the dot product has variance ≈ **d** — so it grows with dimension.
- Large scores push **softmax into saturation**: one weight goes to ~1, the rest to ~0, and the gradient there is nearly zero. Training stalls and attention becomes a hard, brittle pick.
- Dividing by **√d** rescales the scores back to unit variance, keeping softmax in its responsive range where gradients flow and attention stays soft.
- It's a normalisation for numerical stability, not a modelling choice — but omit it and large-d attention trains badly.

:::mint
```text
Var(q·k) ≈ d   ->   divide by √d   ->   Var ≈ 1   ->   softmax stays well-conditioned
```
:::

:::interview
What's really being tested:

that you know the variance-grows-with-d argument and the softmax-saturation consequence — not just "it's in the formula."
:::
