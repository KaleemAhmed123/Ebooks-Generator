## Entropy, KL divergence, and cross-entropy loss

- **Information content** `I(x) = −log p(x)` — how surprising an event is. A certain event (p=1) has zero information. A 1-in-a-million event carries ~20 bits
- **Entropy** `H(P) = −Σ p(x) log p(x)` — the expected surprise across a distribution. Maximum entropy = maximum uncertainty. A uniform distribution over 256 tokens has entropy = 8 bits
- **Cross-entropy** `H(P,Q) = −Σ p(x) log q(x)` — average surprise when using model distribution Q to encode data that actually comes from true distribution P. The standard classification loss

### Cross-entropy = entropy + KL divergence

<svg viewBox="0 0 460 72" role="img" aria-label="Cross-entropy equals entropy of the true distribution plus KL divergence from P to Q; minimizing cross-entropy minimizes KL divergence since entropy is constant during training" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">
  <rect x="4" y="12" width="156" height="48" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="82" y="32" text-anchor="middle" font-weight="bold" fill="#24405e">H(P, Q)</text>
  <text x="82" y="50" text-anchor="middle" font-size="9" fill="#6b6b6b">cross-entropy loss</text>
  <text x="172" y="42" text-anchor="middle" font-size="16">=</text>
  <rect x="188" y="12" width="112" height="48" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="244" y="32" text-anchor="middle" font-weight="bold">H(P)</text>
  <text x="244" y="50" text-anchor="middle" font-size="9" fill="#6b6b6b">constant (true labels)</text>
  <text x="312" y="42" text-anchor="middle" font-size="16">+</text>
  <rect x="328" y="12" width="128" height="48" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="392" y="32" text-anchor="middle" font-weight="bold">D_KL(P ‖ Q)</text>
  <text x="392" y="50" text-anchor="middle" font-size="9" fill="#6b6b6b">minimized by training</text>
</svg>

Since H(P) is fixed during training, minimizing cross-entropy = minimizing KL divergence = pushing the model's distribution toward the true distribution.

### Why cross-entropy is the right loss for classification

For a one-hot target (true class = 1, all others = 0), cross-entropy collapses to: `loss = −log q(true_class)`. Maximizing the probability the model assigns to the correct class is exactly what we want.

:::mint
```python
import numpy as np
logits = np.array([2.0, 1.0, 0.1])
true_class = 0
exp = np.exp(logits - logits.max())     # numerical stability
probs = exp / exp.sum()
loss = -np.log(probs[true_class])       # cross-entropy = −log(0.659) = 0.42
```
:::
