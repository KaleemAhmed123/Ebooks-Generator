## Spot, on-demand, and reserved GPUs

- Once you self-host, the GPUs themselves come in three pricing tiers, and mixing them right is a large cost lever. Same hardware, very different price and reliability.

| Tier | Price | Catch |
|---|---|---|
| **spot / preemptible** | cheapest (~50–90% off) | can be reclaimed with seconds' notice |
| **on-demand** | baseline | pay full rate, available now |
| **reserved / committed** | discounted (1–3 yr commit) | you pay whether used or not |

- **Spot is nearly free but interruptible.** The cloud reclaims spot GPUs when it needs them, killing your pod on short notice — fine for *fault-tolerant, resumable* work (batch inference, training with checkpointing, 19-29a), fatal for a single-replica interactive endpoint. The trick is to make the workload survive preemption (checkpoint, drain, reschedule) and then spot becomes a huge discount.
- **The production mix** mirrors the PTU logic (17-04): **reserved** capacity for your steady baseline load (committed, discounted), **on-demand** for predictable bursts, and **spot** for interruptible batch and overflow. Reserve the valley, rent the peak, and run anything preemptible on spot.

:::mint
```text
Illustrative blend for a baseline of 100 GPUs, peaks to 200:
  100 reserved @ $1.5/hr (committed)   = $150/hr   baseline
  up to 60 on-demand @ $3/hr           = $180/hr   burst
  batch/eval on spot @ $0.6/hr         = big discount on non-urgent work
vs all-on-demand at peak: 200 × $3 = $600/hr  ->  the blend can roughly halve it
```
:::

:::note
The reliability/cost tradeoff maps onto the workload's interruption tolerance, which is the real question to ask of every GPU job: *can this survive being killed and resumed?* If yes (batch, training, offline eval, overflow), spot's discount is nearly free money. If no (a single interactive replica), it needs on-demand or reserved. The FinOps win (17-55) is classifying every workload by interruption tolerance and pushing everything tolerant onto spot — the same "is a human waiting?" instinct as the batch-API decision (17-43), applied to the hardware tier.
:::
