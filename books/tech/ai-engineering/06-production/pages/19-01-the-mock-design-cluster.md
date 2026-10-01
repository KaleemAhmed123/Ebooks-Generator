# Capstones & System Design

## The mock-design cluster

- This module is where the whole series pays out: you *design* and *build* real AI systems. It has three parts. **19A** (here) walks worked AI-system-design interviews end to end. **19B** builds fifteen flagship projects deep, with runnable code. **19C** catalogs the rest so nothing is dropped.
- Each mock design runs the Module-17 framework (page 17-58) against a real prompt, out loud, with numbers.

<svg viewBox="0 0 360 82" role="img" aria-label="Each mock follows the nine-step framework: requirements, API, data, serving, scale, eval, cost, failure, tradeoffs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g text-anchor="middle">
   <rect x="10" y="16" width="52" height="16" rx="2" fill="#24405e"/><text x="36" y="27" fill="#fff">requirements</text>
   <rect x="66" y="16" width="40" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="86" y="27">API</text>
   <rect x="110" y="16" width="46" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="133" y="27">data/RAG</text>
   <rect x="160" y="16" width="56" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="188" y="27">serving/scale</text>
   <rect x="220" y="16" width="34" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="237" y="27">eval</text>
   <rect x="258" y="16" width="34" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="275" y="27">cost</text>
   <rect x="296" y="16" width="54" height="16" rx="2" fill="#24405e"/><text x="323" y="27" fill="#fff">fail/tradeoff</text>
  </g>
  <text x="180" y="52" text-anchor="middle" font-size="7">every mock: clarify → estimate → design → justify → stress-test</text>
  <text x="180" y="68" text-anchor="middle" font-size="6.5" fill="#6b6b6b">calibrated to the big-tech senior/staff bar — real QPS, GPU counts, $/1M tokens</text>
</svg>

- **How to use them.** Do not memorise the diagrams — memorise the *moves*: what to clarify first, which number binds the design, where eval and cost and failure modes live, what tradeoff the interviewer will probe. The prompts change; the moves do not.
- **The seven mocks** are chosen to span the space: high-scale serving (ChatGPT), retrieval (RAG), multi-tenancy (API platform), autonomy (agent platform), latency-critical (voice), a specialised agent (code review), and the meta-system (observability + eval). Between them they reuse every building block from 17-62.

:::note
These mocks are the proof of Module 17: if that module taught you the framework and the building blocks, this cluster shows the framework *executed* under interview conditions. Read each one as a transcript of the answer you want to give — clarifying questions first, capacity math on the whiteboard, eval and cost never skipped, and a defended tradeoff at the end. The `:::interview` block on each closes with the single sentence that most signals seniority on that specific problem.
:::
