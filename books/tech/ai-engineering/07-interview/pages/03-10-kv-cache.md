## What is the KV cache, and what problem does it solve?

- Generation is autoregressive: to produce token t+1 the model attends over all previous tokens' Keys and Values. Naively, each new token recomputes K and V for the **entire** prefix — O(n²) wasted work over a sequence.
- The **KV cache** stores the Key and Value vectors for every past token, so each new step computes K,V for **only the new token** and reuses the rest. Generation drops from quadratic to linear per token.
- It's the reason LLM serving is fast — and the reason it's **memory-bound**: the cache grows with every token and every concurrent request, and it, not the weights, usually sets how many requests a GPU can serve.
- Prefill (process the prompt, fill the cache) vs decode (generate using the cache) is the fundamental two-phase structure of LLM inference.

:::interview
What's really being tested:

that you know it trades memory for compute (store K,V to avoid recomputation) and that it's what makes serving memory-bound — the lead-in to paged attention and GQA.
:::
