### Floating-point format comparison

| Format | Bits | Max value | Mantissa digits | When to use |
|---|---|---|---|---|
| float64 | 64 | 1.8×10³⁰⁸ | ~15 | scientific computing, not deep learning |
| **float32** | 32 | 3.4×10³⁸ | ~7 | default training precision |
| **bfloat16** | 16 | 3.4×10³⁸ | ~2–3 | mixed-precision training (bf16 preferred) |
| float16 | 16 | 65,504 | ~3–4 | inference only; too small for training |

:::warn
When your loss is `NaN`, the cause is almost always: (1) logits overflowing softmax, (2) `log(0)` from a zero probability, or (3) `0/0` in a gradient. Add `torch.autograd.set_detect_anomaly(True)` to find the exact operation that produced the first NaN. Then apply the appropriate stability fix — usually log-sum-exp or clamping inputs away from zero.
:::
