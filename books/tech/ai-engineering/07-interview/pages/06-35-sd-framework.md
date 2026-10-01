## How do you approach an AI system design interview?

- Same backbone as classic system design, with AI-specific layers. Drive it in steps:
  1. **Requirements** — functional (what it does) and non-functional (**latency, scale/QPS, quality bar, cost, privacy**). Pin numbers; ask, don't assume.
  2. **Define "good"** — how will quality be measured and what's the SLO? For AI this is half the problem, so raise it early.
  3. **High-level design** — data flow end to end (ingest → index/model → serve), and the API contract.
  4. **The AI core** — model choice (managed vs self-host, size), prompting/RAG/fine-tune/agent decision, retrieval design, guardrails.
  5. **Scale & serving** — capacity math (GPUs, KV cache), batching, caching, autoscaling, cost.
  6. **Evaluation & monitoring** — offline evals, online tracing, quality/drift monitoring, rollout strategy.
  7. **Failure & safety** — fallbacks, injection/abuse, PII, human-in-the-loop.
  8. **Tradeoffs** — state the latency/cost/quality balance you chose and why.
- Lead with requirements and evaluation; those two separate senior candidates from juniors.

<svg viewBox="0 0 280 40" role="img" aria-label="Flow: requirements, quality definition, high-level design, AI core, scale, eval and monitoring, safety, tradeoffs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g text-anchor="middle">
  <rect x="4" y="14" width="40" height="14" rx="2" fill="#24405e"/><text x="24" y="23" fill="#fff">reqs</text>
  <rect x="50" y="14" width="40" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="70" y="23">quality</text>
  <rect x="96" y="14" width="44" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="118" y="23">AI core</text>
  <rect x="146" y="14" width="40" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="166" y="23">scale</text>
  <rect x="192" y="14" width="44" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="214" y="23">eval/mon</text>
  <rect x="242" y="14" width="34" height="14" rx="2" fill="#1a3a2a"/><text x="259" y="23" fill="#fff">trade</text>
  </g>
</svg>

:::interview
What's really being tested: a structured method that front-loads requirements and *evaluation* (the AI-specific half) before diving into the model — the clearest senior signal.
:::
