## Overfitting and regularization

- **Overfitting** is the central failure of ML: the model learns the training data's noise instead of its pattern, and falls apart on new data.
- **Regularization** is any technique that fights it — usually by discouraging the model from growing too complex.

### The main levers

- **L2 (Ridge)** — add a penalty for large weights to the loss. The model must justify every bit of weight with error reduction, so it stays smooth. Shrinks weights toward zero.
- **L1 (Lasso)** — penalize the *absolute* size of weights. This drives many exactly to zero, doubling as feature selection.
- **More data** — the strongest regularizer of all. Harder to memorize a large, varied dataset than a small one.
- **Early stopping** — halt training when validation error starts rising, before the model begins memorizing.

$$ \text{Loss}_{\text{total}} = \text{Loss}_{\text{data}} + \lambda \sum_i w_i^2 \quad (\text{L2}) $$

- `λ` (lambda) sets the strength: 0 means no regularization; too large forces the model toward a flat, underfit line.

:::note
Every regularizer encodes the same bet — that the *simpler* explanation generalizes better. In deep learning you will meet the same idea wearing new names: dropout, weight decay, and data augmentation are all regularization.
:::
