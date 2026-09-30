## The framework

- Run every AI-system-design question through the same nine steps, in order. The order is the skill: it stops you architecting before you know the requirements, and it guarantees you cover eval, cost, and failure — the parts candidates forget.

<svg viewBox="0 0 360 124" role="img" aria-label="Nine-step framework from requirements through API, data, model/serving, scale, eval, cost, to failure modes and tradeoffs" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <g text-anchor="middle" font-size="6">
   <rect x="12" y="14" width="70" height="20" rx="3" fill="#24405e"/><text x="47" y="26" fill="#fff">1 requirements</text>
   <rect x="92" y="14" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="127" y="26">2 API contract</text>
   <rect x="172" y="14" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="207" y="26">3 data / RAG</text>
   <rect x="252" y="14" width="96" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="300" y="26">4 model / serving</text>
   <rect x="12" y="52" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="47" y="64">5 scale</text>
   <rect x="92" y="52" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="127" y="64">6 eval</text>
   <rect x="172" y="52" width="70" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="207" y="64">7 cost</text>
   <rect x="252" y="52" width="96" height="20" rx="3" fill="#24405e"/><text x="300" y="64" fill="#fff">8 failure modes</text>
  </g>
  <rect x="92" y="90" width="176" height="20" rx="3" fill="#24405e"/><text x="180" y="102" text-anchor="middle" font-size="6.5" fill="#fff">9 tradeoffs the interviewer probes</text>
  <path d="M180 34 L180 50" stroke="#888"/><path d="M180 72 L180 88" stroke="#888"/>
</svg>

1. **Requirements** — functional (what it does) + non-functional (scale, latency SLO, cost, compliance). Clarify before anything.
2. **API contract** — the request/response shape; sync vs streaming vs async.
3. **Data / RAG** — where knowledge comes from; ingestion, chunking, retrieval.
4. **Model / serving** — which model, managed vs self-host, which engine, quantisation.
5. **Scale** — capacity math: QPS → tokens/s → GPU count → cost.
6. **Eval** — how you know it works and stays working (offline + in-production).
7. **Cost** — the per-1M-token estimate and the levers.
8. **Failure modes** — hallucination, injection, provider outage, overload.
9. **Tradeoffs** — the deliberate choices, defended against alternatives.

:::note
Steps 1, 5, 6, 7, 8 are where AI system design *differs* from classic system design, and where most points live. A candidate who nails a beautiful step-4 architecture but hand-waves eval (6), cost (7), and failure (8) caps out at mid-level. The framework's job is to force you through all nine even when the clock is pressuring you to just draw boxes.
:::
