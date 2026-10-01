## Observability: tracing an agent run

- Tracing a single LLM call (19-53) is easy; tracing an *agent* — a tree of dozens of LLM calls, tool calls, and sub-agents over minutes — is what makes autonomy debuggable. The trace *is* the agent's execution history (Flagship 4).

<svg viewBox="0 0 360 96" role="img" aria-label="An agent run trace as a nested tree of spans: the run, planning, tool calls, a sub-agent, each with tokens, cost, latency" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="12" y="12" width="336" height="11" rx="2" fill="#24405e"/><text x="16" y="20" fill="#fff" font-size="5.5">run: fix issue #42  ·  14 steps  ·  38s  ·  $0.21</text>
  <rect x="28" y="26" width="150" height="10" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="32" y="34" font-size="5">llm: plan  ·  1.2s  ·  $0.02</text>
  <rect x="28" y="39" width="110" height="10" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="32" y="47" font-size="5">tool: read_file  ·  0.1s</text>
  <rect x="28" y="52" width="200" height="10" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="32" y="60" font-size="5">llm: decide edit  ·  0.9s  ·  $0.02</text>
  <rect x="44" y="65" width="150" height="10" rx="2" fill="#f3ede8" stroke="#8a6d3b"/><text x="48" y="73" font-size="5">sub-agent: find auth handler</text>
  <rect x="28" y="78" width="130" height="10" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="32" y="86" font-size="5">tool: run_tests  ·  FAIL ·  loop →</text>
</svg>

- **Every step is a span, nested by causality.** The run span holds planning, tool, and sub-agent spans, each carrying tokens, cost, latency, and outcome. Reading the tree top-down replays exactly what the agent did — where it looped, which tool failed, which step burned the tokens, where a sub-agent went astray. This turns "the agent failed somehow" into a precise diagnosis (Flagship 4).
- **The agent-specific views** the trace enables: *cost per run* broken down by step (which tool/model dominated), *loop detection* (the same span repeating), *trajectory review* (did it take a sensible path?), and *replay* (re-run from a checkpoint with a fix). Without the trace, none of these are possible and long-running autonomy is a black box.

:::interview
"An agent took 40 steps and $2 to do a simple task. How do you find out why?"

Read its **trace** — the nested span tree of the whole run. Each step (LLM call, tool call, sub-agent) is a span with tokens, cost, latency, and outcome, so I look for the pattern: a *loop* (the same span repeating — it got stuck retrying a failing tool), an *observation blowout* (a tool dumped a huge output that bloated context and cost, 19-39a), a *wrong path* (it explored irrelevant files), or a sub-agent that spiraled. The trace turns "it was slow and expensive" into "it looped on run_tests 20 times because a fixture was missing at step 6." This is why OTel tracing of every agent step (Flagship 4) isn't optional — it's the only way autonomy is debuggable, and cost-per-run-by-step is the view that finds the waste.
:::
