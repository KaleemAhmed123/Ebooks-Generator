## Agent Observability

Tracing every prompt, tool call, observation and token cost per run. Without it,
"the agent did something weird" is not a report anyone can act on.

A trace showed an agent retrying a tool twelve times, because a 400 error came
back as a plain string that the model read as an instruction to try again.

### How it works

When an agent misbehaves, the report you receive is that it did something
strange. Without a record there is nothing to investigate — the run is gone, and
re-running it may not reproduce the behaviour.

What has to be captured is everything that determined the outcome: the fully
rendered prompt at each step, every tool call with its arguments, every result
returned, the model and its version, tokens, cost and latency per step, the
final output, and why the run ended.

**The rendered prompt is the field teams skip and need most.** Your code
assembles it from templates, retrieved chunks and history, so the template alone
does not tell you what the model actually saw. Most surprising agent behaviour
turns out to be a prompt that assembled differently than anyone expected.

With a complete trace, debugging is reading. Without one it is guessing, and the
guesses are expensive because each test costs a run.

### In practice

Trace data is also your evaluation dataset. Real runs, with real inputs and
known-bad outcomes, are exactly what a regression suite should contain and are
better than anything you would invent at a desk.

Sample the happy path to keep the cost sane. Keep everything for failures,
anomalies and any run where a cap tripped — those are the ones you will want in
six weeks when someone asks whether the new model made things worse.
