## Intro to JAX (brief)

- **JAX** is Google's alternative to PyTorch. Same job — tensors, autodiff, GPU — but a different philosophy: your model is a **pure function**, and JAX transforms it.
- Pure means no hidden state: weights go in as an argument, outputs come out, nothing is mutated. This makes the code easy to transform automatically.
- Four transforms do the heavy lifting, and they compose.

:::mint
```python
import jax, jax.numpy as jnp
def loss(params, x, y): ...

grad_fn = jax.grad(loss)          # autodiff: returns the gradient function
fast    = jax.jit(loss)           # compile to fused GPU/TPU code
batched = jax.vmap(loss)          # auto-vectorize over a batch
```
:::

- `grad` differentiates, `jit` compiles for speed, `vmap` vectorises over a batch, and `pmap` spreads work across many devices. You write plain maths; the transforms handle gradients, speed, and scale.

:::note
Use PyTorch as your default — the ecosystem, tutorials, and model hubs are larger. Reach for JAX when you need heavy TPU training or the compiler's speed on large-scale research. The concepts you learned transfer directly; only the syntax changes.
:::
