## Issue-to-PR: SWE-bench and evaluation

- How do you *know* a coding agent (Flagship 13) is any good? **SWE-bench** is the standard benchmark: real GitHub issues from real repos, where the agent must produce a patch that makes the repo's *own hidden tests* pass. It's hard because it's real — navigate an unfamiliar codebase, not a toy.

<svg viewBox="0 0 360 74" role="img" aria-label="SWE-bench: a real issue and repo go to the agent, which produces a patch, scored by whether the hidden tests pass" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="28" width="66" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="43" y="39" text-anchor="middle" font-size="5.5">real issue + repo</text>
  <rect x="94" y="28" width="56" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="122" y="39" text-anchor="middle" font-size="6">agent</text>
  <rect x="168" y="28" width="56" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="196" y="39" text-anchor="middle" font-size="6">patch</text>
  <rect x="242" y="28" width="70" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="277" y="36" text-anchor="middle" font-size="5.5">hidden tests</text><text x="277" y="43" text-anchor="middle" font-size="5" fill="#6b6b6b">pass = resolved</text>
  <path d="M76 37 L92 37 M150 37 L166 37 M224 37 L240 37" stroke="#888" marker-end="url(#sb)"/>
  <defs><marker id="sb" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Execution-based scoring** (19-71) is why SWE-bench is trusted: success is defined by the repo's *own* tests passing, not by string-matching a reference patch — so there's no gaming it with plausible-looking code. **SWE-bench Verified** is a human-validated subset (solvable, well-specified issues) used for cleaner comparison.
- **Read the number critically** (17-23a). "Solves X% of SWE-bench" depends heavily on the *harness* — retrieval, the agent scaffold, retries, compute budget — not just the model. A strong scaffold (Flagship 4's tool registry, verification gates, context management) lifts a given model's score substantially, which is *the point*: the harness is where much of the capability lives.

:::interview
"How do you evaluate a bug-fixing agent, and what does a SWE-bench score really tell you?"

Evaluate with **execution-based scoring**: give it real issues in real repos and check whether its patch makes the repo's own hidden tests pass — that's SWE-bench, and it's trusted precisely because success is defined by tests, not by matching a reference (unfoolable by plausible code). Use **SWE-bench Verified** (human-validated, solvable issues) for cleaner comparison. But read the number critically: the score reflects the *whole harness* — retrieval, scaffold, retries, budget — as much as the base model, so a better harness lifts the same model's score. That's the real lesson: on agentic tasks, capability is model *plus* harness, so the benchmark measures your engineering, not just your model choice.
:::
