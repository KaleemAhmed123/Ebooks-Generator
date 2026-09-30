## CrewAI Flows

- Crews are great for autonomous collaboration but weak on *precise control*. CrewAI answered with **Flows** — an event-driven layer for deterministic, structured orchestration that can *contain* crews. It is CrewAI's move toward the control end of the spectrum. **[VERIFY current API]**

<svg viewBox="0 0 360 92" role="img" aria-label="A Flow orchestrates deterministic steps, some of which invoke autonomous crews" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="34" width="60" height="24" rx="3" fill="#24405e"/><text x="44" y="49" text-anchor="middle" fill="#fff" font-size="6">step: fetch</text>
  <rect x="98" y="34" width="70" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="133" y="46" text-anchor="middle" font-size="6">crew: research</text><text x="133" y="55" text-anchor="middle" font-size="5" fill="#6b6b6b">(autonomous)</text>
  <rect x="192" y="34" width="60" height="24" rx="3" fill="#24405e"/><text x="222" y="49" text-anchor="middle" fill="#fff" font-size="6">step: route</text>
  <rect x="276" y="34" width="70" height="24" rx="3" fill="#24405e"/><text x="311" y="49" text-anchor="middle" fill="#fff" font-size="6">step: publish</text>
  <path d="M74 46 L96 46" stroke="#888" marker-end="url(#fl2)"/><path d="M168 46 L190 46" stroke="#888" marker-end="url(#fl2)"/><path d="M252 46 L274 46" stroke="#888" marker-end="url(#fl2)"/>
  <defs><marker id="fl2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **What Flows add:** deterministic, event-driven steps — you decorate Python functions to define a pipeline with explicit control (conditional branches, state passed between steps, `@start`/`@listen`-style event wiring). Some steps are plain code; others **kick off a crew** for the parts that benefit from autonomous collaboration.
- **Why it exists:** pure crews are hard to make reliable and precise (next page). Flows let you keep the crew's autonomy *where it helps* and wrap it in deterministic control *everywhere else* — the exact workflow-with-agency principle (14-41). It is CrewAI acknowledging that most production systems are mostly structured with pockets of autonomy.
- Conceptually, Flows is CrewAI's answer to LangGraph's graph: explicit, stateful orchestration — reached for when crews alone are too loose.

:::note
Watch the pattern across all these frameworks: each starts at one end of the control-vs-convenience spectrum and grows toward the other. LangGraph adds `create_react_agent` (convenience) over its graph (control); CrewAI adds Flows (control) over crews (convenience); AutoGen has Core (control) under AgentChat (convenience). They are converging on the same truth — real systems need *both* deterministic control and autonomous flexibility — and offering both, from different starting points.
:::
