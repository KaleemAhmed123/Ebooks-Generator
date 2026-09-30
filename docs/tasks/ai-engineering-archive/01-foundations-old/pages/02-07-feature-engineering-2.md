### Feature selection: removing what hurts

- **Variance threshold** — drop features with near-zero variance (they carry no information)
- **Correlation filter** — drop one of any pair of features with correlation > 0.95 (they are redundant)
- **Mutual information** — rank features by how much they reduce uncertainty about the target; keep top-k

:::warn
**Target encoding leaks the future into training.** If you compute `mean_price_per_city` on the full dataset and use it as a feature, test samples "know" the labels through the encoded value. Correct procedure: compute encodings only on training folds, then apply them to validation/test. Use `sklearn`'s `TargetEncoder` with `cv=5` which handles this automatically.
:::
