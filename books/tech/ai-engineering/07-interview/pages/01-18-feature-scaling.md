## Why do SVMs, kNN, and gradient descent need feature scaling, but decision trees don't?

- **Scaling** puts features on a comparable range (standardise to mean 0 / variance 1, or min-max to [0,1]).
- **Distance-based models (kNN, SVM with RBF, k-means)** compute distances. A feature measured in thousands (salary) drowns a feature in single digits (years). Unscaled, the big-range feature dominates the distance and the model effectively ignores the rest.
- **Gradient descent** converges faster on scaled features: unscaled features make the loss surface a stretched ravine, so the optimiser zig-zags. Scaling makes it round and the path direct.
- **Trees don't care:** they split one feature at a time by threshold (`x > 3.5?`). A monotonic rescale doesn't change the ordering, so the same splits are available. Random forests and gradient-boosted trees inherit this.

:::interview
What's really being tested:

that you tie "needs scaling" to a *mechanism* (distance or gradient geometry) and know tree splits are scale-invariant — not a memorised list.
:::
