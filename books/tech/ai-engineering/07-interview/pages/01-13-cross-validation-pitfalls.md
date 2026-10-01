## When does standard k-fold cross-validation give you a wrong answer?

- **k-fold CV** splits data into k parts, trains on k−1, tests on the held-out part, rotates, and averages. It assumes rows are **independent and identically distributed**. When they aren't, it lies.
- **Time series:** random folds train on the future to predict the past. Use forward-chaining (expanding or rolling window) so every test fold is strictly later than its training data.
- **Grouped data:** multiple rows per user/patient/document. Random folds put the same group in train and test → leakage. Use **GroupKFold** so a group lives entirely in one fold.
- **Imbalance:** plain folds can leave a fold with zero positives. Use **StratifiedKFold** to preserve class ratios.

<svg viewBox="0 0 300 70" role="img" aria-label="Time-series CV uses expanding training windows, each test window strictly after its training window" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="6" y="10" fill="#6b6b6b">FORWARD-CHAINING (time series)</text>
  <rect x="10" y="16" width="60" height="9" fill="#24405e"/><rect x="72" y="16" width="20" height="9" fill="#c0392b"/>
  <rect x="10" y="29" width="90" height="9" fill="#24405e"/><rect x="102" y="29" width="20" height="9" fill="#c0392b"/>
  <rect x="10" y="42" width="120" height="9" fill="#24405e"/><rect x="132" y="42" width="20" height="9" fill="#c0392b"/>
  <text x="160" y="24">navy = train</text><text x="160" y="37" fill="#c0392b">red = test (always later)</text>
</svg>

:::interview
What's really being tested:

that you check the i.i.d. assumption before trusting a CV score, and name the right variant for temporal and grouped data.
:::
