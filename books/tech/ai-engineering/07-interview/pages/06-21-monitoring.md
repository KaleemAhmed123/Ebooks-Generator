## What do you monitor for an LLM application in production?

- Beyond standard service golden signals (latency, traffic, errors, saturation), LLM apps need **quality and cost** observability.
- The dashboard:
  - **Latency** — TTFT and TPOT percentiles (p50/p95/p99), not averages.
  - **Throughput / saturation** — tokens/sec, GPU utilisation, KV-cache occupancy, queue depth.
  - **Errors** — API failures, timeouts, rate-limit hits, **guardrail triggers**, schema-validation failures, tool-call errors.
  - **Cost** — tokens and $ per request, per feature, per user/tenant; cache hit rates.
  - **Quality (the LLM-specific part)** — sample outputs scored by an LLM judge online, user feedback (thumbs, edits), refusal/hallucination/groundedness rates, task-success proxies.
  - **Drift** — input distribution shifts and output-quality trends over time.
- Tie it together with **tracing** (every call's prompt, context, tools, output, cost) so you can drill from a metric to the offending request.
- The key extra vs normal services: you must monitor **output quality and cost**, which don't exist for a CRUD API.

:::interview
What's really being tested: that you add quality + cost + guardrail monitoring (and tracing) on top of the standard golden signals, using percentiles — the LLM-specific observability surface.
:::
