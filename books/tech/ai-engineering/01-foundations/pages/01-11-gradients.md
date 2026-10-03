## The gradient: slope in every direction at once

- A model has millions of weights, not one. The **gradient** is the derivative generalized to many inputs.
- It is a **vector**: one slope per weight, packed together. Written `∇f` ("del f").
- Each entry says how the output changes if you nudge *that one* weight, holding the rest still (a **partial derivative**).


### The one fact that makes training work

- The gradient points in the direction of **steepest increase** of the function.
- So its opposite, `−∇f`, points in the direction of steepest *decrease* — the fastest way to shrink the error.

<svg viewBox="0 0 300 130" role="img" aria-label="Contour lines of a valley with an arrow pointing uphill labelled gradient and the opposite arrow pointing downhill toward the minimum" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <ellipse cx="150" cy="65" rx="120" ry="50" fill="none" stroke="#ddd"/>
  <ellipse cx="150" cy="65" rx="80" ry="33" fill="none" stroke="#ccc"/>
  <ellipse cx="150" cy="65" rx="40" ry="16" fill="none" stroke="#bbb"/>
  <circle cx="150" cy="65" r="3" fill="#1a3a2a"/><text x="150" y="60" text-anchor="middle" fill="#1a3a2a">min</text>
  <circle cx="235" cy="90" r="3" fill="#1a1a1a"/>
  <line x1="235" y1="90" x2="270" y2="105" stroke="#c0392b" stroke-width="2" marker-end="url(#g)"/>
  <text x="255" y="122" fill="#c0392b">∇f (uphill)</text>
  <line x1="235" y1="90" x2="190" y2="72" stroke="#24405e" stroke-width="2" marker-end="url(#g)"/>
  <text x="150" y="90" fill="#24405e">−∇f (downhill)</text>
  <defs><marker id="g" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="currentColor"/></marker></defs>
</svg>

### Worked example — two weights, one bowl

Imagine the simplest possible error surface: **E = w1² + w2²**. It is a bowl — the
minimum sits at `(0, 0)` where the error is zero.

| | w1 | w2 | gradient entry | meaning |
|---|---|---|---|---|
| Current weights | 3 | 1 | — | — |
| Partial derivative of E w.r.t. w1 | — | — | 2 × 3 = **6** | error rises fast if w1 grows |
| Partial derivative of E w.r.t. w2 | — | — | 2 × 1 = **2** | error rises slowly if w2 grows |

- The gradient at `(3, 1)` is the vector **(6, 2)** — it points uphill.
- Flip the sign → **(−6, −2)** points **downhill**, toward lower error.
- The 6 is larger than the 2, so `w1` needs a bigger correction. The gradient tells you that automatically.

:::mint
```python
import torch
w = torch.tensor([3.0, 1.0], requires_grad=True)
E = (w ** 2).sum()      # E = w1² + w2² = 9 + 1 = 10
E.backward()             # compute the gradient
print(w.grad)            # tensor([6., 2.])
```
:::

:::note
"Take a step in the direction of the negative gradient" is the one sentence behind training every model in this book. The page on gradient descent turns it into an algorithm — using these same numbers.
:::
