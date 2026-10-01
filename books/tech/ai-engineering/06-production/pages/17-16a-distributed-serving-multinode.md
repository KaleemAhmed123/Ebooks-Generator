## Multi-node serving

- One command serves a model that fits one node (17-16). The largest models — or the highest throughput — need serving *across nodes*, and the design mirrors distributed training's parallelism (17-11a) but with inference's own constraints.

<svg viewBox="0 0 360 92" role="img" aria-label="Multi-node serving: a router spreads requests across nodes; within each node tensor parallelism over NVLink; across nodes pipeline or data parallel over the network" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="40" width="44" height="16" rx="2" fill="#24405e"/><text x="32" y="51" text-anchor="middle" fill="#fff" font-size="6">router</text>
  <rect x="76" y="18" width="130" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="141" y="28" text-anchor="middle" font-size="6">node 1: TP over NVLink</text><text x="141" y="38" text-anchor="middle" font-size="5" fill="#6b6b6b">8 GPUs = 1 model copy</text>
  <rect x="76" y="52" width="130" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="141" y="62" text-anchor="middle" font-size="6">node 2: TP over NVLink</text><text x="141" y="72" text-anchor="middle" font-size="5" fill="#6b6b6b">another copy (data parallel)</text>
  <rect x="228" y="34" width="120" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="288" y="44" text-anchor="middle" font-size="6">shared KV (LMCache)</text><text x="288" y="54" text-anchor="middle" font-size="5" fill="#6b6b6b">cross-node reuse</text>
  <path d="M54 44 L74 30 M54 52 L74 64" stroke="#888" marker-end="url(#mn)"/><path d="M206 31 L226 42 M206 65 L226 50" stroke="#888" stroke-dasharray="2 2"/>
  <defs><marker id="mn" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **The layering.** *Within a node:* tensor parallelism over the fast NVLink fabric to hold one model copy across its GPUs (17-11a). *Across nodes:* data parallelism (more copies for throughput) over the network, and — for models too big for one node — pipeline parallelism splitting layers across nodes. The router spreads requests across copies.
- **Inference's twist vs training:** serving cares about *per-request latency*, so cross-node pipeline parallelism (which adds pipeline-bubble latency) is used only when a model genuinely can't fit one node — you'd rather keep a whole copy on one node and scale with data-parallel replicas. Training tolerates the bubble; interactive serving doesn't.
- **Cross-node KV reuse** (LMCache, 17-33) lets a conversation rerouted to a different node still hit warm cache — the multi-region KV idea (17-35) at cluster scale.

:::interview
"How do you serve a model too large for a single 8-GPU node?"

Layer the parallelism to inference's constraints. Fit one model copy with **tensor parallelism within the node** over NVLink; if it still overflows a node, add **pipeline parallelism across nodes** — but only then, because the pipeline bubble hurts per-request latency, which serving cares about and training doesn't. Scale *throughput* with **data-parallel replicas** (whole copies) behind a router, and use a **shared/tiered KV layer** (LMCache) so a rerouted conversation stays warm. The key judgment: prefer keeping a full copy per node and scaling replicas over spreading one copy thin across nodes, because cross-node communication is the latency enemy.
:::
