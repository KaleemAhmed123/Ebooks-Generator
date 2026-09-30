### Why random forests beat single trees

A single decision tree grown to full depth memorises the training data (high variance). A **random forest** fixes this with two tricks:
1. **Bootstrap sampling** — each tree trains on a random 60–80% of the data with replacement
2. **Feature randomisation** — at each split, only `√n_features` random features are considered

Each tree is a biased estimator, but the trees' errors are uncorrelated. Averaging uncorrelated errors reduces variance without increasing bias. This is the core insight of ensemble methods.

:::mint
```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, max_features='sqrt',
                            random_state=42)
rf.fit(X_train, y_train)
# feature importance: rf.feature_importances_
```
:::

:::warn
Default decision tree impurity importance (`feature_importances_`) is biased toward high-cardinality features. A numeric feature with 1000 unique values gets more split opportunities than a binary feature. Use **permutation importance** instead: shuffle each feature independently and measure the drop in validation accuracy. That measures the actual impact, not the opportunity for splits.
:::
