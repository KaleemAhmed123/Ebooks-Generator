## Agent Loop

The cycle of model, tool call, observation, model — repeating until done.
Everything sold as agentic is some version of this loop.

Without a step cap, a confused agent loops on a failing tool four hundred times
and spends the day's budget by lunch.

### How it works

The loop is short. The model receives context and decides either to answer or to
call a tool. If it calls a tool, your code runs it and feeds the result back
into context. Repeat until it answers or something stops it.

<svg viewBox="0 0 460 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The model either answers and the run ends, or it calls a tool; your code runs the tool and the result returns to context, repeating the loop">
  <rect x="6" y="20" width="128" height="44" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.6"/>
  <text x="70" y="47" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#c25a35">model decides</text>
  <path d="M136 32 H186" stroke="#1a1a1a" stroke-width="1.3"/><path d="M186 32 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="194" y="36" font-family="Georgia,serif" font-size="10.5" fill="#1a1a1a">answer — the run ends</text>
  <path d="M136 52 H186" stroke="#1a1a1a" stroke-width="1.3"/><path d="M186 52 l-7 -4 v8 z" fill="#1a1a1a"/>
  <text x="194" y="56" font-family="Georgia,serif" font-size="10.5" fill="#1a1a1a">call a tool</text>
  <rect x="286" y="38" width="150" height="28" fill="none" stroke="#1a1a1a" stroke-width="1.4"/>
  <text x="361" y="56" text-anchor="middle" font-family="Georgia,serif" font-size="10.5" fill="#1a1a1a">your code runs it</text>
  <path d="M436 66 V90 H36 V68" stroke="#1a1a1a" stroke-width="1.3" fill="none"/>
  <path d="M36 68 l-4 7 h8 z" fill="#1a1a1a"/>
  <text x="236" y="106" text-anchor="middle" font-family="Georgia,serif" font-size="9.5" fill="#6b6b6b">the result goes back into context, and the model decides again</text>
</svg>

The intelligence is the model's choice at each step. The engineering is entirely
the control structure around it, and that is where these fail.

The model has no reliable sense of how long it has been running or what it has
spent. An unhelpful tool error gets retried indefinitely — every attempt locally
reasonable, the run making no progress.

### In practice

Cap steps, tokens, wall time and spend per run, and add repeated-call
detection — the same tool with the same arguments three times means stop.

When a cap trips, surface the partial result and raise an alert. A truncated
answer with an explanation is worth far more than a spinner that never resolves.

### The three ways a run ends

Two of the three are exits you have to build yourself.

| | Ends because | Who decides |
|---|---|---|
| Answer | the model chose to stop calling tools | the model |
| Cap | steps, tokens, wall time or spend ran out | you |
| Loop detected | same tool, same arguments, three times | you |
