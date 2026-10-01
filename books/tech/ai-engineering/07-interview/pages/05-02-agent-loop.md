## Describe the basic agent loop.

- An agent runs a loop: **observe → think → act → observe the result → repeat**, until it decides the goal is met or a stop condition fires.
- Concretely each turn: the model sees the goal + history + available tools, decides to either **call a tool** (with arguments) or **finish**; the tool runs; its result is appended to the context; the loop continues.

<svg viewBox="0 0 250 92" role="img" aria-label="Loop: model thinks, chooses a tool, tool executes, result feeds back to the model, until it answers" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="8" fill="#1a1a1a">
  <rect x="90" y="8" width="70" height="16" rx="2" fill="#24405e"/><text x="125" y="19" text-anchor="middle" fill="#fff">LLM decides</text>
  <rect x="170" y="40" width="64" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="202" y="51" text-anchor="middle">run tool</text>
  <rect x="90" y="72" width="70" height="16" rx="2" fill="#e8f4ec" stroke="#1a3a2a"/><text x="125" y="83" text-anchor="middle">observe result</text>
  <rect x="12" y="40" width="60" height="16" rx="2" fill="#1a3a2a"/><text x="42" y="51" text-anchor="middle" fill="#fff">finish</text>
  <path d="M160 18 C200 22, 210 30, 202 40" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <path d="M190 56 C180 66, 160 70, 150 72" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <path d="M100 72 C70 64, 95 30, 100 24" stroke="#1a1a1a" fill="none" marker-end="url(#al)"/>
  <path d="M90 16 L72 44" stroke="#999" fill="none" marker-end="url(#al)"/><text x="60" y="30" font-size="6.5" fill="#6b6b6b">done?</text>
  <defs><marker id="al" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

- The three things that make or break it: **what tools** it has, **what's in the context** each turn (memory/history management), and **when it stops** (goal met, budget, max steps).

:::interview
What's really being tested: that you can draw the observe-think-act-observe cycle and name the three control points — tools, context, and termination.
:::
