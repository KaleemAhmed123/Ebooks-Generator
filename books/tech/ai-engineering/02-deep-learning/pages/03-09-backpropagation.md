## Backpropagation

- **Backpropagation** works out how much each weight contributed to the loss, so we know which way to nudge it.
- It applies the **chain rule** (Booklet 1) backward through the network: start at the loss, walk to the inputs, multiplying the local slope at every step.
- One backward pass yields *every* weight's gradient at once. This is reverse-mode automatic differentiation (Booklet 1), applied to a loss.

<svg viewBox="0 0 400 100" role="img" aria-label="Forward arrows carry data left to right; backward arrows carry gradients right to left through the same layers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="30" y="40" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="65" y="57" text-anchor="middle">layer 1</text>
  <rect x="165" y="40" width="70" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="57" text-anchor="middle">layer 2</text>
  <rect x="300" y="40" width="70" height="26" rx="3" fill="#1a3a2a"/><text x="335" y="57" text-anchor="middle" fill="#fff">loss</text>
  <g stroke="#24405e"><path d="M100 47 L163 47" marker-end="url(#a)"/><path d="M235 47 L298 47" marker-end="url(#a)"/></g>
  <text x="200" y="34" text-anchor="middle" fill="#24405e">forward: data →</text>
  <g stroke="#c0392b"><path d="M298 60 L235 60" marker-end="url(#b)"/><path d="M163 60 L100 60" marker-end="url(#b)"/></g>
  <text x="200" y="82" text-anchor="middle" fill="#c0392b">← backward: gradients</text>
  <defs><marker id="a" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#24405e"/></marker><marker id="b" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#c0392b"/></marker></defs>
</svg>

:::mint
```python
loss = cross_entropy(model(x), y)
loss.backward()          # backprop: fills every weight's .grad
layer.weight.grad        # d(loss)/d(weight), ready for the optimizer
```
:::

:::note
Backprop is not the learning — it only *computes* gradients. The optimizer (next pages) uses them to change the weights. Backprop answers one question, cheaply and exactly: which way is downhill for every weight?
:::
