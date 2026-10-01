## Distributed inference: TP, PP, DP

- When a model or its load exceeds one GPU, you split across many — and there are three axes to split on. They compose, and choosing the mix is a core scale decision.

<svg viewBox="0 0 360 108" role="img" aria-label="Tensor parallel splits each layer across GPUs, pipeline parallel splits layers into stages, data parallel replicates the whole model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="60" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">tensor (TP)</text>
  <rect x="24" y="18" width="72" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><line x1="60" y1="18" x2="60" y2="42" stroke="#24405e" stroke-dasharray="2 2"/><text x="60" y="34" text-anchor="middle" font-size="5.5">one layer, 2 GPUs</text>
  <text x="180" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">pipeline (PP)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="144" y="18" width="34" height="24" rx="3"/><rect x="182" y="18" width="34" height="24" rx="3"/></g><text x="161" y="33" text-anchor="middle" font-size="5.5">L1–20</text><text x="199" y="33" text-anchor="middle" font-size="5.5">L21–40</text>
  <text x="300" y="12" text-anchor="middle" font-size="6.5" fill="#24405e">data (DP)</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="264" y="18" width="34" height="24" rx="3"/><rect x="302" y="18" width="34" height="24" rx="3"/></g><text x="281" y="33" text-anchor="middle" font-size="5.5">full copy</text><text x="319" y="33" text-anchor="middle" font-size="5.5">full copy</text>
  <text x="180" y="64" text-anchor="middle" font-size="6">TP: fit a model too big for one GPU · heavy per-token GPU-to-GPU traffic</text>
  <text x="180" y="80" text-anchor="middle" font-size="6">PP: fit an even bigger model in stages · adds pipeline latency</text>
  <text x="180" y="96" text-anchor="middle" font-size="6">DP: more throughput · each replica must fit the whole model</text>
</svg>

- **Tensor parallel (TP)** splits each layer's matrices across GPUs. Use it to *fit* a model that overflows one card. Cost: every token needs a GPU-to-GPU all-reduce, so TP wants a fast interconnect (NVLink) and rarely pays past one node.
- **Pipeline parallel (PP)** splits the *layers* into stages on different GPUs. Use it when even TP within a node cannot fit the model. Cost: a pipeline bubble adds latency, and it needs enough in-flight requests to keep every stage busy.
- **Data parallel (DP)** runs *full replicas* for throughput — the horizontal scale-out. Each replica must fit the whole model (via TP/PP if needed).

- **The rule:** TP and PP to *fit* one copy on the smallest GPU set that holds it, then DP to *scale* copies for throughput. `DP × TP` on one node (e.g. `DP=4, TP=2` on 8 GPUs, page 17-17) is the common shape.

:::interview
"The model needs 4 GPUs — how do you split them?"

First ask *why 4* — is it to fit the weights (→ TP within a node, cross-check the interconnect) or for throughput (→ DP replicas)? For fitting, prefer TP up to the NVLink domain, add PP only if a single node still can't hold it. For throughput, replicate with DP. Stating that TP/PP *fit* and DP *scales* — and that TP is interconnect-bound so it doesn't scale across nodes cheaply — is the signal.
:::
