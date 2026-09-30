## Random forests

- A **random forest** is many decision trees voting together. Each tree is grown on a random slice of the data and a random subset of features, then the forest averages their predictions.
- One tree overfits; a crowd of decorrelated trees cancels out each other's mistakes. This is **bagging** — bootstrap aggregating.

<svg viewBox="0 0 340 96" role="img" aria-label="Three different trees each make a prediction and a majority vote combines them into the final answer" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <path d="M40 20 L25 45 M40 20 L55 45" stroke="#24405e" fill="none"/><circle cx="40" cy="18" r="4" fill="#24405e"/><text x="40" y="60" text-anchor="middle">tree → A</text>
  <path d="M140 20 L125 45 M140 20 L155 45" stroke="#24405e" fill="none"/><circle cx="140" cy="18" r="4" fill="#24405e"/><text x="140" y="60" text-anchor="middle">tree → A</text>
  <path d="M240 20 L225 45 M240 20 L255 45" stroke="#24405e" fill="none"/><circle cx="240" cy="18" r="4" fill="#24405e"/><text x="240" y="60" text-anchor="middle">tree → B</text>
  <rect x="110" y="72" width="120" height="20" rx="3" fill="#1a3a2a"/><text x="170" y="86" text-anchor="middle" fill="#fff">majority vote → A</text>
</svg>

### Why it is a favourite baseline

- Strong accuracy with almost no tuning. It handles mixed numeric and categorical features, needs no scaling, and rarely overfits despite the trees inside it doing so.
- It reports **feature importance** — which inputs drove the decisions — for free.

:::note
On tabular data (rows and columns, like a spreadsheet) tree ensembles like random forests and gradient boosting still routinely beat deep neural networks, as of 2026. Deep learning dominates images, text, and audio; classic ML often wins on tables.
:::
