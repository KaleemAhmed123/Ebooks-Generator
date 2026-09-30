## Debugging and profiling ML code

- ML code fails in a way ordinary code does not: it often **runs fine and produces garbage**. No crash, no error — just a loss that will not fall or predictions that are nonsense.
- So debugging is less about stack traces and more about inspecting shapes, values, and gradients.

### The first things to check when a model won't learn

- **Shapes.** Print `.shape` at every step. A silent broadcasting mistake (Module 1) is the most common cause of quietly wrong results.
- **The data.** Look at a real batch. Mislabelled, unscaled, or all-zero inputs beat any model. Most "model" bugs are data bugs.
- **Loss on step one.** For `n`-class classification, an untrained model's loss should be about `ln(n)`. Far off means a broken loss or labels.
- **Overfit a tiny sample.** A correct model should drive the loss to near zero on 10 examples. If it cannot, the bug is in the code, not the data size.

### Profiling: find where time goes

- When training is slow, measure before you optimize. The PyTorch profiler shows whether time is spent in compute, in data loading, or waiting on the CPU.
- `nvidia-smi` (from the terminal page) is the ten-second version: low GPU utilization points at the input pipeline, not the model.

:::note
"Overfit a single batch" is the most useful debugging trick in deep learning. If your model cannot memorize ten examples, no amount of data or tuning will help — the problem is a bug, and you have just isolated it to the code.
:::
