## Quantization economics, worked

- Put the serving win in numbers. Llama-70B on H100-80GB cards, 8k context, and what precision does to capacity and cost.

:::mint
```text
                        FP16        FP8         INT4(AWQ)
weights                 140 GB      70 GB       35 GB
GPUs needed (80GB)      2 (TP)      1           1
KV headroom / GPU       tight       ~10 GB      ~45 GB
max concurrent 8k reqs  ~limited    ~30         ~130
------------------------------------------------------
relative $/1M tokens    1.0×        ~0.45×      ~0.30×
  (fewer GPUs + more users per GPU both cut unit cost)
quality vs FP16         =           ~=          eval it!
```
:::

- **Two compounding wins.** Fewer GPUs to hold the weights (2→1), *and* more concurrent users per GPU because the freed VRAM becomes KV cache. Both push cost-per-token down — INT4 here is roughly a 3× unit-cost cut over FP16.
- **The break-even is quality, not memory.** FP8 is nearly free quality-wise, so it is a default yes. INT4's extra saving is only real if your eval shows the quality drop is acceptable for the task — a summariser may tolerate it; a code generator or a strict-JSON tool-caller may not.

:::interview
**"How would you halve our inference bill?"** Quantisation is the first lever, and I would stage it: turn on **FP8** everywhere (near-lossless on H100/Blackwell, roughly halves memory → fewer GPUs and more concurrency). Then evaluate **INT4/AWQ** per workload — it can cut unit cost ~3× but must pass the task's own eval, because 4-bit degrades code, long-context, and strict formatting first. I would quote the win as *cost-per-1M-tokens at the SLO*, not just "less memory," and gate INT4 on an eval diff, never a benchmark.
:::
