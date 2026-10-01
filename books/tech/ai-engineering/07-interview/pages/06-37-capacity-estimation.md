## How do you do back-of-the-envelope capacity and cost estimation for LLM serving?

- Work from traffic → tokens → GPU-seconds → GPUs/cost.

:::mint
```text
Given: 100 req/s, avg 1,000 input + 500 output tokens.

Output tokens/s = 100 × 500 = 50,000 tok/s   (decode is the usual bottleneck)
If one GPU decodes ~2,500 tok/s for this model (with batching):
  GPUs for decode ≈ 50,000 / 2,500 = 20 GPUs
Add headroom (p99, failover, prefill): ~1.5× → ~30 GPUs.

Cost: 30 GPUs × ~$2.5/GPU-hr = ~$75/hr ≈ ~$54k/month.
Sanity-check vs API: 100 req/s × 1,500 tok × $X/1M tokens.
```
:::

- The numbers that drive it: **output tokens/sec** (decode throughput, the bottleneck), **per-GPU throughput** (model + hardware + batching), and **KV-cache memory** (sets how many requests batch at once).
- Always add **headroom** (you can't run at 100%; p99 + failover need slack) and **cross-check** self-host GPU cost against the equivalent API token bill.
- Interviewers want the *method and sanity-checks*, not exact constants — state your assumptions out loud.

:::interview
What's really being tested: that you can go traffic → tokens/s → GPUs → $ with stated assumptions, know decode-throughput and KV-cache are the drivers, and add headroom + an API cross-check.
:::
