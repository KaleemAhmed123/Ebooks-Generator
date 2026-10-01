## Flagship 9: observability dashboard — build

- **Goal:** build the instrumentation that makes an LLM app observable — emit OpenTelemetry GenAI spans carrying tokens, cost, latency, and quality, so every request is traceable and the golden signals (17-46) are measurable. The mock (19-15) designed the platform; this instruments an app for it.

:::mint
```python
from opentelemetry import trace
tracer = trace.get_tracer("llm-app")

def traced_llm_call(messages, model):
    with tracer.start_as_current_span("gen_ai.chat") as span:
        span.set_attribute("gen_ai.request.model", model)     # OTel GenAI conv.
        resp = client.chat.completions.create(model=model, messages=messages)
        u = resp.usage
        span.set_attribute("gen_ai.usage.input_tokens",  u.prompt_tokens)
        span.set_attribute("gen_ai.usage.output_tokens", u.completion_tokens)
        span.set_attribute("gen_ai.cost_usd", cost(model, u))  # tokens × rate
        return resp
```
:::

- **The OTel GenAI semantic conventions** (Booklet 5, 17-45) give standard attribute names — `gen_ai.request.model`, `gen_ai.usage.*` — so any backend (Langfuse, Grafana, an OTel collector) understands your spans without custom parsing. Standardising on them is what makes the dashboard portable across tools.
- **Cost is a first-class attribute**, computed at emit time (`tokens × rate`), so per-request, per-feature, per-user cost rolls up for FinOps (17-55) directly from the traces — no separate accounting pipeline.

:::note
The reason to instrument at the *span* level, not just log a request, is that an LLM request is usually a *tree* — a RAG call has retrieval + rerank + generation spans; an agent run has one span per tool call. A flat log tells you "the request was slow"; a trace tells you "the rerank span took 800 ms." Emitting proper nested spans with token/cost/latency attributes is what turns raw logging into the debuggable, measurable observability the whole ops story (Module 17) depends on.
:::
