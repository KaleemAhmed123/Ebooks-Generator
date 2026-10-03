## Managed vs self-host: the TCO, worked

- The managed-vs-self-host decision (17-02) is usually argued on per-token price, which is the wrong number. The right one is **total cost of ownership (TCO)** — the per-token or hardware cost *plus* the engineering, reliability, and opportunity costs that self-hosting quietly adds. Here it is worked honestly.

:::mint
```text
Workload: 5B tokens/month on an open 70B model.

Managed API @ $3/1M blended:
  5,000M × $3/1e6                        = $15,000/mo
  + engineering to run it: ~0 (someone else's problem)
  TCO ≈ $15,000/mo

Self-host (open weights on reserved H100s):
  ~4 GPUs to hit throughput + redundancy @ $1.5/hr
    4 × $1.5 × 24 × 30                   = $4,320/mo    (the GPU bill)
  + 1 engineer's fraction (on-call, engine upgrades, ~30%)
    0.3 × $15k/mo loaded                 = $4,500/mo    (the human bill)
  + reliability overhead (over-provision, monitoring) ~15%
                                          ≈ $650/mo
  TCO ≈ $9,500/mo

=> self-host wins here (~37% cheaper) — but notice the GPU line ($4.3k)
   is LESS than the human line ($4.5k). The engineer is the real cost.
```
:::

- **The GPU is not the expensive part; the engineer is.** At moderate scale, the human cost of *running* the fleet — on-call for nondeterministic failures, engine upgrades every few weeks (the serving stack changes fast), capacity planning, incident response — rivals or exceeds the hardware bill. The per-token comparison ignores this entirely, which is why it points teams toward self-hosting *earlier* than TCO actually justifies.

:::note
This is why small teams stay on managed APIs longer than the raw token math suggests: the token bill might say "self-host and save 40%," but the TCO says "you'll spend that saving, and your engineers' attention, running the fleet." The saving is only *real* if you have the operational capacity to absorb the human cost — and for a small team, that engineer's time is often better spent on the product than on operating an inference cluster. The crossover where self-hosting genuinely wins is the subject of the next page.
:::
