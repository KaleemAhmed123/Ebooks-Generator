## What does observability for an agent look like, and why is it harder than for a normal service?

- A normal request is one span; an agent is a **tree of LLM calls, tool calls, and retrievals** with branching and loops. To debug "why did it do that," you must see the whole trajectory.
- What to capture, per step:
  - **Inputs/outputs** of every LLM call (prompt, response, token counts).
  - **Tool calls** (arguments, results, errors, latency).
  - **Retrieved context** (what chunks, from where).
  - **Decisions** (why it chose a tool, confidence if available), **cost**, and **latency** per step and per run.
- Use **tracing** with spans (OpenTelemetry GenAI conventions; tools like LangSmith/Langfuse) so a run is a navigable tree, and aggregate for metrics (success rate, steps, cost, tool error rates).
- Why harder: non-determinism (same input, different path), long branching traces, and failures that only make sense in the context of earlier steps.
- Observability isn't optional for agents — without the trace you can't diagnose, eval, or improve them.

:::interview
What's really being tested: that agents need full-trajectory tracing (LLM + tool + retrieval spans, cost/latency), why branching non-deterministic runs make it harder, and that it's a prerequisite for debugging/eval.
:::
