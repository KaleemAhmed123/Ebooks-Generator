## OpenAI SDK: guardrails

- **Guardrails** are validation checks that run alongside the agent and can **halt** it if something is wrong — an off-topic request, unsafe input, or malformed output. They are the SDK's built-in safety and validation layer.

<svg viewBox="0 0 360 92" role="img" aria-label="Input guardrail checks the request before the agent; output guardrail checks the result before returning" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="34" width="50" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="33" y="49" text-anchor="middle" font-size="6">input</text>
  <rect x="70" y="30" width="56" height="32" rx="3" fill="#a03050"/><text x="98" y="44" text-anchor="middle" fill="#fff" font-size="6">input</text><text x="98" y="54" text-anchor="middle" fill="#fc8" font-size="5.5">guardrail</text>
  <rect x="140" y="32" width="60" height="28" rx="4" fill="#24405e"/><text x="170" y="50" text-anchor="middle" fill="#fff" font-size="6.5">agent</text>
  <rect x="214" y="30" width="56" height="32" rx="3" fill="#a03050"/><text x="242" y="44" text-anchor="middle" fill="#fff" font-size="6">output</text><text x="242" y="54" text-anchor="middle" fill="#fc8" font-size="5.5">guardrail</text>
  <rect x="284" y="34" width="66" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="317" y="49" text-anchor="middle" font-size="6">result</text>
  <path d="M58 46 L68 46" stroke="#888" marker-end="url(#gr)"/><path d="M126 46 L138 46" stroke="#888" marker-end="url(#gr)"/><path d="M200 46 L212 46" stroke="#888" marker-end="url(#gr)"/><path d="M270 46 L282 46" stroke="#888" marker-end="url(#gr)"/>
  <defs><marker id="gr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Input guardrails** run *before* the agent, on the user's request — reject off-topic, unsafe, or out-of-scope inputs early, before wasting a model call. Example: a support agent's input guardrail blocks prompt-injection attempts or requests to do something out of policy.
- **Output guardrails** run *after* the agent, on its result — validate it meets requirements (no leaked secrets, correct format, on-brand) before returning to the user. If it fails, the run halts or retries.
- **A guardrail is often itself a small model call or a rule** — a cheap classifier ("is this on-topic?") that runs in parallel and *tripwires* the expensive agent. Because guardrails can run concurrently, they add safety with little added latency.
- This is layered defense (previewed for prompt injection, 14-88) as a first-class SDK feature — you declare the checks and the framework enforces them around every run.

:::interview
"How do guardrails work in the OpenAI Agents SDK?"

They're validation checks the framework runs around the agent. Input guardrails vet the request before the agent runs — rejecting off-topic, unsafe, or injection-y input early. Output guardrails vet the result before it returns — enforcing format, policy, or no-secret-leak rules. A guardrail can be a rule or a cheap classifier model, and failing one halts (or retries) the run. It's built-in layered defense: cheap tripwires around an expensive agent, so bad inputs and outputs are caught without you wiring the checks manually.
:::
