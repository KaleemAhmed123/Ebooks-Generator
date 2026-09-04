## Agent Loop

Model, tool call, observation, model — repeating until done. The model receives
context and decides either to answer or to call a tool; your code runs the tool
and feeds the result back into context. Everything sold as agentic is a version
of this loop.

<svg viewBox="0 0 460 106" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The model either answers and the run ends, or it calls a tool; your code runs the tool and the result returns to context, repeating the loop">
  <rect x="6" y="18" width="126" height="44" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.5"/>
  <text x="69" y="45" text-anchor="middle" font-family="Georgia,serif" font-size="10.5" fill="#c25a35">model decides</text>
  <path d="M134 30 H180" stroke="#1a1a1a" stroke-width="1.2"/><path d="M180 30 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="188" y="34" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">answer — the run ends</text>
  <path d="M134 50 H180" stroke="#1a1a1a" stroke-width="1.2"/><path d="M180 50 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="188" y="54" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">call a tool</text>
  <rect x="288" y="36" width="148" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.3"/>
  <text x="362" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="10" fill="#1a1a1a">your code runs it</text>
  <path d="M436 64 V86 H36 V64" stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  <path d="M36 64 l-4 7 h8 z" fill="#1a1a1a"/>
  <text x="236" y="102" text-anchor="middle" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">the result goes back into context, and the model decides again</text>
</svg>

The intelligence is the model's choice at each step. The engineering is the
control structure around it, and that is where these fail.

**A run ends three ways and you have to build two of them.** The model choosing
to stop calling tools is its exit. Steps, tokens, wall time or spend running out
is yours, and so is noticing the same tool called with the same arguments three
times in a row.

## Agent Observability

Tracing every prompt, tool call, observation, token and cost per run. Capture
what determined the outcome: the fully rendered prompt at each step, every tool
call with its arguments, every result returned, the model and its version,
tokens and latency per step, the final output, and why the run ended.

Sample the happy path to keep storage sane. Keep everything for failures,
anomalies and runs where a cap tripped — those are the ones you will want in six
weeks when someone asks whether the new model made things worse.

**The rendered prompt is the field teams skip and need most.** Your code
assembles it from templates, retrieved chunks and history, so the template alone
does not show what the model actually saw. Most surprising agent behaviour turns
out to be a prompt that assembled differently than anyone expected.
