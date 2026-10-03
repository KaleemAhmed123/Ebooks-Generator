## A product's LLM bill is too high. What levers do you pull?

- Attack it in order of leverage:
  - **Right-size the model** — route easy requests to a smaller/cheaper model; reserve the frontier model for hard ones (see cascades/routing).
  - **Cut tokens** — shorter system prompts, fewer/retrieved-not-dumped context chunks, trim few-shot, cap output length. You pay per token both ways.
  - **Prompt caching** — discount the repeated static prefix.
  - **Batching** — batch APIs for non-real-time work are ~50% cheaper.
  - **Semantic caching** — serve repeated/near-duplicate queries from a cache instead of the model.
  - **Quantize / self-host** at volume — if traffic is steady and high, owned GPUs can beat per-token APIs.
  - **Fine-tune a small model** for a narrow high-volume task instead of prompting a big one.
- Then **measure cost per request** and set budgets/alerts. Optimise the expensive endpoints, not uniformly.

:::interview
What's really being tested: a prioritised toolkit (model right-sizing and token reduction first, then caching/batching/self-host) and the instinct to measure per-request cost before optimising.
:::
