### Gradient boosting vs random forests on tabular data

As of September 2026, the empirical winner on tabular data:
- **XGBoost / LightGBM / CatBoost** — dominant for structured data competitions and production; lower bias than random forests when tuned
- **Random forests** — better default when hyperparameter tuning budget is limited; more robust to noisy features

:::note
**Why gradient boosting wins Kaggle.** Boosting's sequential nature means later trees can compensate for systematic errors the ensemble has accumulated. Random forests cannot — each tree is independent. This gives boosting lower achievable bias at the cost of more hyperparameters to tune (n_estimators, max_depth, learning_rate, subsample, colsample_bytree).
:::
