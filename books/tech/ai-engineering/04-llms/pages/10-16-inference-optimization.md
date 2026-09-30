## Inference optimization

- Training happens once; **inference happens forever.** For a deployed model, serving cost dominates, so squeezing more tokens per second per GPU is the core engineering. Start by knowing where the time goes.
- Generation has **two phases** with opposite bottlenecks:

<svg viewBox="0 0 320 66" role="img" aria-label="Prefill processes the whole prompt in parallel and is compute-bound; decode emits one token at a time and is memory-bandwidth-bound" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="10" y="16" width="130" height="36" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="75" y="30" text-anchor="middle" font-size="8" fill="#24405e">prefill</text><text x="75" y="42" text-anchor="middle">whole prompt at once</text>
  <rect x="180" y="16" width="130" height="36" rx="3" fill="#24405e"/><text x="245" y="30" text-anchor="middle" font-size="8" fill="#fff">decode</text><text x="245" y="42" text-anchor="middle" fill="#fff">one token at a time</text>
  <text x="75" y="62" text-anchor="middle" fill="#c0392b" font-size="7">compute-bound</text>
  <text x="245" y="62" text-anchor="middle" fill="#c0392b" font-size="7">memory-bandwidth-bound</text>
</svg>

- **Prefill** — the prompt is processed in parallel in one pass; limited by GPU compute.
- **Decode** — each new token needs a full pass but produces only one token; the GPU spends most time *reading weights and KV-cache from memory*, not computing. This is why decode is slow and why bandwidth matters more than FLOPs here.
- The levers, most already met in Booklet 3:
  - **KV cache** (page 07-17) — reuse past keys/values instead of recomputing them each step.
  - **Continuous batching** — merge many users' requests into one rolling batch so the GPU is never idle waiting for the slowest one.
  - **Speculative decoding** (page 07-21) — a small draft model proposes several tokens, the big model verifies them in one pass. 2–3× faster, same output.
  - **Quantization** (this module) — smaller weights = less memory to read per token.

:::warn
The KV cache is the memory hog. It grows with batch size × sequence length and can dwarf the model weights on long contexts — one long-context request can blow the memory budget for dozens of short ones. Managing KV-cache memory is the central problem the serving engines (next page) exist to solve.
:::
