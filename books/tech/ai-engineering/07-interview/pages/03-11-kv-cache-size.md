## How big is the KV cache, and why does it dominate long-context serving?

- Per token, you store a Key and a Value for every layer and every head. The size is:

:::mint
```text
KV bytes = 2 (K,V) × layers × kv_heads × head_dim × 2 (bf16) × seq_len × batch

e.g. 32 layers, 8 kv-heads (GQA), head_dim 128, 8k tokens, 1 request:
 2 × 32 × 8 × 128 × 2 × 8192  ≈ 1.07 GB  for ONE sequence
```
:::

- It scales **linearly with sequence length and with batch size**, so long prompts × many users explodes memory far faster than the weights (which are fixed).
- This is why: **GQA** shrinks `kv_heads` to cut it; **paged attention** (vLLM) stops fragmentation waste; **KV-cache quantization** stores it in int8/fp8; and admission control refuses requests when the pool is full.

:::interview
What's really being tested:

that you can size the cache from first principles and see that it — not parameter count — caps concurrency, motivating GQA, paging, and quantization.
:::
