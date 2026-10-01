## KV-cache quantization

- Weight quantization (17-39) shrinks the model. But at long context and high concurrency, the **KV cache** — not the weights — is what fills the GPU (17-11). **KV-cache quantization** stores the cached keys and values in fewer bits, directly buying back the resource that caps concurrency.

:::mint
```text
Llama-70B, 8k context, KV cache per request (from 17-11):
  FP16 KV:  ~2.5 GB/request
  FP8  KV:  ~1.25 GB/request   -> 2× more concurrent users
  INT4 KV:  ~0.6 GB/request    -> ~4× more concurrent users

The GPU that held 30 concurrent 8k requests in FP16 KV
holds ~60 in FP8 KV, ~120 in INT4 KV — same weights, same model.
```
:::

- **It targets the exact bottleneck.** Since decode is memory-bound and concurrency is KV-capped, halving the KV cache roughly doubles how many users a GPU serves — often a *bigger* serving win than quantising the weights, especially for long-context workloads (RAG, agents, long chats) where the cache dwarfs the weights.
- **The quality cost is usually smaller than weight quantization's**, because the KV cache is more tolerant of precision loss than the weights themselves — FP8 KV is frequently near-free, and INT4 KV is viable for many workloads with an eval check. It is enabled per-engine (a KV-cache dtype flag).

:::warn
KV-cache quantization degrades differently from weight quantization: it can hurt **long-context recall** specifically — the model's ability to accurately attend to something far back in the context — because those distant keys/values are exactly what's being compressed. A model that summarises fine may start missing details buried deep in a long document. So evaluate KV quantization on your *long-context* tasks (needle-in-a-haystack, long-doc QA), not just short prompts, before shipping it — the failure hides precisely where short-prompt tests can't see it.
:::
