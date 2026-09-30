## Multi-layer networks and the forward pass

- A **multi-layer perceptron** (MLP) stacks layers: input → hidden → output. Each layer learns a new representation of the data. The first layer carves the input space; each subsequent layer recombines those features
- **Hidden state** — the output vector of a hidden layer. Not observed in training data; entirely learned. The network's internal language for representing the input
- **Forward pass** — data flowing left to right through the network, computing each layer's `activation(W·x + b)`. No gradients, no learning — pure matrix multiplication + nonlinearity

### Layer computation and shapes

<svg viewBox="0 0 460 84" role="img" aria-label="Three-layer MLP: input 2 nodes, hidden 3 nodes, output 1 node. Arrows show full connectivity. Each edge is a weight; each node applies sigmoid" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <!-- input -->
  <circle cx="40" cy="28" r="12" fill="none" stroke="#1a1a1a"/><text x="40" y="32" text-anchor="middle" font-size="8">x₁</text>
  <circle cx="40" cy="60" r="12" fill="none" stroke="#1a1a1a"/><text x="40" y="64" text-anchor="middle" font-size="8">x₂</text>
  <!-- hidden -->
  <circle cx="200" cy="18" r="12" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="22" text-anchor="middle" font-size="8">h₁</text>
  <circle cx="200" cy="44" r="12" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="48" text-anchor="middle" font-size="8">h₂</text>
  <circle cx="200" cy="70" r="12" fill="#e8f4fd" stroke="#24405e"/><text x="200" y="74" text-anchor="middle" font-size="8">h₃</text>
  <!-- output -->
  <circle cx="380" cy="44" r="14" fill="#1a3a2a" stroke="#1a3a2a"/><text x="380" y="48" text-anchor="middle" fill="#fff" font-size="8">ŷ</text>
  <!-- edges input→hidden -->
  <path d="M52 28 L188 18" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M52 28 L188 44" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M52 28 L188 70" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M52 60 L188 18" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M52 60 L188 44" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M52 60 L188 70" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <!-- edges hidden→output -->
  <path d="M212 18 L366 44" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M212 44 L366 44" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <path d="M212 70 L366 44" stroke="#1a1a1a" fill="none" stroke-width="0.7"/>
  <!-- labels -->
  <text x="120" y="78" text-anchor="middle" font-size="8" fill="#6b6b6b">W₁ (3×2), b₁ (3)</text>
  <text x="300" y="78" text-anchor="middle" font-size="8" fill="#6b6b6b">W₂ (1×3), b₂ (1)</text>
</svg>

### Forward pass in code — the complete picture

:::mint
```python
import numpy as np
def forward(x, W1, b1, W2, b2):
    h = sigmoid(W1 @ x + b1)   # hidden: shape (hidden_dim,)
    y = sigmoid(W2 @ h + b2)   # output: shape (1,)
    return h, y
```
:::

Each `@` is a matrix-vector multiply: `W1 @ x` transforms the input from 2D to 3D hidden space. Sigmoid then squashes each element to (0,1). The second layer combines the 3 hidden values into a single probability.

### Why nonlinearity is essential

Without an activation function, stacking two linear layers collapses to a single linear layer: `W₂(W₁x + b₁) + b₂ = (W₂W₁)x + c`. No matter how deep the network, it can only compute a linear function of the input. The activation function — sigmoid, ReLU, or any nonlinear function — is what makes depth meaningful.

:::warn
**The vanishing gradient problem with sigmoid.** When |z| is large, σ'(z) = σ(z)·(1−σ(z)) ≈ 0. Gradients multiplied through many sigmoid layers shrink toward zero; weights in early layers barely update. This is why deep networks used sigmoid for decades but rarely worked well past 3–4 layers. The fix — ReLU — is covered on the next page.
:::
