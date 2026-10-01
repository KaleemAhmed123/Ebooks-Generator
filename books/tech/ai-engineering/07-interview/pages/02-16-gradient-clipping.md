## What is gradient clipping, and when do you need it?

- **Gradient clipping** caps the gradient before the optimiser step — either by value or, more commonly, by **global norm** (if the total gradient norm exceeds a threshold, scale the whole gradient down to it).
- It directly prevents **exploding gradients**: one bad batch producing a huge gradient would otherwise take a giant, destructive step (often straight to NaN). Clipping bounds the step size.
- You need it most in **recurrent nets and transformers**, and in any training that occasionally sees pathological batches or uses a high learning rate. Clip-by-norm (e.g. max norm 1.0) is the standard.
- It treats the symptom (big steps), not the cause. Pair it with good init, normalisation, and a sane learning rate.

:::mint
```text
if ‖g‖ > c:  g ← g · c / ‖g‖     # clip-by-global-norm, preserves direction
```
:::

:::interview
What's really being tested:

that clipping bounds the *step*, why clip-by-norm preserves direction, and that it's a symptom-level safety net alongside the real fixes.
:::
