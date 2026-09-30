### Softmax converts logits to a Categorical distribution

:::mint
```python
import numpy as np
logits = np.array([2.0, 1.0, 0.1])
exp = np.exp(logits - logits.max())   # subtract max for numerical stability
probs = exp / exp.sum()               # [0.659, 0.242, 0.099]
```
:::

:::warn
**Never apply softmax before cross-entropy loss in training.** PyTorch's `nn.CrossEntropyLoss` (and JAX's `optax.softmax_cross_entropy_with_integer_labels`) applies log-softmax internally with better numerical stability. Applying softmax first then taking `torch.log` introduces floating-point error that silently degrades training.
:::
