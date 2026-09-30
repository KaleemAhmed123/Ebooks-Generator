## Prompt caching

- Many requests share a long, identical **prefix** — a big system prompt, few-shot examples, a document, a tool schema. Recomputing that prefix's attention every call is pure waste. **Prompt caching** stores the computed KV cache (page 07-17) for a prefix and reuses it, charging a fraction of the price.
- The saving is large. As of September 2026, cached input tokens are billed at roughly **10% of the normal input rate** on the major providers — a 90% discount on the cached part.

<svg viewBox="0 0 320 58" role="img" aria-label="A shared prefix is computed once and cached; each request pays full price only for its new suffix" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7.5" fill="#1a1a1a">
  <rect x="14" y="16" width="180" height="18" fill="#e8f4fd" stroke="#24405e"/><text x="104" y="28" text-anchor="middle" fill="#24405e">shared prefix — cached, ~10% price</text>
  <rect x="196" y="16" width="108" height="18" fill="#eafaf0" stroke="#1a3a2a"/><text x="250" y="28" text-anchor="middle" fill="#1a3a2a">new suffix — full price</text>
  <text x="160" y="48" text-anchor="middle" fill="#6b6b6b" font-size="7">reused across every request that starts the same way</text>
</svg>

- Two flavours (September 2026):
  - **Automatic** (OpenAI-style) — caching kicks in for any stable prefix over ~1,024 tokens, no code changes.
  - **Explicit** (Anthropic-style) — you mark cache breakpoints with a `cache_control` parameter, up to four; more control, small code change. Default TTL ~5 minutes, with a longer paid option.
- Biggest wins: long system prompts, RAG with a stable instruction block, multi-turn chats (the growing history is a growing shared prefix), agents that reuse a big tool schema.

:::warn
Caching only helps a **stable prefix**. Change one token near the start — a timestamp, a per-user note, reordered context — and the cache misses, so you pay the higher *write* rate for nothing. Put everything variable at the **end**. And the cache is short-lived; sparse traffic expires it before the next hit, erasing the benefit.
:::
