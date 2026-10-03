## Provisioned throughput vs on-demand

- Managed platforms sell inference two ways. **On-demand:** pay per token, share GPUs with every other tenant, accept variable tail latency. **Provisioned:** reserve dedicated GPU capacity for a fixed hourly price, get stable latency, pay whether you use it or not.
- Azure calls the reserved unit a **PTU** (Provisioned Throughput Unit — a block of reserved inference GPUs). Bedrock calls it Provisioned Throughput, roughly $21–$50/hour per unit.

- The whole decision is a **utilisation break-even.** Reserved capacity is a fixed cost; on-demand is variable. Below the crossover, on-demand is cheaper because you pay for no idle. Above it, reserved wins.

:::mint
```text
Reserved:  $30/hr  ->  $30 × 24 × 30  = $21,600/month, flat
On-demand: $0.60 per 1M output tokens, one PTU ≈ 5M tokens/hr peak

Break-even tokens/month = 21,600 / 0.60 × 1e6 = 36.0 B tokens
One PTU at 100% = 5e6 × 24 × 30 = 3.6 B tokens/month  -> impossible to hit
=> reserved wins only when your SUSTAINED load fills the reservation.
   Rule of thumb published by the platforms: ~40–60% sustained
   utilisation is the crossover; below it, stay on-demand.
```
:::

- **The trap is idle reservation.** A PTU sized for peak but running at 15% average burns ~85% of the bill on nothing. Reserved capacity only pays off for **predictable, steady** traffic — a batch pipeline, a high-QPS product feature — not spiky interactive load.

:::warn
Teams buy PTUs to fix P99 latency, then discover the bill did not move with traffic and utilisation sat at 20%. The fix is not "buy more PTUs" — it is **hybrid**: a reserved floor sized to your *baseline* load, on-demand burst above it. Reserve the valley, rent the peak.
:::
