## How AI system design differs

- The reason AI system design is its own interview is that five things break assumptions classic system design takes for granted. Name these explicitly and you signal you understand the domain, not just distributed systems.

<svg viewBox="0 0 360 112" role="img" aria-label="Five ways AI system design differs: nondeterminism, token economics, eval, hallucination, GPU scarcity" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g text-anchor="middle" font-size="6.5">
   <rect x="12" y="16" width="102" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="63" y="28">nondeterminism</text><text x="63" y="38" font-size="5.5" fill="#6b6b6b">same input, diff output</text>
   <rect x="126" y="16" width="102" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="177" y="28">token economics</text><text x="177" y="38" font-size="5.5" fill="#6b6b6b">cost ∝ tokens, linear</text>
   <rect x="240" y="16" width="108" height="26" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="294" y="28">eval is hard</text><text x="294" y="38" font-size="5.5" fill="#6b6b6b">no ground-truth ==</text>
   <rect x="70" y="52" width="102" height="26" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="121" y="64">hallucination</text><text x="121" y="74" font-size="5.5" fill="#6b6b6b">confidently wrong</text>
   <rect x="188" y="52" width="102" height="26" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="239" y="64">GPU scarcity</text><text x="239" y="74" font-size="5.5" fill="#6b6b6b">capacity is memory</text>
  </g>
  <text x="180" y="98" text-anchor="middle" font-size="6" fill="#1a1a1a">each one changes the architecture — you must design *for* it, not around it</text>
</svg>

- **Nondeterminism** — the same prompt gives different outputs, so you cannot cache-by-equality naively, test with exact assertions, or debug from one repro. You design with rates, sampled evals, and version pinning.
- **Token economics** — cost scales *linearly and unboundedly* with usage, unlike a fixed server. A runaway loop or a viral feature is a financial incident. Budgets and routing are architecture, not afterthoughts.
- **Eval is hard** — there is rarely a single correct answer to diff against, so "does it work?" needs LLM-as-judge, rubrics, and human review (step 6). Correctness is a measured distribution.
- **Hallucination** — the model is confidently wrong sometimes, always. RAG grounding, citations, and guardrails exist to bound this; you design assuming it *will* happen.
- **GPU scarcity** — capacity is bounded by GPU memory (KV cache), not CPU, and GPUs are expensive and supply-constrained. Serving economics dominate the scale plan.

:::interview
**"How is designing an LLM system different from designing, say, a URL shortener?"** Five ways: output is **nondeterministic** (so eval, versioning, and rate-based alerting replace exact tests); cost is **token-linear and unbounded** (so budgets and routing are first-class); **eval has no ground-truth equality** (so LLM-judge + human review); the system **hallucinates** (so grounding and guardrails are load-bearing); and capacity is **GPU-memory-bound** (so the KV cache, not CPU, sets scale). A classic design ignores all five; naming them up front is the domain signal.
:::
