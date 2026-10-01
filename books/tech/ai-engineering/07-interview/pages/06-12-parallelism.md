## The model doesn't fit on one GPU. What are your options?

- When weights + KV cache exceed one GPU, you split the model across GPUs. Three axes (often combined):
  - **Tensor parallelism (TP)** — split each layer's matrices across GPUs; they compute one layer together, communicating every layer. Needs **fast interconnect** (NVLink); best within a single node. Cuts per-GPU memory and latency.
  - **Pipeline parallelism (PP)** — put different *layers* on different GPUs; a request flows through the stages. Less communication, works across nodes, but introduces pipeline "bubbles" (idle stages).
  - **Data parallelism (DP)** — replicate the whole model across GPUs to serve more requests (throughput), not to fit a bigger model.
- Also **expert parallelism** for MoE (experts spread across GPUs).
- Serving choice: use **TP within a node** (fast links) to fit/accelerate a big model, **PP across nodes** when it spans machines, **DP** to scale throughput once it fits. Before any of this, try **quantization** — it may let the model fit on one GPU and avoid the communication cost entirely.

:::interview
What's really being tested: TP (split layers' tensors, needs NVLink) vs PP (split by layer, across nodes) vs DP (replicate for throughput), and the instinct to quantize first to avoid splitting.
:::
