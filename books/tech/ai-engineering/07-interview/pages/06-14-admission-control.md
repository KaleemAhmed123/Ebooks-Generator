## Traffic spikes beyond capacity. How do you protect the service?

- You can't instantly add GPU capacity (cold start), so you protect what you have and shed load gracefully rather than melting down.
- Levers:
  - **Rate limiting / quotas** — per-user/tenant/API-key limits so one caller can't starve others; return 429 with retry-after.
  - **Admission control** — when the KV-cache pool / queue is near saturation, **refuse or queue** new requests to protect the latency of already-admitted ones. Better to reject fast than to admit everyone and blow every SLO.
  - **Priority queues** — interactive traffic ahead of batch/background; premium tiers ahead of free.
  - **Load shedding / degradation** — route overflow to a smaller/cheaper model, shorten max output, or serve a cached/fallback response.
  - **Backpressure** upstream so clients slow down.
- Principle: **graceful degradation over collapse** — a bounded set of fast, good responses plus honest rejections beats everyone getting slow, failing responses.

:::interview
What's really being tested: that you shed load deliberately (rate limits, admission control, priority, degradation) to protect admitted requests' SLO — not try to serve everything and fail globally.
:::
