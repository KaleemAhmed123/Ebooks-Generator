## Batch normalization

- **Batch normalization (batch norm)** rescales a layer's outputs so they have a steady mean and spread across the current batch of examples.
- As weights change, the range of numbers flowing between layers drifts. That drift forces every later layer to keep re-adapting, which slows training. Batch norm holds the range steady.
- The effect: you can train deeper networks, use higher learning rates, and lean less on careful initialisation.

:::mint
```python
import torch.nn as nn
block = nn.Sequential(
    nn.Linear(256, 256),
    nn.BatchNorm1d(256),   # normalize across the batch, then rescale
    nn.ReLU(),
)
```
:::

- Batch norm keeps two learnable knobs (a scale and a shift) so the network can undo the normalisation where it hurts. It also tracks a running average to use at inference, when there may be no batch.

:::warn
Batch norm depends on the batch, so it misbehaves with very small batches (its statistics get noisy). For batch sizes of 1–8, or for transformers, use **layer norm** instead — it normalises across features within one example and does not care about batch size.
:::
