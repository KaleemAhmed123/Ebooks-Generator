## The reusable building blocks

- Almost every AI system is assembled from the same dozen parts. Know them cold and you can compose any design fast, spending your interview time on the *tradeoffs* between them, not on inventing components.

<svg viewBox="0 0 360 116" role="img" aria-label="Standard building blocks: client, gateway, cache, queue, retriever with embedding store and vector DB, serving engine, eval loop, observability" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <rect x="10" y="48" width="40" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="30" y="60" text-anchor="middle">client</text>
  <rect x="62" y="48" width="46" height="18" rx="3" fill="#24405e"/><text x="85" y="60" text-anchor="middle" fill="#fff">gateway</text>
  <rect x="62" y="20" width="46" height="16" rx="3" fill="#eef3ee" stroke="#3b7a57"/><text x="85" y="31" text-anchor="middle">cache</text>
  <rect x="120" y="48" width="44" height="18" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="142" y="60" text-anchor="middle">retriever</text>
  <rect x="120" y="76" width="44" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="142" y="87" text-anchor="middle">vector DB</text>
  <rect x="120" y="96" width="44" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="142" y="107" text-anchor="middle">embed store</text>
  <rect x="176" y="48" width="46" height="18" rx="3" fill="#f4f4f4" stroke="#888"/><text x="199" y="60" text-anchor="middle">queue</text>
  <rect x="234" y="44" width="54" height="26" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="261" y="56" text-anchor="middle">serving</text><text x="261" y="65" text-anchor="middle" font-size="5.5">vLLM/API</text>
  <rect x="300" y="20" width="52" height="16" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="326" y="31" text-anchor="middle">eval loop</text>
  <rect x="300" y="76" width="52" height="16" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="326" y="87" text-anchor="middle">observability</text>
  <path d="M50 57 L60 57" stroke="#888" marker-end="url(#bb)"/><path d="M108 57 L118 57" stroke="#888" marker-end="url(#bb)"/><path d="M164 57 L174 57" stroke="#888" marker-end="url(#bb)"/><path d="M222 57 L232 57" stroke="#888" marker-end="url(#bb)"/>
  <defs><marker id="bb" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Front:** client → **gateway** (auth, routing, budgets, guardrails, tracing — 17-47), with a **cache** (prompt + semantic, 17-41/42) it checks first.
- **Knowledge:** a **retriever** over an **embedding store** and a **vector DB** (ANN index) — the RAG spine from Booklet 4, deepened in Module 19.
- **Compute:** a **queue** for async/agent work, feeding a **serving engine** (managed API or vLLM/SGLang/TensorRT-LLM).
- **Assurance:** an **eval loop** (offline + sampled-in-production) and **observability** (traces, cost, quality, safety) wrapping everything.

- **The skill is composition.** "Chat with memory" = client + gateway + cache + serving + a session store. "Production RAG" adds retriever + vector DB + reranker + eval. "Autonomous agent" adds queue + tool sandbox + durable execution. You are not inventing — you are wiring known blocks and defending the wiring.

:::note
Interviewers reuse these blocks across every prompt, so fluency compounds: once you can draw the gateway/cache/retriever/serving/eval spine in ninety seconds, the whole session is spent on the interesting parts — which vector DB and why, where the eval loop closes, how the failure modes are contained. Memorise the spine so you can think about the tradeoffs.
:::
