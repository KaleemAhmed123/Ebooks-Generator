## Capacity planning: a RAG service

- A second worked capacity plan (17-63), because RAG has *more moving parts* to size than a chat service — embedding, vector search, rerank, *and* generation, each its own bottleneck.

:::mint
```text
Requirements: 500k employees, 5 queries/day each, peak 3× avg,
  per query: 1 embed + vector search + rerank 20 + generate (2k in, 400 out)

1) QPS
   2.5M queries/day / 86,400 = ~29 avg -> ~87 peak QPS

2) Per-stage sizing at peak:
   embed:   87 q/s × 1 short embed  -> tiny (prefill-only, 17-28a): «1 GPU
   vector:  87 q/s over N-M vectors -> ANN, memory-bound: size by index RAM
   rerank:  87 q/s × 20 pairs = 1,740 cross-encoder scores/s -> ~1–2 GPUs
   generate:87 q/s × 400 out = 34,800 out tok/s
            ÷ ~2,500 tok/s/GPU (70B FP8) = ~14 GPUs + headroom ~18

3) The bottleneck is GENERATION (18 GPUs), then rerank (2), embed/vector small.
   => size the generation fleet first; rerank is a modest second pool.
```
:::

- **Size each stage separately** — they have different profiles. Embedding is prefill-only and tiny (17-28a). Vector search is memory-bound, sized by *index RAM* not QPS (17-28c). Rerank is a moderate cross-encoder load. Generation dominates, as always. A single "how many GPUs?" number hides that these are four different pools.
- **The bottleneck names the priority.** Generation is 90% of the GPU spend here, so that's where the cost levers (quantization, routing, caching the retrieved context) pay off most — optimising the embedding service would save almost nothing.

:::interview
"Size a production RAG service for 500k employees."

Decompose by stage, because RAG isn't one workload. QPS from DAU×queries → peak. Then size each pool: **embedding** (prefill-only, batches at ingest, ~1 GPU), **vector DB** (memory-bound, sized by index RAM not QPS), **reranker** (a modest cross-encoder pool), and **generation** (the dominant cost — output tok/s ÷ per-GPU goodput, ~18 GPUs here). The insight to surface: generation is ~90% of the GPU bill, so that's where quantization/routing/context-caching pay off, and the vector DB is sized by memory not throughput. Naming four distinct pools with different scaling profiles — not one GPU count — is the staff-level RAG answer.
:::
