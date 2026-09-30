## Cross-validation

- A single train/validation split is a gamble: you might get an easy or a hard slice by luck, and judge the model on noise.
- **k-fold cross-validation** removes the luck. Split the data into `k` equal parts. Train on `k−1` of them, validate on the one left out, and rotate so every part serves as validation once. Average the `k` scores.

<svg viewBox="0 0 340 92" role="img" aria-label="Five-fold cross-validation: five rows, each using a different fold for validation and the rest for training" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <g>
    <rect x="60" y="8" width="40" height="12" fill="#1a3a2a"/><rect x="100" y="8" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="140" y="8" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="180" y="8" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="220" y="8" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/>
    <rect x="60" y="24" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="100" y="24" width="40" height="12" fill="#1a3a2a"/><rect x="140" y="24" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="180" y="24" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="220" y="24" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/>
    <rect x="60" y="40" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="100" y="40" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="140" y="40" width="40" height="12" fill="#1a3a2a"/><rect x="180" y="40" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/><rect x="220" y="40" width="40" height="12" fill="#e8f4fd" stroke="#24405e"/>
  </g>
  <text x="280" y="20" fill="#1a3a2a">■ validation</text>
  <text x="280" y="34" fill="#24405e">□ training</text>
  <text x="160" y="72" text-anchor="middle" fill="#6b6b6b">average all folds → a stable score</text>
</svg>

- The payoff: every example is used for both training and validation, and the averaged score is far more trustworthy than any single split.

:::note
The cost is `k`× the compute — you train the model `k` times. For quick iteration on large models, one good split is fine; for final numbers on modest datasets, cross-validation is the standard. `k = 5` or `10` is typical.
:::
