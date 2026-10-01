## Bagging vs boosting — what does each do to bias and variance?

- Both are **ensembles**: combine many weak models into a strong one. They attack different error sources.
- **Bagging** (bootstrap aggregating, e.g. random forest) trains many models in **parallel** on random subsets of data/features and averages them. Averaging independent errors **cuts variance** while leaving bias roughly unchanged. Great for high-variance base learners like deep trees.
- **Boosting** (AdaBoost, gradient boosting, XGBoost) trains models **sequentially**, each one fixing the previous ensemble's mistakes. It **cuts bias**, building a strong learner from weak ones — but can overfit if run too long.
- Practical read: random forests are robust and hard to misconfigure; boosted trees usually win accuracy on tabular data but need careful tuning (learning rate, tree depth, early stopping).

:::mint
```text
bagging:   parallel, independent   -> lowers VARIANCE
boosting:  sequential, corrective  -> lowers BIAS
```
:::

:::interview
What's really being tested:

that you map each ensemble to the error it reduces, and know why boosted trees are the tabular-data default despite the tuning cost.
:::
