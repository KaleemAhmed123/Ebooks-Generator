## Why do we train classifiers with cross-entropy loss instead of mean squared error?

- **Cross-entropy** measures the distance between the true label distribution and the predicted probabilities: `-Σ yᵢ log pᵢ`. For a correct class it reduces to `-log p(correct)`.
- **MSE** (mean squared error) measures squared gap between numbers. Used on probabilities after a sigmoid/softmax, it produces a **non-convex** loss with flat regions where gradients vanish — training stalls.
- Cross-entropy pairs with softmax so the gradient becomes simply `(p − y)`: clean, large when the model is confidently wrong, so it learns fast from its worst mistakes.
- Deeper reason: minimising cross-entropy *is* maximum-likelihood estimation for a categorical target. MSE is the likelihood for Gaussian noise — the wrong model for a discrete label.

:::warn
Confident wrong predictions are where it matters. MSE barely penalises a 0.9-probability mistake; cross-entropy's `-log p` shoots toward infinity. That asymmetry is the point.
:::

:::interview
What's really being tested:

that loss choice follows from the *likelihood* of the target, not taste — and that you know the softmax + cross-entropy gradient is why it trains well.
:::
