## Hyperparameter tuning

- **Parameters** are what the model learns (weights). **Hyperparameters** are what *you* set before training: learning rate, tree depth, number of neighbours, regularization strength.
- The wrong hyperparameters cripple a good model. Tuning is the search for a good combination — measured on the validation set, never the test set.

### How to search

- **Grid search** — try every combination on a grid. Thorough but explodes: 4 values across 5 knobs is 1,024 runs.
- **Random search** — sample combinations at random. Usually finds a good setting faster, because only a few hyperparameters actually matter and random sampling covers them better.
- **Bayesian optimization** — use past results to decide what to try next, concentrating on promising regions. Best when each training run is expensive.

<svg viewBox="0 0 300 84" role="img" aria-label="Grid search covers evenly spaced points; random search scatters points, sampling more distinct values of the important axis" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <text x="65" y="12" text-anchor="middle" font-weight="bold">grid</text>
  <g fill="#24405e"><circle cx="30" cy="30" r="2.5"/><circle cx="55" cy="30" r="2.5"/><circle cx="80" cy="30" r="2.5"/><circle cx="30" cy="50" r="2.5"/><circle cx="55" cy="50" r="2.5"/><circle cx="80" cy="50" r="2.5"/><circle cx="30" cy="70" r="2.5"/><circle cx="55" cy="70" r="2.5"/><circle cx="80" cy="70" r="2.5"/></g>
  <text x="230" y="12" text-anchor="middle" font-weight="bold">random</text>
  <g fill="#1a3a2a"><circle cx="200" cy="35" r="2.5"/><circle cx="245" cy="28" r="2.5"/><circle cx="270" cy="60" r="2.5"/><circle cx="215" cy="68" r="2.5"/><circle cx="255" cy="48" r="2.5"/><circle cx="230" cy="55" r="2.5"/><circle cx="285" cy="40" r="2.5"/></g>
</svg>

:::warn
Tuning against the test set — even indirectly, by using it to pick settings — leaks it and inflates your final number. All tuning happens on validation data or via cross-validation. The test set is scored once, after tuning is done.
:::
