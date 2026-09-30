## Per-token vs per-minute: the crossover

- Platforms price four incompatible ways: per **token** (Fireworks, Together), per **minute** (Baseten), per **second** (Modal), per **prediction** (Replicate). You cannot compare pricing pages directly — you must model *your* workload and reduce everything to cost per request.
- The core tension is the same as PTUs one page back: **per-token has no idle cost but a markup; per-time is raw GPU cost but you pay for idle.**

:::mint
```text
Workload: Llama-70B, 500 in + 500 out tokens/request

Per-token (Fireworks-style):  $0.90 / 1M tokens (blended)
  -> 1,000 tokens × $0.90/1e6            = $0.0009 / request

Per-minute (Baseten-style):   one H100 @ $0.05/min,
  engine does ~2,000 tok/s -> 1,000 tok  = 0.5 s = $0.00042 / request
  ...BUT only if the GPU is BUSY. At 20% utilisation the
  effective rate is 5× -> $0.0021 / request.

Crossover: per-minute beats per-token once sustained
utilisation of the dedicated GPU passes ~30%.
```
:::

- **Below ~30% utilisation, per-token wins** — you dodge the idle bill. **Above it, per-minute (dedicated) wins** — you are paying raw silicon cost with no marketplace markup.
- This is the same shape as self-host vs managed, one level down: dedicated capacity only pays off when you keep it busy.

:::interview
**"How do you compare two inference vendors with different pricing units?"** Never compare the pricing pages. Fix a representative request (input/output token counts, QPS profile), convert every vendor to **cost per 1,000 requests at your expected utilisation**, and plot cost against utilisation. The answer is a crossover curve, not a single winner — and the crossover moves with how busy you keep the hardware.
:::
