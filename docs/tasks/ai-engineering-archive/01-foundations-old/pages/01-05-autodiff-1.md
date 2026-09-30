## Automatic differentiation — forward mode vs reverse mode

- **Autodiff** (automatic differentiation) — a technique that computes exact derivatives of any function expressed as code, by tracking operations in a **computational graph** and applying the chain rule mechanically. Not numerical approximation, not symbolic algebra — exact derivatives from the computation itself
- **Computational graph** — a DAG (directed acyclic graph) where each node is an operation (+, ×, sin, relu) and edges carry values or gradients. The forward pass computes values; the backward pass computes gradients
- PyTorch's `autograd`, TensorFlow's GradientTape, and JAX's `jax.grad` all implement reverse-mode autodiff

### Forward mode vs reverse mode

<svg viewBox="0 0 460 84" role="img" aria-label="Forward mode seeds at input and pushes derivatives forward; reverse mode seeds at output and pulls gradients backward" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <rect x="4" y="8" width="220" height="68" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="114" y="26" text-anchor="middle" font-weight="bold">Forward Mode</text>
  <text x="114" y="42" text-anchor="middle" fill="#6b6b6b">Seed: dx/dx = 1 at inputs</text>
  <text x="114" y="56" text-anchor="middle" fill="#6b6b6b">Direction: input → output</text>
  <text x="114" y="70" text-anchor="middle" fill="#6b6b6b">Best: few inputs, many outputs</text>
  <rect x="236" y="8" width="220" height="68" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="346" y="26" text-anchor="middle" font-weight="bold">Reverse Mode (Backprop)</text>
  <text x="346" y="42" text-anchor="middle" fill="#6b6b6b">Seed: dL/dL = 1 at output</text>
  <text x="346" y="56" text-anchor="middle" fill="#6b6b6b">Direction: output → inputs</text>
  <text x="346" y="70" text-anchor="middle" fill="#6b6b6b">Best: many inputs, one loss</text>
</svg>

Neural networks have millions of weights (inputs) and one loss (output). Reverse mode computes all gradients in one backward pass — same cost as the forward pass. Forward mode would require one pass per weight. That makes reverse mode 7,000,000,000× cheaper for a 7B model.
