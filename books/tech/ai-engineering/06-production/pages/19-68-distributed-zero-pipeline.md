## Distributed training: ZeRO and pipeline

- When the model itself overflows one GPU, you *shard* it. **ZeRO** (Zero Redundancy Optimizer — DeepSpeed) is the idea behind FSDP: don't replicate the training state, partition it across GPUs and gather each piece only when needed.

<svg viewBox="0 0 360 92" role="img" aria-label="ZeRO stages progressively shard optimizer state, gradients, then parameters across GPUs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="14" y="20" width="104" height="56" rx="4" fill="#e8f4fd" stroke="#24405e"/><text x="66" y="32" text-anchor="middle" font-size="6.5">ZeRO-1</text><text x="66" y="48" text-anchor="middle" font-size="5.5">shard optimiser</text><text x="66" y="58" text-anchor="middle" font-size="5.5">state (~4× save)</text>
  <rect x="128" y="20" width="104" height="56" rx="4" fill="#eef3ee" stroke="#3b7a57"/><text x="180" y="32" text-anchor="middle" font-size="6.5">ZeRO-2</text><text x="180" y="48" text-anchor="middle" font-size="5.5">+ shard gradients</text><text x="180" y="58" text-anchor="middle" font-size="5.5">(~8× save)</text>
  <rect x="242" y="20" width="104" height="56" rx="4" fill="#eaf6ea" stroke="#1a3a2a"/><text x="294" y="32" text-anchor="middle" font-size="6.5">ZeRO-3 / FSDP</text><text x="294" y="48" text-anchor="middle" font-size="5.5">+ shard params</text><text x="294" y="58" text-anchor="middle" font-size="5.5">(full sharding)</text>
</svg>

- **ZeRO's three stages** shard progressively more: *stage 1* the optimiser state (the biggest chunk for AdamW, ~2× the weights), *stage 2* also the gradients, *stage 3* also the parameters themselves (this is FSDP). Each stage saves more memory for more communication — stage 3 all-gathers each layer's weights just before its forward pass and frees them after.
- **Pipeline parallelism** is the other axis: split the model's *layers* into stages on different GPUs, and pass activations down the pipeline. To keep every stage busy (not idle waiting for the previous), you split each batch into **micro-batches** that flow through the pipeline in overlap — the "GPipe" schedule.

:::note
Real frontier training combines all axes — **3D parallelism**: tensor parallel *within* a node (17-11a, split each layer's matrices over NVLink-connected GPUs), pipeline parallel *across* nodes (split layers into stages), and data parallel *on top* (replicate the whole sharded setup over more nodes for throughput). Each axis targets a different bottleneck: tensor for per-layer size, pipeline for total depth, data for throughput, ZeRO for state redundancy. Choosing the mix is the core scaling decision, and it is driven by where the model overflows and where the interconnect is fast.
:::
