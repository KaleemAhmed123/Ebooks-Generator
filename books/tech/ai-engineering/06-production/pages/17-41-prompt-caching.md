## Prompt caching

- If many requests share a prefix, prefilling it every time is wasted compute. **Prompt caching** stores the KV state of a prefix and reuses it — the serving-side prefix caching of vLLM/SGLang, exposed as a product feature by API providers.
- Two flavours, same idea at different layers:

| Layer | Who | Mechanism |
|---|---|---|
| **serving KV prefix cache** | you (vLLM/SGLang/LMCache) | reuse cached KV blocks for a matching prefix |
| **provider prompt cache** | OpenAI/Anthropic/Google | cache your prompt prefix; charge cached reads at a fraction |

- **The provider economics are the headline — and the discount differs sharply by provider.** As of late 2026, cached reads bill at a fraction of the normal input rate, but not the same fraction: **Anthropic** ~10% (a 90% discount), **Google Gemini** ~25% (a ~75% discount, but with a separate per-hour cache-storage fee), **OpenAI** ~50%. For a long fixed system prompt sent on every request the saving is large — and deepest where the cached-read rate is lowest.
- **The two styles differ.** OpenAI caches automatically once a prefix passes a length threshold (~1k tokens). Anthropic is explicit: you mark cache breakpoints with `cache_control` (a few per request), with a short time-to-live (~5 minutes) that a steady stream of traffic keeps warm.

:::mint
```text
Request: 1,800-token fixed system prompt + 200-token user turn, 1M requests/mo
Input price $3 / 1M tokens, cached reads at 10% (Anthropic) = $0.30 / 1M

No cache:  1M × 2,000 × $3/1e6         = $6,000 / mo
Cached:    system 1,800 @ $0.30 + user 200 @ $3
           = 1M × (1,800×0.3 + 200×3)/1e6 = $1,140 / mo   -> ~81% off
```
:::

:::warn
The whole discount evaporates if the prefix is not byte-identical. A timestamp, a per-user greeting, or a request ID placed *before* the reusable content changes the prefix on every call, so nothing caches. Structure prompts **stable-first, volatile-last** — the same rule as RadixAttention (17-21), and the single most common reason a prompt-cache line item never drops.
:::
