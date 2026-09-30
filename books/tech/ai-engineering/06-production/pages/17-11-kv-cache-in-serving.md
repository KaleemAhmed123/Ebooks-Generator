## The KV cache is the bottleneck

- Booklet 4 introduced the **KV cache**: store each token's key and value vectors so decode does constant work per token instead of re-reading the whole sequence. In *serving*, that cache becomes the resource everything fights over.
- Its size is exact and unforgiving:

:::mint
```text
KV bytes = 2 × layers × kv_heads × head_dim × seq_len × batch × bytes/elt
                └ K and V

Llama-70B (80 layers, 8 KV heads via GQA, head_dim 128), FP16, 8k context:
  per token  = 2 × 80 × 8 × 128 × 2  = 327,680 bytes ≈ 0.31 MB
  per request (8k) ≈ 2.5 GB
  32 concurrent 8k requests ≈ 80 GB  -> a whole H100 GONE to cache alone
```
:::

- **This is why concurrency is capped by memory, not compute.** A GPU that could compute 128 requests in parallel may only hold the KV cache for 30. The cache, not the FLOPs, sets how many users one GPU serves.
- Three responses run through the rest of this module: **GQA** shrinks `kv_heads` (Booklet 3); **paged attention** stops the cache wasting memory to fragmentation (vLLM, next cluster); **prefix caching / offload** reuses and tiers it (SGLang, LMCache).

:::warn
The naive serving bug: pre-allocate a contiguous KV buffer for `max_seq_len` per request. A request that generates 50 tokens with `max_seq_len=8192` reserves — and wastes — 8k tokens' worth of cache. At scale this fragmentation wastes 60–80% of KV memory, so the server admits a fraction of the users the GPU could actually hold. Paged attention exists to kill exactly this waste.
:::
