## Cutting compute cost safely

- Compute is usually the biggest line, and there are four levers, strongest first:
  - **Right-size and scale to demand.** The cheapest instance is the one you didn't run. Match instance size to actual usage (CloudWatch metrics, Module 5), and **autoscale** so capacity tracks load — scaling **down** at night/off-peak, and **to zero** where the platform allows (Lambda, Fargate, scale-to-zero node pools). Most cloud waste is **over-provisioned, always-on** capacity sized for a peak that's rare.
  - **Savings Plans / Reserved** — for your **steady baseline** (the capacity you know you'll run 24/7 for a year), commit to 1–3 years and get up to roughly **70% off** on-demand. Cover the baseline with a commitment, serve the variable top with on-demand/spot.
  - **Spot** — for **interruptible, stateless** work (Module 3), up to ~**90% off**. Mix spot and on-demand in an auto-scaling group / node pool so a reclaim shifts load instead of causing an outage.
  - **Graviton (ARM)** — AWS's ARM processors deliver better price/performance than equivalent x86 for most workloads; if your stack runs on ARM (most do now), switching is often a double-digit-percent saving for a rebuild.
- Layer them: **baseline on a Savings Plan, burst on spot, scale to demand, on Graviton.** That combination is where the dramatic savings come from — not from any single trick.

:::note
This is **FinOps** in miniature: treat cost as an engineering property you measure and optimise, not an afterthought. The enablers are boring but essential — **tag every resource** (team, service, environment) so the bill can be **attributed**, set **budgets** per team/service, and review the top line items regularly. For AI infrastructure this becomes central: GPUs are the most expensive compute AWS rents, so Booklets 9–10's cost work (spot GPUs, right-sizing, MIG, scale-to-zero, $/token) is exactly these levers applied where each percent is worth the most. Learn the discipline here on cheap compute; it pays hugely on GPUs.
:::
