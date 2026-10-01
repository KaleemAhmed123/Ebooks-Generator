## What is data leakage, and give an example that passes cross-validation but fails in production.

- **Data leakage** is when information that would not be available at prediction time sneaks into training. The model looks great offline and collapses in production.
- Classic forms: **target leakage** (a feature is a proxy for the label, e.g. "account_closed_date" predicting churn), and **train/test contamination** (preprocessing fit on the whole dataset before splitting).
- **Example that fools CV:** you scale features or fit an imputer on the *full* dataset, then split. Test-fold statistics (mean, variance) leaked into training. Cross-validation reports inflated scores; live traffic, which the scaler never saw, degrades.
- **Temporal leakage** is the killer in AI systems: shuffling time-series rows lets the model "see the future." You must split by time, and fit every transform inside the training fold only.

:::warn
The scariest leaks don't crash — they quietly inflate offline metrics so a bad model ships. Any `fit` on data that includes the validation/test rows is a leak, even "harmless" normalisation.
:::

:::interview
What's really being tested:

whether you'd catch the subtle leak (preprocessing before splitting, temporal order) that makes a model look better than it is.
:::
