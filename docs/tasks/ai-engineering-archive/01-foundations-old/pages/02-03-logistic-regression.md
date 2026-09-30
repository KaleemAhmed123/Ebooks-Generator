## Logistic regression and binary cross-entropy

- **Logistic regression** — a binary classifier that applies a linear combination `z = w·x + b` and then passes it through the **sigmoid** function to produce a probability between 0 and 1
- **Sigmoid** `σ(z) = 1 / (1 + e⁻ᶻ)` — maps any real number to (0, 1). At z=0: σ=0.5 (the decision boundary). As z→+∞: σ→1. As z→−∞: σ→0. Derivative: `σ'(z) = σ(z)·(1 − σ(z))` — no chain rule work needed
- **Why not MSE for classification?** MSE + sigmoid creates a non-convex surface with many local minima. Binary cross-entropy is convex for logistic regression — one global minimum, guaranteed

### Decision boundary and what the model learns

<svg viewBox="0 0 460 90" role="img" aria-label="Left: data points with the sigmoid S-curve overlaid. Right: decision boundary separating two classes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="100" y="14" text-anchor="middle" font-weight="bold">Sigmoid output</text>
  <rect x="4" y="18" width="196" height="66" rx="2" fill="none" stroke="#1a1a1a"/>
  <line x1="8" y1="78" x2="196" y2="78" stroke="#1a1a1a" stroke-width="0.8"/>
  <line x1="102" y1="78" x2="102" y2="22" stroke="#1a1a1a" stroke-width="0.5" stroke-dasharray="2 2"/>
  <path d="M12 76 Q40 75 70 70 Q90 64 102 51 Q114 38 130 28 Q155 22 196 21" fill="none" stroke="#24405e" stroke-width="1.5"/>
  <text x="40" y="72" font-size="8" fill="#1a1a1a">class 0</text>
  <text x="150" y="36" font-size="8" fill="#1a1a1a">class 1</text>
  <text x="102" y="88" font-size="7.5" text-anchor="middle" fill="#6b6b6b">z=wx+b → 0</text>
  <text x="230" y="14" text-anchor="middle" font-weight="bold">Decision boundary</text>
  <rect x="210" y="18" width="244" height="66" rx="2" fill="none" stroke="#1a1a1a"/>
  <line x1="332" y1="20" x2="332" y2="84" stroke="#24405e" stroke-width="1.5" stroke-dasharray="4 2"/>
  <circle cx="280" cy="45" r="5" fill="none" stroke="#1a1a1a"/>
  <circle cx="260" cy="60" r="5" fill="none" stroke="#1a1a1a"/>
  <circle cx="300" cy="35" r="5" fill="none" stroke="#1a1a1a"/>
  <rect x="360" y="40" width="7" height="7" fill="#1a1a1a"/>
  <rect x="380" y="55" width="7" height="7" fill="#1a1a1a"/>
  <rect x="345" y="65" width="7" height="7" fill="#1a1a1a"/>
  <text x="332" y="90" font-size="7.5" text-anchor="middle" fill="#6b6b6b">wx+b=0</text>
</svg>

### Binary cross-entropy and its gradient

:::mint
```python
p = 1 / (1 + np.exp(-z))                  # sigmoid
loss = -np.mean(y*np.log(p) + (1-y)*np.log(1-p))  # BCE loss
grad_w = (1/n) * X.T @ (p - y)            # gradient — same form as MSE
grad_b = (1/n) * np.sum(p - y)
```
:::

The gradient of BCE with sigmoid is elegantly `(p − y)·x` — the same shape as linear regression gradients. The nonlinearity is absorbed in how `p` is computed.

:::warn
Setting the classification threshold at 0.5 is a default, not a rule. For medical screening, a false negative (missing a tumour) is far worse than a false positive. Set the threshold lower (e.g., 0.2) to improve recall at the cost of precision. Always evaluate **precision-recall tradeoffs** on the validation set before choosing a threshold for production.
:::
