# AI Engineering: From Scratch

## Gradients & Optimization

Derivatives dictate which way is downhill. That is all a neural network needs to learn.

### Partial Derivatives and The Gradient

A partial derivative holds all variables constant except one, measuring how much a single weight affects the total loss. The gradient ($\nabla L$) collects every partial derivative into a single vector pointing in the direction of steepest ascent. 

$$ \nabla L = \left[ \frac{\partial L}{\partial w_1}, \frac{\partial L}{\partial w_2}, \dots, \frac{\partial L}{\partial w_n} \right] $$

### Gradient Descent

Training a neural network is an optimization problem in a high-dimensional loss landscape. To minimize the error, you subtract a small multiple of the gradient from the current weights.

```python
# Gradient descent update rule
learning_rate = 0.01

# For each training step:
# 1. Compute the gradient of the loss with respect to weights
grad = compute_gradient(loss_fn, weights)

# 2. Step in the exact opposite direction of steepest ascent
weights = weights - (learning_rate * grad)
```

<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg">
  <path d="M 50 20 Q 200 150 350 20" fill="transparent" stroke="black" stroke-width="2"/>
  <!-- Tangent line -->
  <line x1="80" y1="30" x2="160" y2="120" stroke="#ef4444" stroke-width="2"/>
  <!-- Gradient point -->
  <circle cx="120" cy="75" r="4" fill="#ef4444"/>
  <text x="70" y="80" font-family="sans-serif" font-size="14" fill="#ef4444">dL/dw</text>
  
  <!-- Minimum point -->
  <circle cx="200" cy="103" r="4" fill="#3b82f6"/>
  <text x="180" y="120" font-family="sans-serif" font-size="14" fill="#3b82f6">Minimum</text>
  
  <!-- Step arrow -->
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#10b981"/>
    </marker>
  </defs>
  <path d="M 125 78 Q 160 105 190 105" fill="transparent" stroke="#10b981" stroke-width="2" stroke-dasharray="4" marker-end="url(#arrow)"/>
  <text x="145" y="90" font-family="sans-serif" font-size="12" fill="#10b981">Step</text>
</svg>
