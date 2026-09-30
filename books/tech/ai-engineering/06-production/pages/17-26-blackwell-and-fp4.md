## Blackwell and FP4

- NVIDIA's **Blackwell** generation (B200, and the GB200 Grace-Blackwell superchip) is the 2025–2026 datacentre GPU, and its headline inference feature is native **FP4** — a 4-bit floating-point format with hardware support in the tensor cores. TensorRT-LLM is the engine that exploits it first and most fully. **[VERIFY specs/dates]**
- FP4 halves memory and roughly doubles math throughput versus FP8 for the parts of the model that tolerate it — a large step for both the weight footprint and the KV cache.

:::mint
```text
Llama-70B weights:
  FP16  140 GB   FP8   70 GB   FP4  35 GB

Effect on one 192 GB Blackwell GPU:
  FP8: weights 70 GB  -> ~120 GB left for KV cache -> deep concurrency
  FP4: weights 35 GB  -> ~155 GB left for KV cache -> deeper still
Lower precision frees the exact resource that caps concurrency (17-11).
```
:::

- **The catch is the same as all low precision:** 4 bits is coarse, so naive FP4 can lose quality on sensitive layers. Production FP4 is *mixed* — keep sensitive layers (often attention, embeddings, the LM head) at higher precision, push the bulk to FP4 — and validated on real evals before shipping.
- Blackwell also adds a faster NVLink fabric, which matters for tensor parallelism: cross-GPU communication is the overhead that makes TP costly, and a fatter link shrinks it.

:::interview
**"Why does new GPU hardware matter for inference, beyond 'faster'?"** Because inference is **memory-bound in decode** (page 17-09), the wins that matter are memory *capacity* and *bandwidth*, plus support for lower-precision formats that shrink weights and KV cache. Blackwell's native FP4 and larger, faster memory let one GPU hold far more concurrent KV cache — which raises the ceiling on users-per-GPU, the number that actually drives serving cost. Raw FLOPs help prefill; memory helps the decode you spend most time in.
:::
