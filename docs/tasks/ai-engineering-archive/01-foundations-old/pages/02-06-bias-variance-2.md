### Regularization reduces variance at the cost of bias

- **L2 (Ridge)** — adds `λ‖w‖²` to the loss; shrinks all weights toward zero but never exactly to zero. Reduces variance; good default
- **L1 (Lasso)** — adds `λ‖w‖₁`; drives some weights exactly to zero. Performs implicit feature selection
- **Dropout** — randomly sets activations to zero during training. Each forward pass uses a different subnetwork, preventing co-adaptation. Equivalent to ensembling exponentially many networks

:::note
The bias-variance decomposition is exact under squared loss. Under other loss functions it is approximate but the intuition holds. **In modern deep learning**, models are often heavily overparameterised yet generalise well — the classical U-curve does not hold at extreme model size. This is the "double descent" phenomenon: very large models enter a second descent in test error even as training error stays near zero.
:::
