## Semantic caching

- Prompt caching reuses an *exact* prefix. **Semantic caching** goes further: if a new query *means the same thing* as one already answered, return the stored answer and skip the model entirely. It matches on **embedding similarity**, not string equality.
- The mechanism: embed the incoming query, search a vector store of past (query, answer) pairs, and if the nearest is within a similarity threshold, serve its cached answer.

<svg viewBox="0 0 360 92" role="img" aria-label="A query is embedded and matched against a cache; a close hit returns the stored answer, a miss goes to the model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="38" width="50" height="20" rx="3" fill="#f4f4f4" stroke="#888"/><text x="35" y="51" text-anchor="middle" font-size="6">query</text>
  <rect x="80" y="38" width="52" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="106" y="48" text-anchor="middle" font-size="5.5">embed +</text><text x="106" y="56" text-anchor="middle" font-size="5.5">search</text>
  <path d="M152 40 L188 22" stroke="#1a3a2a" marker-end="url(#sc)"/><text x="150" y="20" font-size="5.5" fill="#1a3a2a">sim ≥ 0.95</text>
  <rect x="192" y="14" width="64" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="224" y="26" text-anchor="middle" font-size="6">cached answer</text>
  <path d="M152 56 L188 74" stroke="#a03050" marker-end="url(#sc)"/><text x="150" y="78" font-size="5.5" fill="#a03050">miss</text>
  <rect x="192" y="64" width="64" height="18" rx="3" fill="#fdeef2" stroke="#a03050"/><text x="224" y="76" text-anchor="middle" font-size="6">call model</text>
  <text x="300" y="40" text-anchor="middle" font-size="5.5" fill="#6b6b6b">hit = 0 tokens,</text><text x="300" y="50" text-anchor="middle" font-size="5.5" fill="#6b6b6b">~ms latency</text>
  <defs><marker id="sc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **A hit costs no tokens and returns in milliseconds** — the biggest possible saving, because it skips inference entirely. On FAQ-style traffic (support bots, docs Q&A) where many users ask the same thing, hit rates can be high.
- **The risk is a wrong hit.** Set the threshold too loose and "how do I cancel?" returns the answer to "how do I upgrade?" — a confidently wrong reply. The threshold is a precision/coverage dial, and it must be tuned conservatively and monitored.

:::warn
Semantic caching is unsafe for anything **personalised, time-sensitive, or stateful.** "What's my account balance?" must never hit another user's cached answer; "what's the weather?" must not serve yesterday's. Scope the cache per user where identity matters, exclude volatile and personalised intents, and treat the similarity threshold as a safety parameter — a loose one turns a cost optimisation into a data-leak and a correctness bug.
:::
