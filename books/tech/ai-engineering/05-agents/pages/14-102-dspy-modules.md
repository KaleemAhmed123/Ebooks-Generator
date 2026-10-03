## DSPy: modules

- A **module** is a reusable strategy for *running* a signature — the reasoning approach applied to it. Swapping modules changes *how* the step thinks, without touching the signature. DSPy ships modules for the reasoning patterns you already know.

<svg viewBox="0 0 360 84" role="img" aria-label="The same signature run through Predict, ChainOfThought, or ReAct modules" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="130" y="10" width="100" height="20" rx="3" fill="#24405e"/><text x="180" y="23" text-anchor="middle" fill="#fff" font-size="6">signature: q → a</text>
  <rect x="14" y="50" width="100" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="64" y="62" text-anchor="middle" font-size="6">Predict</text><text x="64" y="71" text-anchor="middle" font-size="5" fill="#6b6b6b">direct</text>
  <rect x="130" y="50" width="100" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="180" y="62" text-anchor="middle" font-size="6">ChainOfThought</text><text x="180" y="71" text-anchor="middle" font-size="5" fill="#6b6b6b">reason first</text>
  <rect x="246" y="50" width="100" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="296" y="62" text-anchor="middle" font-size="6">ReAct</text><text x="296" y="71" text-anchor="middle" font-size="5" fill="#6b6b6b">tools + loop</text>
  <path d="M160 30 L70 48" stroke="#888" marker-end="url(#dm)"/><path d="M180 30 L180 48" stroke="#888" marker-end="url(#dm)"/><path d="M200 30 L292 48" stroke="#888" marker-end="url(#dm)"/>
  <defs><marker id="dm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **`dspy.Predict`** — run the signature directly (one call, no extra reasoning).
- **`dspy.ChainOfThought`** — make the model reason step-by-step before answering (Booklet 4's CoT), applied to *any* signature by wrapping it. Same signature, more reasoning.
- **`dspy.ReAct`** — run the signature as a tool-using agent loop (14-08). DSPy has ReAct as a *module* — you give it a signature and tools, and it does reason-act-observe, with the prompts compiled and optimized.
- **Composing modules** builds pipelines: a custom module's `forward` method calls other modules in sequence (retrieve, then reason, then answer), just like composing functions. This is how a whole multi-step agent becomes one optimizable DSPy program.

- **The power:** because modules and signatures are separate, you can swap `Predict` for `ChainOfThought` (or ReAct) to change reasoning strategy with a one-line change — and the compiler re-optimizes for the new strategy.

:::interview
"How does DSPy separate what a step does from how it reasons?"

Signatures declare *what* (inputs → outputs); modules define *how* (the reasoning strategy). The same signature can run through `Predict` (direct), `ChainOfThought` (reason first), or `ReAct` (tool-using loop) — you swap the module without rewriting the task. Modules compose into pipelines (a module's `forward` calls other modules), so a whole agent is one program. DSPy then compiles and optimizes the prompts for whatever module strategy you chose — changing strategy is a one-liner, not a prompt rewrite.
:::
