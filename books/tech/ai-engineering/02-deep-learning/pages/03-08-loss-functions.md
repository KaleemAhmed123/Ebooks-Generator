## Loss functions

- The **loss** is a single number measuring how wrong a prediction is. Lower is better. Training is the search for weights that make it small.
- **Regression** (predict a number): **mean squared error (MSE)** — the average of `(prediction − truth)²`. Squaring punishes big misses hard.
- **Classification** (predict a class): **cross-entropy** — it punishes a confident wrong answer far more than a hesitant one.

:::mint
```python
import numpy as np
def mse(pred, true):
    return np.mean((pred - true) ** 2)

def cross_entropy(probs, true_idx):        # probs sum to 1
    return -np.log(probs[true_idx] + 1e-9) # 1e-9 guards log(0)
```
:::

- Cross-entropy reads the probability the model gave the *correct* class. Assign the truth 0.9 and the loss is small; assign it 0.01 and the loss explodes.

:::warn
Match the loss to the task. Use MSE on a classifier and the gradients crawl; use cross-entropy and a confident mistake produces a large, useful gradient. The loss decides what the model bothers to fix — pick the wrong one and training stalls for no obvious reason.
:::
