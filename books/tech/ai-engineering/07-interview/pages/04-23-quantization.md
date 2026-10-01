## What is quantization, and why does it matter for serving LLMs?

- **Quantization** stores model weights (and sometimes activations) in fewer bits — e.g. 16-bit floats down to **8-bit or 4-bit integers**. Fewer bits per weight → less memory and faster memory movement.
- Why it matters: LLM inference is **memory-bound**, and model size sets how much GPU you need. Quantizing a 70B model from bf16 (~140 GB) to 4-bit (~35 GB) can drop it from four GPUs to one — a direct cost cut, often with faster decoding too.
- The idea: map a range of float values onto a small integer grid using a **scale** (and sometimes zero-point) per group of weights. Dequantize on the fly during compute.
- The tension: too few bits, or a bad scheme, loses accuracy — especially on **outlier** weights/activations that don't fit a uniform grid. Good methods protect those outliers.

:::interview
**What's really being tested:** that quantization trades precision for memory/speed, why that's the right trade for memory-bound inference, and awareness that outliers are what break naive schemes.
:::
