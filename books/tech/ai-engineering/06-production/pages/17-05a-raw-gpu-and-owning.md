## Raw GPU rental and owning

- Below the inference platforms sits the cheapest and rawest tier: **rent bare GPUs** (RunPod, Lambda, CoreWeave, or a hyperscaler VM) and run your own serving engine, or **buy the hardware** outright. You trade all convenience for the lowest possible unit cost.
- The ladder, cheapest-per-token to most-convenient: **own** → **reserved cloud GPU** → **on-demand cloud GPU** → **inference platform** → **provider API**. Each rung up adds convenience and margin.

:::mint
```text
Own vs rent, one H100 (illustrative, as of 2026):  [VERIFY prices]
  buy:            ~$30k capex + power/cooling/host, ~3-yr life
                  amortised ≈ $1.1/hr IF kept busy 24/7
  reserved cloud: ~$2/hr committed 1-yr
  on-demand:      ~$3-4/hr
Owning wins only at very high, steady, multi-year utilisation —
and you take on capacity planning, failures, and the depreciation risk
of the next GPU generation making yours obsolete.
```
:::

- **Owning is rarely right** for a software team: GPUs depreciate fast as new generations ship, you carry datacentre operations, and idle owned hardware is pure loss. It makes sense at hyperscale, for data-sovereignty mandates, or when GPU supply is so constrained that owning is the only guaranteed capacity.
- **Reserved cloud is the usual floor** for steady self-host workloads — most of owning's unit-cost win without the capex, depreciation, or datacentre burden.

:::note
This completes the cost ladder from page 17-02: as you descend from provider API to owned metal, unit cost falls and operational burden rises, monotonically. The right rung is set by *volume and steadiness* — the same crossover logic as every other build-vs-buy call in this booklet. Owning is the bottom rung almost no one should stand on.
:::
