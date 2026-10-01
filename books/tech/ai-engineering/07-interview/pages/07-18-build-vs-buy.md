## "Build vs buy for an AI capability — how do you decide?"

- **What they're screening for:** pragmatic strategy — most teams should *buy/compose* and build only where they differentiate.
- **A strong answer shows the axes:**
  - **Differentiation** — is this core IP/competitive advantage (build) or a commodity (buy)? Don't build a worse version of a managed model.
  - **Time-to-market** — buying (a managed API, a vendor tool) ships now; building takes months.
  - **Cost at scale** — managed is cheaper to start; self-built/self-hosted can win at high steady volume.
  - **Control & compliance** — data residency, customisation, and reliability may force building/self-hosting.
  - **Capability & maintenance** — do you have the skill and appetite to own and maintain it?
- **Default:** buy/compose the commoditised parts (foundation models, vector DBs, observability) and build the thin layer that is *your* differentiation (your data, your product logic, your evals).

:::warn
Weak: "We should train our own model to own the stack." Strong: "Buy the foundation model and infra; build the proprietary layer — our data, retrieval, and evals — where we actually differentiate."
:::

:::interview
What's really being tested: strategic judgment — build only where you differentiate, buy the commodity, weighing time/cost/control/maintenance — not NIH or buy-everything.
:::
