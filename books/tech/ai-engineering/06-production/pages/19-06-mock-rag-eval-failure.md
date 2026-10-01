## Mock: production RAG — eval, failure, tradeoffs

- **Eval is two-stage, because RAG has two failure surfaces.** *Retrieval* eval: precision/recall — did the right documents come back? (measured on a labelled query→doc set). *Generation* eval: **faithfulness/groundedness** — is the answer supported by what was retrieved, with correct citations? A RAG system can fail at either stage, and the fix differs, so you must measure both separately.

<svg viewBox="0 0 340 74" role="img" aria-label="Two RAG failure surfaces: retrieval miss (right doc not fetched) and generation error (answer not grounded in fetched docs)" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="14" y="20" width="150" height="40" rx="4" fill="#fdeef2" stroke="#a03050"/><text x="89" y="34" text-anchor="middle" font-size="6.5" fill="#a03050">retrieval miss</text><text x="89" y="48" text-anchor="middle" font-size="5.5">right doc not fetched →</text><text x="89" y="56" text-anchor="middle" font-size="5.5">fix: chunking, hybrid, rerank</text>
  <rect x="176" y="20" width="150" height="40" rx="4" fill="#f3ede8" stroke="#8a6d3b"/><text x="251" y="34" text-anchor="middle" font-size="6.5" fill="#8a6d3b">generation error</text><text x="251" y="48" text-anchor="middle" font-size="5.5">doc fetched, answer wrong →</text><text x="251" y="56" text-anchor="middle" font-size="5.5">fix: prompt, groundedness gate</text>
</svg>

- **Failure modes.** *Stale index* (doc changed, index didn't) → freshness SLA on ingestion. *No relevant docs* → the system must say "I don't know," never fabricate (the chaos test from 17-52). *Retrieval returns wrong-but-plausible* → rerank + groundedness check. *Injection in a retrieved doc* → treat retrieved text as untrusted (Module 18), least-privilege downstream.
- **Tradeoffs probed.** *RAG vs fine-tuning* — RAG here, because knowledge changes daily and citations are required; fine-tuning would be stale and uncitable. *Retrieve more vs less* — more chunks raise recall but add latency, cost, and distraction; tune k against the faithfulness eval. *Chunk size* — larger keeps context, smaller sharpens retrieval; measured, not guessed.

:::interview
"Your RAG assistant gave a wrong answer. How do you debug it?"

Localise which stage failed, because the fix is different: check whether the **right document was retrieved** (if not, it's a retrieval problem → chunking, hybrid search, reranking) or whether it was retrieved **but the model answered wrong anyway** (a generation/grounding problem → prompt, groundedness gate, maybe a stronger model). Most "RAG quality" problems are retrieval problems masquerading as model problems, so I instrument both stages and never upgrade the model before confirming retrieval actually surfaced the answer. Diagnosing stage-by-stage rather than reaching for a bigger model is the signal.
:::
