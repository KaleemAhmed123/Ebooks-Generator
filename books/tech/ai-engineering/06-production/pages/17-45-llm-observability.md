## LLM observability

- You cannot operate what you cannot see. **Observability** for LLM systems is the practice of emitting enough signal — traces, metrics, logs — to answer *what happened, why, how slow, and how much it cost* for any request, after the fact.
- Booklet 5 introduced **OpenTelemetry GenAI** semantic conventions — a standard vocabulary for LLM spans (the model, token counts, latency, cost). Here that becomes the production backbone: every request is a **trace**, every model/tool/retrieval call a **span** inside it.

<svg viewBox="0 0 360 96" role="img" aria-label="A request trace with nested spans for gateway, retrieval, LLM call, and tool call, each carrying tokens, latency, and cost" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="14" width="332" height="12" rx="2" fill="#24405e"/><text x="20" y="23" font-size="6" fill="#fff">trace: POST /chat  ·  1,240 ms  ·  $0.004</text>
  <rect x="30" y="30" width="70" height="11" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="34" y="38" font-size="5.5">gateway 40ms</text>
  <rect x="30" y="44" width="120" height="11" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="34" y="52" font-size="5.5">retrieval 180ms · 6 chunks</text>
  <rect x="30" y="58" width="240" height="11" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="34" y="66" font-size="5.5">llm call 980ms · in 2,100 / out 300 tok · $0.004</text>
  <rect x="30" y="72" width="90" height="11" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="34" y="80" font-size="5.5">tool: search 120ms</text>
</svg>

- **The three signals, LLM-flavoured.** *Traces* — the full nested story of one request. *Metrics* — TTFT/TPOT/goodput/error-rate/cost, aggregated. *Logs* — the actual prompts and outputs (redacted), the only way to debug a *quality* failure, which a metric can never show.
- Tools (LangSmith, Langfuse, Arize, and OpenTelemetry-native stacks) collect and visualise these. What matters is the *shape*: request-scoped traces with token and cost attributes on every span.

:::note
LLM observability adds two axes ordinary APM (application performance monitoring) lacks: **cost** (tokens × rate on every span) and **quality** (the output was produced quickly and cheaply — but was it *right*?). A 200 ms response that hallucinated is a failure no latency dashboard catches. This is why prompt/output logging and eval-in-production (Module 18, Module 19) sit inside observability, not beside it.
:::
