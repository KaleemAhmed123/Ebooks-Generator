## Backpropagation — all gradients in one pass

- **Backpropagation** is reverse-mode autodiff applied to a neural network. One forward pass stores all intermediate values; one backward pass computes all weight gradients. A network with 2M weights gets all 2M gradients at the cost of ~2× the forward pass — not 2M forward passes
- The algorithm applies the **chain rule** from output to input: `dL/dW = dL/da · da/dz · dz/dW`. Each node multiplies the upstream gradient by its local derivative and passes the result downstream
- Every node stores what it needs for backward: inputs to a multiply, pre-activation values for sigmoid. This memory-for-speed tradeoff is the core cost of training

### Forward → backward — the full picture for one neuron

<svg viewBox="0 0 460 68" role="img" aria-label="Single neuron forward: x times w plus b through sigmoid to loss. Backward: dL starts at 1, flows back as dL/da then dL/dz then dL/dw and dL/db" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8.5" fill="#1a1a1a">
  <!-- forward -->
  <text x="10" y="18" font-weight="bold">→</text>
  <rect x="28" y="8" width="52" height="20" rx="2" fill="none" stroke="#1a1a1a"/>
  <text x="54" y="21" text-anchor="middle">z = wx+b</text>
  <path d="M80 18 L100 18" stroke="#1a1a1a" fill="none"/>
  <rect x="100" y="8" width="72" height="20" rx="2" fill="none" stroke="#1a1a1a"/>
  <text x="136" y="21" text-anchor="middle">a = σ(z)</text>
  <path d="M172 18 L192 18" stroke="#1a1a1a" fill="none"/>
  <rect x="192" y="8" width="72" height="20" rx="2" fill="#1a3a2a" stroke="#1a3a2a"/>
  <text x="228" y="21" text-anchor="middle" fill="#fff">L = (a−y)²</text>
  <!-- backward -->
  <text x="10" y="52" font-weight="bold">←</text>
  <text x="28" y="52" font-size="8" fill="#1a3a2a">dL/dw = dL/dz·x</text>
  <text x="105" y="52" font-size="8" fill="#1a3a2a">dL/dz = dL/da·σ'</text>
  <text x="194" y="52" font-size="8" fill="#1a3a2a">dL/da = 2(a−y)</text>
  <text x="350" y="52" font-size="8" fill="#6b6b6b">dL/dL = 1</text>
</svg>

### Backprop in NumPy — two-layer network

:::mint
```python
# backward pass — stored activations reused
dL_da2 = 2 * (a2 - y)
dL_dz2 = dL_da2 * a2 * (1 - a2)        # sigmoid'(z2) = a2(1-a2)
dL_dW2 = dL_dz2 * a1.T
dL_da1 = W2.T @ dL_dz2
dL_dz1 = dL_da1 * a1 * (1 - a1)        # chain through hidden layer
dL_dW1 = dL_dz1 @ x.T
```
:::

### Vanishing gradients — quantified

At each sigmoid layer, the gradient is multiplied by `σ'(z) ≤ 0.25`. After k layers: gradient × 0.25ᵏ.

| Layers | Gradient scale |
|---|---|
| 3 | × 0.016 |
| 5 | × 0.001 |
| 10 | × 10⁻⁶ |

First-layer weights learn ~1,000,000× slower than last-layer weights in a 10-layer sigmoid network. The solution is ReLU — covered on the next page.

:::note
PyTorch's `autograd` engine is the production version of this. It builds the same computational graph during the forward pass and traverses it backward on `loss.backward()`. The difference is it uses `C++` under the hood and handles any differentiable operation, not just the four primitives we derived here.
:::
