## Flagship 15: distributed training — spec

- **Goal:** understand how a model trains across many GPUs — the collective operations, data parallelism, ZeRO sharding, pipeline parallelism, and sharded checkpoints. Flagship 2 trained on one GPU; this is how the frontier trains on thousands.
- Everything rests on **collective operations** — coordinated communication primitives across GPUs, provided by NCCL (NVIDIA's collective library).

<svg viewBox="0 0 360 96" role="img" aria-label="Collective ops: all-reduce sums gradients across GPUs, all-gather collects shards, reduce-scatter combines both" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="60" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">all-reduce</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="20" y="20" width="20" height="14"/><rect x="46" y="20" width="20" height="14"/><rect x="72" y="20" width="20" height="14"/></g>
  <text x="56" y="46" text-anchor="middle" font-size="5.5">each GPU → sum → all get it</text>
  <text x="180" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">all-gather</text>
  <g fill="#eaf6ea" stroke="#1a3a2a"><rect x="140" y="20" width="20" height="14"/><rect x="166" y="20" width="20" height="14"/><rect x="192" y="20" width="20" height="14"/></g>
  <text x="176" y="46" text-anchor="middle" font-size="5.5">collect shards → full tensor</text>
  <text x="300" y="14" text-anchor="middle" font-size="6.5" fill="#24405e">reduce-scatter</text>
  <g fill="#f3ede8" stroke="#8a6d3b"><rect x="260" y="20" width="20" height="14"/><rect x="286" y="20" width="20" height="14"/><rect x="312" y="20" width="20" height="14"/></g>
  <text x="296" y="46" text-anchor="middle" font-size="5.5">sum + split across GPUs</text>
  <text x="180" y="70" text-anchor="middle" font-size="6.5">every parallelism strategy is built from these primitives</text>
  <text x="180" y="84" text-anchor="middle" font-size="6" fill="#6b6b6b">DDP = all-reduce · FSDP/ZeRO = all-gather + reduce-scatter</text>
</svg>

- **The three primitives.** *All-reduce* — every GPU contributes a tensor, they're summed, every GPU gets the sum (how DDP syncs gradients). *All-gather* — collect each GPU's shard into the full tensor (how FSDP reassembles sharded weights). *Reduce-scatter* — sum then split across GPUs (how FSDP distributes gradients). Every strategy below is these primitives arranged differently.
- **The reason distribution exists:** a frontier model's *training state* (weights + gradients + optimiser state + activations) vastly exceeds one GPU, and even if it fit, one GPU would take years. You split the work — and the split is what these pages teach.

:::note
Understanding collective ops is what makes distributed training stop being a black box. "FSDP shards the model" is a sentence; "FSDP all-gathers each layer's weights just before its forward pass and reduce-scatters its gradients after" is a *mechanism* you can reason about — including its cost (communication volume) and its failure modes (a slow interconnect stalls everyone). The parallelism strategies are not magic frameworks; they are schedules of all-reduce, all-gather, and reduce-scatter over your GPUs.
:::
