## Choosing to self-host

- Self-hosting is a build decision with four inputs: **which GPU, how many, which engine, and who runs it.** Get any one wrong and you either overpay or miss your SLA.
- Start from the model's memory footprint, because that sets the GPU floor.

:::mint
```text
Weights in memory ≈ params × bytes/param
  70B in FP16  = 70e9 × 2   = 140 GB  -> needs 2× H100-80GB (tensor-parallel)
  70B in FP8   = 70e9 × 1   =  70 GB  -> fits 1× H100-80GB, room for KV cache
  70B in INT4  = 70e9 × 0.5 =  35 GB  -> fits 1× 48GB GPU (L40S/A6000)

Then add KV-cache headroom (grows with context × concurrency)
and ~10–20% runtime overhead. Never size to the weights alone.
```
:::

- **GPU choice** follows: H100/H200 for frontier throughput, L40S/A6000 for cost-sensitive INT4 serving, B200/GB200 for the largest models and FP4. **[VERIFY current SKUs]**
- **Engine choice** is the next cluster: vLLM (general default), SGLang (shared-prefix / structured workloads), TensorRT-LLM (peak NVIDIA performance at a compile cost).
- **Who runs it** is the hidden cost. Self-hosting is not just GPU rent — it is on-call, upgrades, autoscaling, and a serving engine that changes monthly. Budget an engineer, not just a GPU.

:::warn
The most common self-host mistake is sizing to the weights and forgetting the **KV cache**. A 70B in FP8 fits an 80 GB card with ~10 GB to spare — but at 8k context and 32 concurrent users the KV cache alone can exceed that 10 GB, and the server starts preempting requests. Size for weights **plus** peak KV, or your throughput collapses under load.
:::
