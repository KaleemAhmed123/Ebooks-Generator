## Runtime feedback and verification gates

- An agent that cannot check its work is flying blind — it *believes* it succeeded and moves on, compounding any error (14-125). **Verification gates** give it ground truth: a check the agent must pass before a step counts as done.

<svg viewBox="0 0 360 82" role="img" aria-label="An agent's output passes through a verification gate that either accepts it or returns feedback to retry" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="30" width="66" height="24" rx="3" fill="#24405e"/><text x="43" y="45" text-anchor="middle" fill="#fff" font-size="6">agent step</text>
  <rect x="110" y="26" width="80" height="32" rx="4" fill="#a03050"/><text x="150" y="40" text-anchor="middle" fill="#fff" font-size="6">verify (tests,</text><text x="150" y="51" text-anchor="middle" fill="#fc8" font-size="6">schema, check)</text>
  <rect x="224" y="16" width="70" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="259" y="28" text-anchor="middle" font-size="6">pass → next</text>
  <rect x="224" y="42" width="126" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="287" y="54" text-anchor="middle" font-size="6">fail → feedback → retry</text>
  <path d="M76 42 L108 42" stroke="#888" marker-end="url(#vg)"/><path d="M190 38 L222 26" stroke="#888" marker-end="url(#vg)"/><path d="M190 42 L222 50" stroke="#888" marker-end="url(#vg)"/>
  <defs><marker id="vg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **A verification gate runs a real check** — tests, a schema validator, a linter, a type-checker, a rule, or an LLM-judge (14-118) — and only lets the agent proceed if it passes. On failure it returns the *specific* error as feedback, so the agent fixes the actual problem (the evaluator-optimizer loop, 14-40, with a grounded evaluator).
- **The best gates are objective.** "Run the tests" beats "ask the model if it's good," because tests are ground truth and the model shares its own blind spots (14-13). Wherever you can turn "is this right?" into a runnable check, do — it is worth more than any amount of self-critique.
- **Gates fight error compounding at its source:** they catch a wrong step *immediately*, before it corrupts the next ten steps (14-125). An agent with tight verification gates has high per-step reliability, which is the only thing that makes long tasks survivable.

:::note
Verification gates are the single highest-leverage reliability tool in the workbench. The reason coding agents work well (SWE-bench, 14-120) is that code has a *perfect* verification gate — the tests either pass or they do not. For domains without such a clean signal, your engineering effort should go into *manufacturing* one: a validator, a rubric, a checkable subgoal. An agent is only as reliable as its ability to know it was wrong — give it that, and it self-corrects; deny it that, and it confidently compounds errors.
:::
