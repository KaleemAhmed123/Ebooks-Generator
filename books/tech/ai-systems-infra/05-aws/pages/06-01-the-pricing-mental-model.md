# Cost and Scale

## The pricing mental model

- Cloud cost isn't a lookup table to memorise; it's a **model**: you pay for **resources × time × data moved**, plus a long tail of **idle** things you forgot to turn off. Hold that frame and most bills become predictable. The four buckets:
  - **Compute** — per second an instance/container/function runs. Idle-but-running compute is pure waste.
  - **Storage** — per GB-month (S3, EBS, snapshots, RDS storage). Cheap per GB, but it accumulates silently (old snapshots, unattached volumes, log buckets with no lifecycle).
  - **Data transfer** — the one that surprises everyone (below).
  - **Requests / operations** — per-request charges (S3 PUT/GET, API calls, NAT data processing) that add up at volume.
- **Data transfer is the hidden budget.** The rule of thumb: **data IN is free; data OUT costs.** Traffic **out to the internet** is billed per GB; **cross-AZ** traffic is billed (often both directions); **cross-region** more; and **NAT Gateway** adds its own per-GB processing on top (Module 2). So a chatty cross-AZ architecture, or pods pulling large objects out through NAT, can run a transfer bill bigger than the compute — and it's invisible unless you look at the transfer line.

:::warn
Set a **billing alarm (AWS Budgets)** on *day one*, before you deploy anything — a runaway cost (a misconfigured autoscaler, a retry storm hammering a paid API, an accidental data-transfer loop) should page you in **hours**, not arrive as a shock on the monthly invoice. Then hunt the usual idle wasters: **unattached EBS volumes**, **old snapshots**, **idle RDS instances**, **orphaned load balancers/NAT gateways**, and **over-provisioned** capacity. "We'll watch the bill" is not a control; a budget alarm is. Cost is an SLO like latency — measured, alerted, owned.
:::

- The design consequence ties back to Booklets 1 and 3: **minimise data movement and idle.** Keep chatty services in one AZ, use **VPC endpoints** to keep S3/Dynamo traffic off NAT and the internet, cache to avoid repeated fetches, and scale compute to actual demand (next page). Locality isn't only a latency win — it's a cost win, for the same reason.
