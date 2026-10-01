# Deep Learning

## Why does a neural network need non-linear activation functions?

- An **activation function** is applied after each layer's linear step (`Wx + b`) to bend the signal.
- Without it, stacking layers is pointless: a composition of linear maps is **still one linear map**. A 50-layer net with no non-linearity has the exact expressive power of a single layer — it can only draw straight boundaries.
- Non-linearity (ReLU, GELU, tanh) lets the network **compose features**: curves, corners, and the hierarchical patterns that make depth worth anything.
- This is the whole reason deep learning beats linear models — each non-linear layer warps the space so the next layer's linear split can separate what was tangled.

:::mint
```text
no activation:  W₃(W₂(W₁x)) = (W₃W₂W₁)x = W'x   # collapses to linear
with activation: W₃·σ(W₂·σ(W₁x))                 # genuinely deep
```
:::

:::interview
What's really being tested:

that you can state the collapse-to-linear proof, not just say "it adds non-linearity." It's the one-line reason depth exists.
:::
