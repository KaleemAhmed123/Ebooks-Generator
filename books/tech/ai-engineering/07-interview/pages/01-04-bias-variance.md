## Explain the bias-variance tradeoff and how you diagnose which one is hurting you.

- **Bias** = error from the model being too simple to capture the pattern (underfitting). **Variance** = error from the model chasing noise in the training set (overfitting).
- Total error ≈ bias² + variance + irreducible noise. Lowering one usually raises the other, so you tune to the sum, not either alone.
- **Diagnose from the gap between train and validation error:**

<svg viewBox="0 0 300 96" role="img" aria-label="High bias: train and val error both high and close. High variance: train error low but val error much higher, a large gap." xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <text x="6" y="12" fill="#6b6b6b">HIGH BIAS (underfit)</text>
  <rect x="10" y="20" width="60" height="12" fill="#c0392b"/><text x="74" y="29">train err high</text>
  <rect x="10" y="36" width="64" height="12" fill="#c0392b"/><text x="78" y="45">val err high</text>
  <text x="150" y="12" fill="#6b6b6b">HIGH VARIANCE (overfit)</text>
  <rect x="154" y="20" width="16" height="12" fill="#1a3a2a"/><text x="174" y="29">train err low</text>
  <rect x="154" y="36" width="70" height="12" fill="#c0392b"/><text x="228" y="45">val err high</text>
  <text x="150" y="64" fill="#6b6b6b">the gap IS the variance</text>
</svg>

- **High bias:** both errors high and close → add capacity, better features, train longer. **High variance:** train low, val much higher → more data, regularisation, simpler model.

:::interview
What's really being tested:

that you debug a model by reading the train-vs-val gap, and that your fix matches the diagnosis instead of reaching for more layers reflexively.
:::
