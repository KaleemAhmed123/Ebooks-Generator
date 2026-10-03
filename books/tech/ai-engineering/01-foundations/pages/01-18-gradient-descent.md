## Gradient descent: the algorithm

- Gradient descent is the downhill walk written as a rule you can run:

- The rule: **new weight = old weight − step size × gradient**. Repeat until the gradient is near zero and the loss stops falling.
- `η` (eta) is the **learning rate** — how big a step you take. It is the single most important knob in training.

### Getting the step size wrong

<svg viewBox="0 0 460 108" role="img" aria-label="Three learning rates: too small crawls, just right descends smoothly, too large overshoots and diverges" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <g transform="translate(0,0)">
    <path d="M20 20 Q60 90 100 78 Q140 66 155 80" fill="none" stroke="#ccc" stroke-width="1.5"/>
    <path d="M40 55 L52 62 L62 67 L70 71" fill="none" stroke="#24405e" marker-end="url(#s)"/>
    <text x="85" y="100" text-anchor="middle" font-weight="bold">too small</text>
    <text x="85" y="14" text-anchor="middle" fill="#6b6b6b">crawls, wastes steps</text>
  </g>
  <g transform="translate(155,0)">
    <path d="M20 20 Q60 90 100 78 Q140 66 155 80" fill="none" stroke="#ccc" stroke-width="1.5"/>
    <path d="M40 55 L70 76 L95 79" fill="none" stroke="#1a3a2a" stroke-width="1.5" marker-end="url(#s)"/>
    <text x="85" y="100" text-anchor="middle" font-weight="bold">just right</text>
    <text x="85" y="14" text-anchor="middle" fill="#6b6b6b">smooth descent</text>
  </g>
  <g transform="translate(305,0)">
    <path d="M20 20 Q60 90 100 78 Q140 66 155 80" fill="none" stroke="#ccc" stroke-width="1.5"/>
    <path d="M40 55 L95 82 L60 45 L120 88" fill="none" stroke="#c0392b" marker-end="url(#s)"/>
    <text x="85" y="100" text-anchor="middle" font-weight="bold">too large</text>
    <text x="85" y="14" text-anchor="middle" fill="#c0392b">overshoots, diverges</text>
  </g>
  <defs><marker id="s" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

### Worked example — continuing the two-weight bowl

Same setup as the gradient page: **E = w1² + w2²**, starting at `(w1, w2) = (3, 1)`.
The learning rate is `η = 0.1`.

| step | w1 | w2 | gradient | update | error E |
|---|---|---|---|---|---|
| 0 | 3.0 | 1.0 | (6.0, 2.0) | — | 10.00 |
| 1 | 3.0 − 0.1×6.0 = **2.4** | 1.0 − 0.1×2.0 = **0.8** | (4.8, 1.6) | stepped downhill | 6.40 |
| 2 | 2.4 − 0.1×4.8 = **1.92** | 0.8 − 0.1×1.6 = **0.64** | (3.84, 1.28) | stepped again | 4.10 |

- Every step, the error shrinks and both weights slide toward zero — the bottom of the bowl.
- The gradient shrinks too, so the steps naturally get smaller as you approach the minimum.

:::mint
```python
import torch
w = torch.tensor([3.0, 1.0], requires_grad=True)
lr = 0.1
for step in range(3):
    E = (w ** 2).sum()
    print(f"step {step}  w={w.data.tolist()}  E={E.item():.2f}")
    E.backward()
    with torch.no_grad():
        w -= lr * w.grad
    w.grad.zero_()
# step 0  w=[3.0, 1.0]  E=10.00
# step 1  w=[2.4, 0.8]  E=6.40
# step 2  w=[1.92, 0.64]  E=4.10
```
:::

:::warn
Too small and training takes thousands of needless steps. Too large and the loss oscillates or blows up to `nan`. There is no formula for the right value; with the Adam optimizer, `3e-4` is the standard starting guess.
:::
