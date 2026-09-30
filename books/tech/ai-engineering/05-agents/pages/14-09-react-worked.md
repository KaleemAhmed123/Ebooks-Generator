## ReAct: a worked trace

- The actual ReAct format, on a multi-hop question: *"Who directed the highest-grossing film of the director of Inception's favorite genre?"* — simplified to show the shape.

:::mint
```text
Thought: I need to find who directed Inception first.
Action:  search("director of Inception")
Observation: Christopher Nolan directed Inception.

Thought: Now I need Nolan's highest-grossing film.
Action:  search("Christopher Nolan highest grossing film")
Observation: "Barbie" is not his — his is "The Dark Knight Rises"
             / "Oppenheimer" depending on source. Take Oppenheimer.

Thought: The question asks who directed it — that's Nolan himself.
Action:  finish("Christopher Nolan")
```
:::

- **Read the structure:** every step is `Thought` (reasoning) → `Action` (tool) → `Observation` (result). The final step calls a `finish` action (or emits plain text) to end — the graceful stop of 14-05.
- **Watch the self-correction.** At step 2 the observation is messy/ambiguous; the Thought at step 3 resolves it ("the question asks who directed it — that's Nolan himself"). The explicit reasoning is where the model catches that the last hop loops back. Without written thoughts, it might have run another needless search.
- **Watch error recovery.** If `search` had returned "no results," the next Thought would reason about it ("that query was too specific; try a broader one") and issue a corrected Action — the loop absorbs failure as just another observation (13-10).

<svg viewBox="0 0 360 56" role="img" aria-label="A multi-hop chain where each observation feeds the next thought" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="20" width="80" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="50" y="33" text-anchor="middle">find director</text>
  <rect x="110" y="20" width="90" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="155" y="33" text-anchor="middle">find top film</text>
  <rect x="220" y="20" width="130" height="20" rx="3" fill="#1a3a2a"/><text x="285" y="33" text-anchor="middle" fill="#fff">resolve: same person → done</text>
  <path d="M90 30 L108 30" stroke="#888" marker-end="url(#rw)"/><path d="M200 30 L218 30" stroke="#888" marker-end="url(#rw)"/>
  <defs><marker id="rw" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

:::warn
ReAct's weakness is **long, wandering chains**. On hard tasks it can take many steps, and because each step only sees the accumulated transcript, it can lose the thread, repeat searches, or drift off-goal. This is exactly why plan-first patterns (next) exist — commit to a plan up front so the agent has a spine to follow instead of re-deciding everything each turn.
:::
