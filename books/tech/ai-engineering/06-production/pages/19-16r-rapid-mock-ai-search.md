## Rapid mock: AI answer engine

- **Prompt:** "Build an AI search/answer engine (Perplexity-style) — answer questions with cited web sources." **Clarify:** live web (not a fixed corpus), answers must cite real sources, low latency (search feel), high volume, freshness matters.
- The twist versus enterprise RAG (19-05): the corpus is **the live web**, so retrieval is *search + fetch + read* in real time, and citation integrity is the product.

<svg viewBox="0 0 360 66" role="img" aria-label="AI answer engine: query, web search, fetch and read pages, synthesize with citations, verify citations" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6" fill="#1a1a1a">
  <rect x="6" y="24" width="40" height="16" rx="2" fill="#f4f4f4" stroke="#888"/><text x="26" y="35" text-anchor="middle">query</text>
  <rect x="52" y="24" width="52" height="16" rx="2" fill="#e8f4fd" stroke="#24405e"/><text x="78" y="35" text-anchor="middle" font-size="5.5">web search</text>
  <rect x="110" y="24" width="60" height="16" rx="2" fill="#eef3ee" stroke="#3b7a57"/><text x="140" y="35" text-anchor="middle" font-size="5.5">fetch + read</text>
  <rect x="176" y="24" width="70" height="16" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="211" y="35" text-anchor="middle" font-size="5.5">synthesize + cite</text>
  <rect x="252" y="24" width="70" height="16" rx="2" fill="#fdeef2" stroke="#a03050"/><text x="287" y="35" text-anchor="middle" font-size="5.5">verify citations</text>
  <path d="M46 32 L50 32 M104 32 L108 32 M170 32 L174 32 M246 32 L250 32" stroke="#888" marker-end="url(#as3)"/>
  <defs><marker id="as3" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **Live retrieval, not a static index.** Query → search API (or your own crawl/index) → **fetch and read** the top pages in real time → synthesize an answer that **cites** the specific sources → verify each citation actually supports its claim (faithfulness, 19-35). Aggressive **caching** of popular queries and fetched pages (17-42) keeps latency and cost down.
- **Citation integrity is the product and the trust.** An answer engine that cites a source which doesn't support the claim is worse than useless — so the faithfulness/groundedness check (19-06) is mandatory, and every claim links to the passage that backs it. This is what separates an answer engine from a chatbot that makes things up with fake links.

:::interview
"How is an AI answer engine different from enterprise RAG?"

The corpus is the *live web*, not a fixed index, so retrieval is **search + fetch + read in real time** rather than a vector lookup over pre-embedded docs — with heavy caching of popular queries and fetched pages to hold latency and cost. And **citation integrity is the product**: every claim must link to a source passage that actually supports it, verified by a faithfulness check, because an answer engine's entire value is *trustworthy, sourced* answers — a fabricated citation destroys it. So versus enterprise RAG: live retrieval instead of a static index, freshness as a first-class concern, and citation verification as non-negotiable rather than nice-to-have. Same RAG bones, but the web-scale live retrieval and citation-integrity requirements reshape it.
:::
