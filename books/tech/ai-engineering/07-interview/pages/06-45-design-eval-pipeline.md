## Design an observability and evaluation pipeline for LLM products.

- **Goal:** know the quality, cost, and latency of every LLM feature, catch regressions, and improve from real traffic.
- **Tracing (the foundation):** instrument every call with spans — prompt, model/version, params, retrieved context, tool calls, output, tokens, cost, latency. Agent runs are trace trees. Use OpenTelemetry-GenAI conventions so it plugs into existing tooling. [VERIFY: tooling names.]
- **Offline eval:** a versioned **golden set** per feature; run on every prompt/model change in **CI**; scores from deterministic checks + LLM judge (validated vs humans). Block regressions.
- **Online eval:** sample live traffic, score with the judge, collect **user feedback** (thumbs, edits); compute groundedness/refusal/hallucination rates and task-success proxies continuously.
- **Dashboards & alerts:** quality, cost, latency percentiles, guardrail hits, drift — with alerting on regressions and anomalies.
- **Feedback loop:** mine failing production traces → add to the golden set → fixes get a regression test. This loop is the whole point.
- **Tradeoffs:** judge cost/latency (sample, don't score everything), trace storage/retention (sample + redact PII), judge reliability (periodic human calibration).

:::interview
What's really being tested: that you build tracing + offline(CI) + online eval + a feedback loop into one system, validate the judge, and treat production failures as new eval cases — closed-loop quality engineering.
:::
