## Serving mixture-of-experts models

- Most frontier models are **MoE** (mixture of experts, Booklet 3): the MLP is replaced by many expert MLPs plus a router that fires the top-k per token. This changes serving economics in a specific, important way — and it's why "active vs total parameters" is on every MoE model card.

<svg viewBox="0 0 360 84" role="img" aria-label="MoE: all experts must sit in memory, but only top-k fire per token, so memory is high but per-token compute is low" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="12" y="16" width="160" height="56" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="92" y="28" text-anchor="middle" font-size="6.5" fill="#a03050">MEMORY: all experts resident</text><text x="92" y="44" text-anchor="middle" font-size="5.5">total params (e.g. 8×22B = 176B)</text><text x="92" y="56" text-anchor="middle" font-size="5.5">must all fit in VRAM</text>
  <rect x="188" y="16" width="160" height="56" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="268" y="28" text-anchor="middle" font-size="6.5" fill="#1a3a2a">COMPUTE: only top-k fire</text><text x="268" y="44" text-anchor="middle" font-size="5.5">active params (e.g. 2 experts = ~39B)</text><text x="268" y="56" text-anchor="middle" font-size="5.5">per-token cost of a small model</text>
</svg>

- **The asymmetry:** MoE gives you a *big model's quality* at a *small model's per-token compute* (only the active experts run) — but you pay a *big model's memory*, because *all* experts must sit in VRAM even though most are idle each token. So MoE serving is **memory-heavy, compute-light**: you need the VRAM of the total parameters but the decode speed of the active ones.
- **Expert parallelism** is the MoE-specific scaling axis: distribute the experts across GPUs (each GPU holds some experts), and route each token's activation to the GPU holding its chosen experts. This adds a routing communication step but lets a huge total-parameter model spread across a cluster. Load imbalance (a "hot" expert everyone routes to) is the failure mode to watch.

:::interview
"What's different about serving an MoE model versus a dense one?"

The memory-compute asymmetry. MoE has *high total* parameters (all experts must be resident in VRAM) but *low active* parameters (only top-k experts fire per token), so it's **memory-heavy, compute-light**: you provision VRAM for the full total-parameter count but get decode speed closer to the active count — a big model's quality at a smaller model's per-token cost, paid for in memory. Scaling uses **expert parallelism** (experts spread across GPUs, tokens routed to the right GPU), which adds routing communication and risks **load imbalance** if a hot expert gets over-routed. So sizing an MoE deployment means: memory for total params, throughput of active params, and watching expert load balance — different from a dense model where memory and compute track the same parameter count.
:::
