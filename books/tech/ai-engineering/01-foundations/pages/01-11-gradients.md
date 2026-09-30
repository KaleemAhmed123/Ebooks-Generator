## The gradient: slope in every direction at once

- A model has millions of weights, not one. The **gradient** is the derivative generalized to many inputs.
- It is a **vector**: one slope per weight, packed together. Written `∇f` ("del f").
- Each entry says how the output changes if you nudge *that one* weight, holding the rest still (a **partial derivative**).

$$ \nabla f = \left[\frac{\partial f}{\partial w_1},\ \frac{\partial f}{\partial w_2},\ \dots,\ \frac{\partial f}{\partial w_n}\right] $$

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

:::note
"Take a step in the direction of the negative gradient" is the one sentence behind training every model in this book. The page on gradient descent turns it into an algorithm.
:::
