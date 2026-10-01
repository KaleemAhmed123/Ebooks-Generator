## How does QLoRA let you fine-tune a 70B model on a single GPU?

- **QLoRA** combines two ideas: **quantize the frozen base model to 4-bit** (so it barely fits in memory) and train only small **LoRA adapters** on top in higher precision.
- The base weights are stored in **NF4** (a 4-bit type optimised for the normal distribution weights follow) and **dequantized on the fly** for each forward/backward pass — they're never updated, so 4-bit is fine for them.
- Only the LoRA adapters (a tiny fraction of parameters) carry gradients and optimizer state, so training memory collapses. Add **double quantization** (quantize the quantization constants) and **paged optimizers** (offload spikes to CPU) and a 65–70B fine-tune fits on one ~48 GB GPU. [VERIFY: NF4/double-quant details.]
- The headline result: near-full-fine-tune quality at a fraction of the memory, which democratised LLM fine-tuning.

:::interview
**What's really being tested:** the split — frozen base in 4-bit NF4 (dequantized per pass), trainable adapters in higher precision — plus double quantization and paged optimizers as the memory tricks.
:::
