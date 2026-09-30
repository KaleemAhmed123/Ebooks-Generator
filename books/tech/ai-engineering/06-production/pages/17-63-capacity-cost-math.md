## Step 5+7: capacity and cost math

- The step that separates staff from senior: take the requirements' numbers and derive **GPU count and dollar cost** on the whiteboard. It is arithmetic, and it is expected.

:::mint
```text
Requirements: 10M DAU, 20 messages/user/day, peak = 3× average
Prompt ~1,500 in + 400 out tokens/message.

1) QPS
   msgs/day = 10M × 20 = 200M
   avg QPS  = 200M / 86,400 ≈ 2,315
   peak QPS = 3× ≈ 6,950

2) token throughput at peak
   output tok/s = 6,950 × 400 = 2.78M output tok/s
   (output drives GPU-seconds in decode; input is one prefill pass)

3) GPUs (self-host, 70B FP8)
   one H100 sustains ~2,500 output tok/s at the goodput knee (17-30)
   GPUs = 2.78M / 2,500 ≈ 1,112 GPUs at peak
   + headroom & multi-region ≈ 1,300 GPUs

4) cost sanity-check vs API
   API @ blended $5/1M tok: 200M msg × 1,900 tok × $5/1e6
     = ~$1.9M/day  -> self-host at ~1,300 GPU × $2/hr × 24 ≈ $62k/day
   => at THIS scale, self-hosting open weights wins massively.
```
:::

- **Every number traces to a requirement.** DAU and messages give QPS; token counts give throughput; the engine's per-GPU goodput gives GPU count; GPU-hours vs API rate gives the build-vs-buy answer. State the assumption behind each (the ~2,500 tok/s/GPU is the one to flag as "verify on real hardware").
- **The build-vs-buy crossover is the payoff.** The math *proves* the earlier rule of thumb: at 10M DAU the API bill dwarfs the GPU bill, so self-hosting open weights is right — and you showed it, not asserted it.

:::interview
**"Roughly how many GPUs to serve this?"** Never guess a number. Walk it: DAU × messages → QPS → peak QPS → output tokens/s → divide by per-GPU goodput → add headroom. Then cross-check the GPU-hour cost against the equivalent API bill to justify build-vs-buy. Flag your one shaky assumption (per-GPU throughput) as "I'd verify this with a load test." The *derivation* is scored, not the final integer.
:::
