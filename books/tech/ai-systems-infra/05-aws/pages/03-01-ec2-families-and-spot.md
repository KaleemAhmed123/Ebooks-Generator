# Compute and Edge

## EC2 — families, sizes, and spot

- **EC2** is raw virtual machines — the base layer everything else (ECS, EKS, even parts of Lambda) runs on. Two choices define an instance: its **family** (the hardware balance) and its **purchasing model** (how you pay).
- **Families** match hardware to workload, named by a letter + generation:
  - **`m`** (general) — balanced CPU/memory, the default starting point.
  - **`c`** (compute) — high CPU per dollar, for CPU-bound work.
  - **`r`/`x`** (memory) — lots of RAM, for caches, in-memory DBs, large JVMs.
  - **`i`/`d`** (storage) — fast local NVMe, for databases and high-IOPS work.
  - **`p`/`g`** (accelerated) — GPUs, for AI training and inference (Booklet 9).
  - A size suffix (`.large`, `.xlarge`, `.4xlarge`) scales it up. Storage is usually a separate **EBS** volume (default **gp3**), billed apart from the instance.
- **Purchasing models** are where the money is:
  - **On-demand** — pay per second, no commitment. Flexible, most expensive.
  - **Savings Plans / Reserved** — commit to 1–3 years of usage for a big discount (Module 6).
  - **Spot** — AWS's **spare capacity at up to ~90% off** — with the catch that AWS can **reclaim it with a ~2-minute warning** when it needs the capacity back.

:::warn
Spot is enormous savings **only for the right workloads**. Use it for **interruptible, stateless, horizontally-scaled** work — batch jobs, CI runners, stateless web/worker fleets behind a load balancer, and (Booklet 9) GPU training that checkpoints. Do **not** put a **stateful singleton** on a single spot instance — a lone database or a stateful leader — because the 2-minute reclaim becomes a hard outage or data loss. The pattern that works: mix spot and on-demand in an auto-scaling group / node pool so a spot reclaim just shifts load, never takes the service down. Spot + checkpointing + spreading across instance types is how teams cut compute cost by the most while staying up.
:::
