## Distributed training

- A frontier model does not fit on one GPU — not the weights, not the optimizer state, not a useful batch. Training splits the work across hundreds or thousands of GPUs. Three ways to split, usually combined.

<svg viewBox="0 0 340 88" role="img" aria-label="Data parallel copies the model and splits the batch; tensor parallel splits each layer; pipeline parallel puts different layers on different GPUs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="56" y="12" text-anchor="middle" font-size="7.5" fill="#24405e">data parallel</text>
  <rect x="20" y="18" width="30" height="30" rx="2" fill="#e8f4fd" stroke="#24405e"/><rect x="62" y="18" width="30" height="30" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="56" y="60" text-anchor="middle" fill="#6b6b6b">full model ×N,</text><text x="56" y="70" text-anchor="middle" fill="#6b6b6b">split the batch</text>
  <text x="170" y="12" text-anchor="middle" font-size="7.5" fill="#24405e">tensor parallel</text>
  <rect x="140" y="18" width="14" height="30" rx="2" fill="#cfe3f5" stroke="#24405e"/><rect x="156" y="18" width="14" height="30" rx="2" fill="#cfe3f5" stroke="#24405e"/><rect x="172" y="18" width="14" height="30" rx="2" fill="#cfe3f5" stroke="#24405e"/><text x="170" y="60" text-anchor="middle" fill="#6b6b6b">one layer split</text><text x="170" y="70" text-anchor="middle" fill="#6b6b6b">across GPUs</text>
  <text x="286" y="12" text-anchor="middle" font-size="7.5" fill="#24405e">pipeline parallel</text>
  <rect x="256" y="18" width="60" height="9" rx="2" fill="#24405e"/><rect x="256" y="30" width="60" height="9" rx="2" fill="#3a5f80"/><rect x="256" y="42" width="60" height="9" rx="2" fill="#5a7a98"/><text x="286" y="62" text-anchor="middle" fill="#6b6b6b">layers 1-4 | 5-8 |</text><text x="286" y="72" text-anchor="middle" fill="#6b6b6b">9-12 on 3 GPUs</text>
</svg>

- **Data parallel** — copy the whole model to each GPU, give each a different slice of the batch, average the gradients. Simplest; needs the model to fit on one GPU.
- **Tensor parallel** — split each layer's matrices across GPUs. For when one layer is too big.
- **Pipeline parallel** — put different layers on different GPUs, stream micro-batches through like a factory line.
- **ZeRO / FSDP** shard the optimizer state, gradients, and weights across data-parallel GPUs so no single one holds a full copy — the standard way to train large models today.

:::warn
The bottleneck is **communication, not compute.** Every step, GPUs must exchange gradients or activations over the network; if that link is slow, GPUs sit idle. This is why frontier training needs specialised high-speed interconnects (NVLink, InfiniBand) — and why you cannot just rent 1,000 random cloud GPUs and expect them to train together well.
:::
