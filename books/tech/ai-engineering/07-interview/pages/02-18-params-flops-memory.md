## Parameters, FLOPs, and memory — what's the difference and why track all three?

- **Parameters** = the learned weights (a count). Sets model file size and, roughly, capacity.
- **FLOPs** = floating-point operations per forward/backward pass (a compute cost). Sets how long a step or a token takes on given hardware.
- **Memory** = what must sit in GPU RAM at once: weights **+ activations + gradients + optimizer state**. This, not parameter count, is usually what OOM-kills training.
- They scale differently. Training memory dwarfs inference memory because you cache activations (for backprop) and the optimizer (Adam) stores two extra values per parameter — so Adam training needs roughly **4× the weight memory** just for state.

:::mint
```text
Adam training memory ≈ weights (×1) + grads (×1) + Adam m,v (×2)  = 4× weights
                        + activations (depends on batch × seq length)
```
:::

:::interview
What's really being tested:

that you don't conflate "small model" with "fits in memory" — activations and optimizer state dominate, which is why gradient checkpointing and 8-bit optimizers exist.
:::
