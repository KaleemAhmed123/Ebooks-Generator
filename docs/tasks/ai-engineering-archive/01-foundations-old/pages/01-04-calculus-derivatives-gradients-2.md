### Gradient in high dimensions

:::note
The gradient of a loss over n weights is an n-dimensional vector. For a 7B parameter model, n ≈ 7 × 10⁹. Backpropagation computes all 7 billion gradients in roughly the same time as one forward pass — that is the efficiency that makes deep learning tractable.
:::

:::warn
The **learning rate η** is the single most important hyperparameter. Too large: weight updates overshoot minima, loss oscillates or diverges. Too small: training converges in months. A safe default to start: `η = 3e-4` with Adam. Halve it if loss is unstable; double it if convergence is visibly slow.
:::
