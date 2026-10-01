## Coding agent: observability and defense

- An agent that runs for many steps is undebuggable without a trace of what it did. **OpenTelemetry** (Module 17, Booklet 5) instruments every step as a span, so you can replay a run, find where it went wrong, and measure it.

:::mint
```python
from opentelemetry import trace
tracer = trace.get_tracer("coding-agent")

def traced_step(step, call, fn):
    with tracer.start_as_current_span("tool_call") as span:
        span.set_attribute("step", step)
        span.set_attribute("tool.name", call.name)
        out = fn()
        span.set_attribute("tool.exit_ok", out.get("ok", True))
        span.set_attribute("obs.tokens", count_tokens(out))
        return out
```
:::

- **A run becomes a trace** (Booklet 5): one span per tool call, carrying the tool, arguments, outcome, tokens, and latency — nested under a run span with the task and total cost. This is what turns "the agent failed somehow" into "it looped on `run_tests` because the fixture was missing at step 12."
- **The full defense stack**, assembled: typed **schema validation** (bad calls rejected), **least-privilege** tools (no exfiltration path), **sandbox** (contained, no-network execution), **verification gates** (objective success signal), **budgets** (step + observation + cost), and **tracing** (replayable audit). Each ring from a different part of this series.

:::interview
"What makes a coding agent production-ready rather than a demo?"

The harness, not the model. Concretely: **schema-validated tools** so malformed calls become retryable errors, not crashes; **least-privilege registration** so a hijacked agent can't reach beyond its task (Module 18); a **no-network sandbox with a filesystem denylist** so execution is contained; **verification gates** (tests must pass, on a signal the agent doesn't control) so "done" means *proven*, not *claimed*; **step/observation/cost budgets** so it can't loop or bankrupt you; and **OTel tracing** so every run is replayable and measurable. A better model improves the *success rate*; this harness is what makes the failures *safe and debuggable* — which is what "production" means for autonomy.
:::
