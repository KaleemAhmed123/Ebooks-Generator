## What actually limits how many concurrent requests a GPU can serve?

- Usually **not** compute — it's **GPU memory for the KV cache**. Memory splits into:
  - **Model weights** (fixed) — e.g. a 70B model in fp16 ≈ 140 GB; quantized 4-bit ≈ 35 GB.
  - **KV cache** (grows with concurrency × sequence length) — this is the elastic part that fills whatever weights leave free.
  - **Activations/overhead**.
- So concurrency ≈ (GPU memory − weights − overhead) ÷ (KV cache per request). Longer contexts and more users eat the budget fast.
- Levers to serve more at once:
  - **Shrink weights** (quantization) → more room for KV cache.
  - **Shrink KV per request** (GQA, KV-cache quantization, shorter contexts).
  - **Use memory efficiently** (PagedAttention, no fragmentation).
  - **Add GPUs** (tensor parallelism) when one can't hold weights + enough cache.
- Interview framing: capacity planning for LLM serving is a **KV-cache memory budget** calculation, not a QPS one.

:::interview
What's really being tested: that concurrency is KV-cache-memory-bound, that you can decompose GPU memory, and name the levers (quantize weights, shrink KV via GQA, paging, add GPUs).
:::
