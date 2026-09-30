## CrewAI: failure modes

- CrewAI's approachability hides real limits that surface as you push past a demo.

<svg viewBox="0 0 360 86" role="img" aria-label="CrewAI failure modes: vague roles, hidden control, cost, and reliability gaps" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">vague roles → drift</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">hidden control</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">cost multiplies</text>
  <rect x="68" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="122" y="63" text-anchor="middle">weak error handling</text>
  <rect x="184" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="238" y="63" text-anchor="middle">non-determinism</text>
</svg>

- **Vague roles cause drift.** Thin role/goal/backstory prompts produce agents that wander, overlap, or misread their job. The fix is the same craft as any prompt — specific roles, sharp goals, precise `expected_output` — which undercuts the "just describe a team" simplicity.
- **Hidden control.** The convenience abstraction means less visibility into *why* the crew did something. When it misbehaves, there is less to grab onto than an explicit graph. Debugging emergent crew behavior is genuinely hard.
- **Cost multiplies.** Multiple agents, each making model calls over shared context, add up fast — the same multi-agent cost blowup as AutoGen (14-66).
- **Reliability gaps.** Historically lighter on production-grade error handling, retries, and persistence than LangGraph — part of why Flows was added. For robust production flows you must engineer around the gaps.

:::warn
The trap with CrewAI is mistaking "easy to start" for "easy to ship." A crew that produces a great demo can be brittle in production — non-deterministic, hard to debug, costly, and thin on error handling. It is an excellent prototyping and low-complexity-multi-agent tool; for high-reliability production, either move the critical control into Flows or reach for a more control-oriented framework. Judge a framework by its worst day in production, not its best demo.
:::
