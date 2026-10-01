## How much accuracy does quantization cost, and how do you measure it?

- There's no single number — it depends on bit-width, method, and model. Rough shape: **8-bit** is usually near-lossless; **4-bit** with a good method (AWQ/GPTQ) loses a little; **≤3-bit** degrades noticeably without QAT.
- Don't trust a single benchmark. Measure on **your** workload:
  - Run your **task evals** (not just perplexity) on the quantized vs full model.
  - Watch for **uneven degradation** — quantization often hits reasoning, long-context, and rare-domain tasks harder than easy ones, so an average can hide a cliff.
  - Check **tail behaviour** — formatting, code correctness, non-English — where errors concentrate.
- Decision frame: quantize as aggressively as your eval tolerates, then back off one step for safety margin. The savings are real, but verify per use-case rather than assuming "4-bit is fine."

:::warn
Perplexity barely moving does **not** mean your task is safe. Quantization can leave perplexity almost unchanged while measurably hurting multi-step reasoning or code. Always run task-level evals.
:::

:::interview
**What's really being tested:** that you measure quantization impact with task evals on your own data, know it degrades unevenly, and don't rely on perplexity or a public benchmark.
:::
