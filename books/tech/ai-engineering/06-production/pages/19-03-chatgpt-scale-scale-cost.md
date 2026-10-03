## Mock: ChatGPT-scale — scale and cost

- Do the capacity math out loud (the move from 17-63). Every number traces to the clarified requirements.

:::mint
```text
100M DAU × 15 msgs = 1.5B msgs/day
avg QPS  = 1.5e9 / 86,400 ≈ 17,360
peak QPS = 3× ≈ 52,000

output tokens/s at peak = 52,000 × 400 = 20.8M tok/s
per-GPU goodput (70B FP8 + spec-decode) ≈ 3,000 tok/s
GPUs (decode) = 20.8M / 3,000 ≈ 6,900
+ prefill headroom, multi-region, redundancy ≈ 10,000+ GPUs

Cost check — self-host vs API:
  self-host: 10,000 GPU × $2/hr × 24 ≈ $480k/day
  API @ $5/1M blended: 1.5e9 msg × 1,900 tok × $5/1e6 ≈ $14M/day
=> self-hosting is ~30× cheaper at this scale. Bet confirmed.
```
:::

- **The levers that cut the GPU count** (each from cluster 17-G): **FP8** (fewer GPUs, more KV headroom), **speculative decoding** (fewer decode passes → higher per-GPU goodput), **prompt caching** the fixed system prefix (skip its prefill on every message), **continuous batching + chunked prefill** (keep the fleet full). Together they move the "3,000 tok/s/GPU" number — flag it as the one to verify with a load test.
- **Scale-out shape:** many `DP` replicas of a `TP`-sharded 70B, regional pools, sticky KV routing, autoscaling on queue depth with a warm floor (no cold-start timeouts at peak, 17-34).

:::interview
"How many GPUs, and do you build or buy?"

Derive it: DAU×msgs → QPS → peak → output tok/s → ÷ per-GPU goodput → ~7k decode GPUs, ~10k with headroom. Then the build-vs-buy proof: self-host ~$0.5M/day vs API ~$14M/day, so **build**, on open weights, is decisive at this scale — and I'd name FP8 + spec-decode + prompt-caching as the levers that set the per-GPU number, flagging that number as the one to validate on real hardware. Producing the ~30× gap on the whiteboard, not asserting "self-hosting is cheaper," is the staff signal.
:::
