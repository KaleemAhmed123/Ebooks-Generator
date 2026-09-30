## LlamaIndex: failure modes

- LlamaIndex's failures are mostly *retrieval* failures — which is fitting, since retrieval is its heart — plus the general agent risks.

<svg viewBox="0 0 360 84" role="img" aria-label="LlamaIndex failure modes: bad chunking, wrong source, stale index, and over-retrieval" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="64" y="31" text-anchor="middle">bad chunking</text>
  <rect x="126" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="180" y="31" text-anchor="middle">wrong source picked</text>
  <rect x="242" y="16" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="296" y="31" text-anchor="middle">stale index</text>
  <rect x="68" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="122" y="63" text-anchor="middle">over-retrieval bloat</text>
  <rect x="184" y="48" width="108" height="24" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="238" y="63" text-anchor="middle">abstraction depth</text>
</svg>

- **Bad chunking.** If documents are split badly (mid-sentence, mixing topics), retrieval returns fragments and answers degrade. The fix is upstream — chunk on structure (Booklet 4), not blind character counts. No agent cleverness compensates for bad chunks.
- **Wrong source picked.** With several `QueryEngineTool`s, a vague description leads the agent to query the wrong index (13-13). Sharp, non-overlapping tool descriptions are the fix.
- **Stale index.** The index is a snapshot; if the source data changed and you did not re-index, the agent confidently answers from old data (the stale-memory problem, 14-33). You need a re-indexing strategy.
- **Over-retrieval bloat.** Retrieving too many chunks floods the context, raises cost, and buries the answer (14-06). Tune top-k and re-rank.
- **Abstraction depth.** LlamaIndex has many layers and options; the convenience can hide what retrieval is actually doing, making failures hard to diagnose. Inspect the retrieved chunks when debugging.

:::warn
The number-one LlamaIndex production failure is trusting a confident answer built on bad retrieval. If the retrieved chunks are wrong, incomplete, or stale, the LLM will still produce a fluent, wrong answer (RAG's core failure, Booklet 4). Always be able to see *what was retrieved* for an answer, evaluate retrieval quality separately from generation, and treat chunking, re-indexing, and re-ranking as first-class — the answer is only as good as the chunks feeding it.
:::
