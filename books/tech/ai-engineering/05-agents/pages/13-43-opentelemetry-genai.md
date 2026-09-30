## OpenTelemetry for GenAI

- When an agent misbehaves in production, you need to see *what it did* — every model call, tool call, and their inputs/outputs. **OpenTelemetry (OTel)** is the industry-standard framework for this "observability," and it now has **GenAI semantic conventions** — an agreed schema for recording LLM and agent operations. **[VERIFY conventions status]**
- Two core concepts:
  - **Span** — a timed unit of work with attributes: one model call, one tool call, one retrieval. It records start/end time, inputs, outputs, and metadata (model name, token counts, cost).
  - **Trace** — a tree of spans for one end-to-end request. An agent run is a trace; each step is a span nested under it.

<svg viewBox="0 0 360 100" role="img" aria-label="A trace is a tree of spans: the agent run contains model calls and tool calls as nested spans" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="20" y="16" width="320" height="16" rx="2" fill="#24405e"/><text x="30" y="28" fill="#fff" font-size="6">trace: agent run (2.4s)</text>
  <rect x="40" y="38" width="120" height="14" rx="2" fill="#6a9bd0"/><text x="48" y="49" fill="#fff" font-size="5.5">span: model call (0.8s)</text>
  <rect x="40" y="56" width="90" height="14" rx="2" fill="#a03050"/><text x="46" y="67" fill="#fff" font-size="5.5">span: tool get_weather</text>
  <rect x="40" y="74" width="150" height="14" rx="2" fill="#6a9bd0"/><text x="48" y="85" fill="#fff" font-size="5.5">span: model call (final answer)</text>
</svg>

- **Why the standard matters:** without agreed conventions, every tool logs differently and nothing interoperates. GenAI semantic conventions define standard attribute names (`gen_ai.request.model`, token usage, tool name) so any OTel-compatible backend — LangSmith, Langfuse, Grafana, Datadog — can ingest and display agent traces the same way.
- You **instrument once** (emit OTel spans) and view **anywhere**. This is the vendor-neutral foundation under the agent-observability tools you will meet in Module 14 (LangSmith, Langfuse) — many speak OTel underneath.

:::note
The shift from "logging" to "tracing" is the shift you need for agents. A flat log of lines cannot show that the final answer came from a tool result three steps back that was already wrong. A trace — nested spans with inputs and outputs — reconstructs the whole decision path, which is the only way to debug why an agent did what it did.
:::
