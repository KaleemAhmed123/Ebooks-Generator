## GPU memory and interconnect

- Serving performance is set by two hardware facts more than raw compute: how much **memory** a GPU has, how fast that memory is, and how fast GPUs **talk to each other**. Decode is memory-bound (17-09), so these numbers, not FLOPs, decide throughput.

<svg viewBox="0 0 360 94" role="img" aria-label="GPU memory hierarchy from fast small SRAM to HBM, and interconnects NVLink within a node and InfiniBand across nodes" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="20" y="16" width="120" height="14" rx="2" fill="#24405e"/><text x="80" y="26" text-anchor="middle" fill="#fff" font-size="5.5">SRAM (on-chip) — tiny, ~TB/s</text>
  <rect x="20" y="34" width="200" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="120" y="44" text-anchor="middle" font-size="5.5">HBM (VRAM) — 80–192GB, ~3–8 TB/s</text>
  <rect x="20" y="52" width="300" height="14" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="170" y="62" text-anchor="middle" font-size="5.5">CPU RAM — hundreds of GB, ~100s GB/s (offload tier)</text>
  <text x="20" y="82" font-size="6">NVLink: GPU↔GPU within a node (~100s GB/s) · InfiniBand: node↔node (~100s Gb/s)</text>
</svg>

- **HBM (High-Bandwidth Memory) is the serving currency.** Its *capacity* caps how much model + KV cache fits (17-11); its *bandwidth* caps decode speed (every token reads the weights). This is why FP8/FP4 (17-39) help twice — less to store *and* less to stream per token.
- **FlashAttention** (Booklet 3) exists because of the SRAM↔HBM gap: it keeps attention's working set in fast on-chip SRAM instead of round-tripping through slow HBM. A memory-movement optimisation, not a math one.
- **The interconnect decides parallelism.** Tensor parallelism (17-11a) needs an all-reduce *every token*, so it only pays inside an **NVLink** domain (fast intra-node); crossing nodes over **InfiniBand** (slower) is where pipeline/data parallelism take over. The fabric topology is why "TP within a node, PP across nodes" is the rule.

:::note
The one mental model to carry: **inference decode is a memory-bandwidth problem, not a compute problem.** The GPU spends most of decode *reading weights and KV cache from HBM*, its math units largely idle — which is why batching helps (amortise the weight read across many tokens), why quantisation helps (fewer bytes to read), and why the newest GPUs advertise memory bandwidth and capacity as loudly as FLOPs. When you reason about serving throughput, think bytes-moved-per-token before think-operations-per-token.
:::
