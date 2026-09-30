## Why nonlinearity matters

- Between layers you apply a **nonlinear** function — one whose graph is not a straight line. Without it, depth buys you nothing.
- Reason: stacking linear maps gives another linear map. `W2 (W1 x) = (W2 W1) x` — still one matrix. A hundred linear layers collapse into one.
- The nonlinearity is what lets each layer add genuinely new shape the previous layers could not make.

:::mint
```python
import numpy as np
W1 = np.random.randn(4, 3); W2 = np.random.randn(2, 4)
x = np.random.randn(3)
stacked   = W2 @ (W1 @ x)        # two linear layers
collapsed = (W2 @ W1) @ x        # one equivalent layer
np.allclose(stacked, collapsed)  # True -> depth added nothing
```
:::

:::warn
Forget the activation and your deep network silently becomes a single linear model. It still trains and runs — it just quietly underfits everything with a curve in it. The tell-tale sign: adding more layers does not improve the loss at all.
:::
