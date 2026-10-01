## What does backpropagation actually compute, and why is it efficient?

- **Backpropagation** computes the gradient of the loss with respect to every weight — how much each weight should change to reduce the error.
- It is just the **chain rule** applied in reverse. A forward pass computes and caches each layer's output; the backward pass walks layers in reverse, multiplying local derivatives and reusing the cached values.
- The efficiency win: a naive approach would recompute shared sub-expressions for every weight. Backprop computes each intermediate derivative **once** and reuses it — the whole gradient costs about the same as *one* forward pass, not one-per-weight.
- It is not an optimiser. Backprop produces the gradient; **SGD/Adam** decide the step. People conflate the two.

:::warn
Backprop needs the forward activations cached — that's why training memory ≫ inference memory, and why activation checkpointing (recompute instead of store) is a real lever on large models.
:::

:::interview
What's really being tested:

that you know it's reverse-mode autodiff (chain rule + reuse), distinct from the optimiser, and that caching activations is what costs training memory.
:::
