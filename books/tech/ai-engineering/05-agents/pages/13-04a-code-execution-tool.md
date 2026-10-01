## Code execution as a tool

- The most powerful single tool you can give an agent is a **code interpreter** — the ability to write and run code. One tool covers a near-infinite space of tasks, because code can compute anything, transform any data, and call any library. **[VERIFY]**

<svg viewBox="0 0 360 84" role="img" aria-label="The model writes code, a sandbox runs it, and the real output returns for the model to use" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="12" y="32" width="72" height="24" rx="3" fill="#24405e"/><text x="48" y="47" text-anchor="middle" fill="#fff" font-size="6">writes code</text>
  <rect x="112" y="28" width="90" height="32" rx="4" fill="#a03050"/><text x="157" y="42" text-anchor="middle" fill="#fff" font-size="6">sandbox runs it</text><text x="157" y="52" text-anchor="middle" fill="#fc8" font-size="5.5">isolated</text>
  <rect x="232" y="32" width="72" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="268" y="44" text-anchor="middle" font-size="6">real output</text><text x="268" y="52" text-anchor="middle" font-size="5.5" fill="#6b6b6b">or error</text>
  <path d="M84 44 L110 44" stroke="#888" marker-end="url(#ce3)"/><path d="M202 44 L230 44" stroke="#888" marker-end="url(#ce3)"/><path d="M268 56 Q268 78 48 74 L48 58" stroke="#888" fill="none" marker-end="url(#ce3)"/>
  <defs><marker id="ce3" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **Why it is so powerful:** instead of exposing a dozen narrow tools (parse CSV, compute stats, make a chart), you expose *one* — "run this Python" — and the model writes whatever code the task needs. It handles data analysis, math (offloading the arithmetic models are bad at, 13-01), file transformation, and calling arbitrary libraries. It is the antidote to tool overload (13-15): one general tool over many specific ones.
- **The verifier bonus:** code either runs or throws. The error message is a *ground-truth* signal (14-135) the model reads and corrects against — the evaluator-optimizer loop (14-40) with the runtime as the evaluator (AutoGen's core strength, 14-63). This makes code-execution agents self-correcting in a way prose tools are not.
- **The non-negotiable: sandbox it.** Model-generated code is untrusted and can be destructive or exfiltrating (the lethal trifecta, 14-129). Run it in an isolated container/microVM with no production credentials and restricted network (13-49, 15-25). "Run arbitrary code" without a sandbox is a critical vulnerability, not a feature.

:::interview
"What's the highest-leverage tool to give an agent, and the catch?"

A code interpreter. One "run this code" tool covers a near-infinite task space — data analysis, math the model is bad at, file transforms, any library — replacing a dozen narrow tools and sidestepping tool overload. It's also self-correcting: code runs or errors, giving a ground-truth signal the model fixes against. The catch is security: model-generated code is untrusted and can delete data or exfiltrate secrets, so it *must* run in an isolated sandbox with no production credentials and restricted network. Unsandboxed code execution is a critical vulnerability, not a capability.
:::
