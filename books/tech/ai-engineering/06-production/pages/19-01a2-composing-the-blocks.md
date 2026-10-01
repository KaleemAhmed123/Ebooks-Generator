## Composing the building blocks

- The reference table (previous page) lists the parts; this is how you *wire* them. The skill is letting each requirement *name* the blocks it forces, then arranging them — you are composing, not inventing.

<svg viewBox="0 0 360 96" role="img" aria-label="Requirements map to blocks: knowledge needs retriever plus vector DB plus embeddings; memory needs a session store; actions need tools plus safety gate plus queue; scale needs serving plus cache plus gateway" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g font-size="6">
   <rect x="10" y="12" width="96" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="14" y="22">"answers from docs"</text>
   <rect x="120" y="12" width="230" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="124" y="22">→ retriever + vector DB + embedding service</text>
   <rect x="10" y="32" width="96" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="14" y="42">"multi-turn"</text>
   <rect x="120" y="32" width="230" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="124" y="42">→ memory / session store</text>
   <rect x="10" y="52" width="96" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="14" y="62">"takes actions"</text>
   <rect x="120" y="52" width="230" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="124" y="62">→ tool layer + safety gate + queue</text>
   <rect x="10" y="72" width="96" height="14" rx="2" fill="#f4f4f4" stroke="#888"/><text x="14" y="82">"at scale"</text>
   <rect x="120" y="72" width="230" height="14" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="124" y="82">→ serving fleet + cache + gateway</text>
  </g>
</svg>

- **Requirements name the blocks.** "Answers from private docs" pulls in the retriever, vector DB, and embedding service. "Multi-turn" pulls in the session store. "Takes actions" pulls in the tool layer, safety gate, and queue. "At scale" pulls in the serving fleet, cache, and gateway. You are not choosing blocks freely — the requirements *select* them, and your job is to recognise which.
- **Four blocks are always present**, whatever the system: the **gateway** (the control plane), the **serving engine** (the model itself), the **eval loop** (so you know it works and stays working), and **observability** (so you can see it). Everything else is added only when a requirement demands it — and the discipline is *not* adding a block no requirement asked for, which is as much a signal as adding the right ones.

:::note
This composition method is what makes the whole system-design cluster fast: memorize the blocks (previous page), learn which requirement pulls in which, and every design becomes a short mapping from requirements to a wired-up spine — leaving your time for the interesting parts (the capacity math, the failure modes, the defended tradeoffs). A candidate who composes from known blocks finishes the architecture in minutes and spends the rest on depth; one who invents components from scratch each time runs out of clock. Fluency with the blocks *is* the framework's speed.
:::
