## What is prompt caching, and when does it save real money?

- Every request re-processes the whole prompt through the model (the **prefill** phase). If many requests share a long, identical prefix — a big system prompt, tool definitions, a few-shot block, a long document — that work is repeated every time.
- **Prompt caching** stores the model's internal state (the KV cache) for a shared prefix so later requests **skip re-computing it**. Cached input tokens are billed at a steep discount — commonly **~10% of the normal input rate** — and prefill latency drops.
- It pays off when: a large **static prefix** is reused across many calls (RAG system prompts, agents with fixed tool specs, multi-turn chat).
- Mechanics to know: the cache matches on an **exact prefix** (put static content first, variable content last), has a short **TTL**, and some providers cache automatically while others need an explicit marker.

:::interview
What's really being tested: that caching discounts the repeated prefill of a shared prefix (big savings for fixed system prompts/tools), and the practical rule — static content first, dynamic last.
:::
