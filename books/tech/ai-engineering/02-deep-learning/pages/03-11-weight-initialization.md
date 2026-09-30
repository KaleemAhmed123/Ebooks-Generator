## Weight initialization

- Before training starts, every weight needs a starting value. Set them all to zero and every neuron in a layer computes the same thing forever — they never differentiate. So we start **random**.
- But the *scale* of that randomness matters enormously. Too large and signals explode layer by layer; too small and they fade to nothing.
- The fix is to scale the random spread by the number of inputs to each neuron, keeping the signal's size roughly constant through the network.

:::mint
```python
import torch.nn as nn
layer = nn.Linear(256, 256)
nn.init.kaiming_normal_(layer.weight, nonlinearity="relu")  # for ReLU nets
nn.init.xavier_normal_(layer.weight)                        # for tanh/sigmoid
```
:::

- **Kaiming (He) init** — scaled for ReLU layers. **Xavier (Glorot) init** — scaled for tanh/sigmoid. Frameworks apply a sensible default, but the right one still matters for deep stacks.

:::warn
Bad init causes **vanishing** or **exploding gradients**: the loss sits flat (nothing learns) or blows up to `NaN` (not-a-number) in the first few steps. Before blaming the model, check the init and the learning rate — they cause most first-minute failures.
:::
