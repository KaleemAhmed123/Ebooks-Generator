## Gradient descent: the algorithm

- Gradient descent is the downhill walk written as a rule you can run. One line:

$$ w \leftarrow w - \eta \, \nabla L(w) $$

- Read it: **new weight = old weight − step size × gradient**. Repeat until the gradient is near zero and the loss stops falling.
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

:::mint
```python
for step in range(1000):
    grad = compute_gradient(w)     # slope of the loss at w
    w = w - lr * grad              # step downhill
```
:::

:::warn
Too small and training takes thousands of needless steps. Too large and the loss oscillates or blows up to `nan`. There is no formula for the right value; with the Adam optimizer, `3e-4` is the standard starting guess.
:::
