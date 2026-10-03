## LangGraph: breakpoints and time travel

- Because every step is checkpointed (14-50), you can inspect the run's *history* and even **rewind** it — "time travel." This turns debugging an agent from guesswork into stepping through saved states.

<svg viewBox="0 0 360 74" role="img" aria-label="A run's checkpoints form a history you can inspect, rewind to, and re-run from with an edit" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="20" y1="30" x2="300" y2="30" stroke="#888"/>
  <g fill="#24405e"><circle cx="50" cy="30" r="5"/><circle cx="120" cy="30" r="5"/><circle cx="190" cy="30" r="5"/><circle cx="260" cy="30" r="5"/></g>
  <text x="50" y="20" text-anchor="middle" font-size="5.5">c1</text><text x="120" y="20" text-anchor="middle" font-size="5.5">c2</text><text x="190" y="20" text-anchor="middle" font-size="5.5">c3 ✎</text><text x="260" y="20" text-anchor="middle" font-size="5.5">c4</text>
  <path d="M190 38 Q230 60 300 52" stroke="#a03050" fill="none" marker-end="url(#tt)"/><text x="250" y="66" font-size="5.5" fill="#a03050">rewind to c3, edit, re-run</text>
  <defs><marker id="tt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

- **Inspect history.** You can list a thread's checkpoints and read the exact state at each step — what the model saw, what it decided, what a tool returned. When an agent goes wrong, you find the checkpoint where it went wrong, not by adding print statements but by reading the saved states (the tracing idea of 13-44, built into the framework).
- **Breakpoints.** You can set the graph to pause *before* or *after* specific nodes, to examine or approve state at those points — like a debugger's breakpoints, but for an agent run.
- **Time travel.** You can **rewind to an earlier checkpoint**, optionally **edit** its state, and **re-run forward** from there. This lets you ask "what if the model had chosen differently at step 3?" — replay with a change and see the new outcome, without re-running the whole thing.

- Together these make agents **debuggable**. The hardest thing about agents is that they are non-deterministic and multi-step; checkpoint history plus rewind lets you localize and reproduce a failure precisely.

:::note
Time travel is the clearest payoff of "make control flow and state explicit data." A raw loop is a black box — when it misbehaves you re-run and hope. A checkpointed graph is a filmstrip you can scrub, freeze, edit a frame, and replay. For agents, whose failures are subtle and multi-step, this is the difference between debugging and guessing — and a major reason serious teams accept LangGraph's verbosity.
:::
