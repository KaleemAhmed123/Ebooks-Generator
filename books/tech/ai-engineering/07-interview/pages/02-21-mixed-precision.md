## What is mixed-precision training, and what breaks in fp16 that bf16 fixes?

- **Mixed precision** does most math in 16-bit floats (half the memory, faster on tensor cores) while keeping a 32-bit master copy of the weights for accuracy.
- **fp16** has a narrow exponent range: small gradients **underflow to zero**, large values **overflow to inf**. The fix is **loss scaling** — multiply the loss by a large factor before backprop so small gradients survive, then unscale before the step.
- **bf16** (bfloat16) keeps fp32's exponent range but fewer mantissa bits. It can't underflow/overflow the same way, so it usually needs **no loss scaling** — simpler and more robust. It's the default on modern training hardware.
- Net effect: ~2× memory saving and large speedups, which is why essentially all large-model training is mixed precision.

:::interview
What's really being tested:

the range-vs-precision distinction — fp16 needs loss scaling because of its tiny exponent range; bf16 trades mantissa bits to keep the range and skip that hack.
:::
