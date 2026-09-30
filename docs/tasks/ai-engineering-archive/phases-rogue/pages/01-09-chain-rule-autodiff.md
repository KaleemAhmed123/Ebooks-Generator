# AI Engineering: From Scratch

## Chain Rule & Reverse-Mode Autodiff

The output of a neural network is a function of a function of a function. Extracting gradients for millions of nested weights requires systematic unrolling via the chain rule.

$$ \frac{dy}{dx} = \frac{dy}{dg} \cdot \frac{dg}{dx} = f'(g(x)) \cdot g'(x) $$

### Computational Graphs

Every mathematical operation in a forward pass acts as a node in a directed acyclic graph. Reverse-mode automatic differentiation (backpropagation) starts at the loss scalar ($dL/dL = 1$) and propagates derivatives backward along every edge.

<svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="fw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
    </marker>
    <marker id="bw" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/>
    </marker>
  </defs>
  
  <rect x="50" y="50" width="40" height="40" rx="5" fill="#e2e8f0" stroke="black"/>
  <text x="70" y="75" font-family="monospace" text-anchor="middle">W</text>
  
  <rect x="180" y="50" width="40" height="40" rx="5" fill="#e2e8f0" stroke="black"/>
  <text x="200" y="75" font-family="monospace" text-anchor="middle">@</text>

  <rect x="310" y="50" width="40" height="40" rx="5" fill="#e2e8f0" stroke="black"/>
  <text x="330" y="75" font-family="monospace" text-anchor="middle">L</text>

  <!-- Forward edges -->
  <line x1="90" y1="60" x2="175" y2="60" stroke="#3b82f6" stroke-width="2" marker-end="url(#fw)"/>
  <text x="135" y="50" font-family="sans-serif" font-size="12" fill="#3b82f6" text-anchor="middle">Forward Pass</text>

  <line x1="220" y1="60" x2="305" y2="60" stroke="#3b82f6" stroke-width="2" marker-end="url(#fw)"/>

  <!-- Backward edges -->
  <line x1="310" y1="80" x2="225" y2="80" stroke="#ef4444" stroke-width="2" marker-end="url(#bw)"/>
  <line x1="180" y1="80" x2="95" y2="80" stroke="#ef4444" stroke-width="2" marker-end="url(#bw)"/>
  <text x="135" y="100" font-family="sans-serif" font-size="12" fill="#ef4444" text-anchor="middle">Backward Gradients</text>
</svg>

### Forward vs Reverse Mode

- **Forward Mode:** Computes gradients by pushing derivatives from input to output. Requires one complete pass *per input parameter*. Disastrous for neural networks (millions of inputs).
- **Reverse Mode:** Computes gradients by pulling derivatives from output to input. Requires exactly one pass to compute all gradients simultaneously. This structural reality is the sole reason neural networks scale.
