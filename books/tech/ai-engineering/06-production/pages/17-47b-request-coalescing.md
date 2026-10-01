## Request coalescing and deduplication

- At scale, identical or near-identical requests arrive close together — a viral prompt, many users asking the same trending question, a retry storm, a thundering herd when a cache expires. **Coalescing** collapses these so the expensive work happens once.
- **Single-flight** is the core pattern: when a request arrives for a key already *in flight*, don't start a second computation — attach the new caller to the existing one and fan the single result out to all of them.

<svg viewBox="0 0 360 78" role="img" aria-label="Three identical concurrent requests coalesce into one model call, whose result fans out to all three" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <g fill="#f4f4f4" stroke="#888"><rect x="12" y="16" width="44" height="12" rx="2"/><rect x="12" y="34" width="44" height="12" rx="2"/><rect x="12" y="52" width="44" height="12" rx="2"/></g>
  <text x="34" y="25" text-anchor="middle" font-size="5">req (same)</text><text x="34" y="43" text-anchor="middle" font-size="5">req (same)</text><text x="34" y="61" text-anchor="middle" font-size="5">req (same)</text>
  <rect x="90" y="34" width="60" height="14" rx="2" fill="#24405e"/><text x="120" y="44" text-anchor="middle" fill="#fff" font-size="5.5">single-flight</text>
  <rect x="180" y="34" width="60" height="14" rx="2" fill="#eaf6ea" stroke="#1a3a2a"/><text x="210" y="44" text-anchor="middle" font-size="5.5">1 model call</text>
  <g fill="#eef3ee" stroke="#3b7a57"><rect x="272" y="16" width="44" height="12" rx="2"/><rect x="272" y="34" width="44" height="12" rx="2"/><rect x="272" y="52" width="44" height="12" rx="2"/></g>
  <path d="M56 22 L88 40 M56 40 L88 41 M56 58 L88 42" stroke="#888" marker-end="url(#rc)"/><path d="M150 41 L178 41" stroke="#888" marker-end="url(#rc)"/><path d="M240 41 L270 22 M240 41 L270 40 M240 41 L270 58" stroke="#888" marker-end="url(#rc)"/>
  <defs><marker id="rc" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill="#888"/></marker></defs>
</svg>

- **It's distinct from caching** (17-41/42). Caching reuses a *past* result; coalescing merges *concurrent in-flight* duplicates. They compose: coalescing prevents the thundering herd that hits the backend the instant a hot cache entry expires and a thousand requests all miss at once.
- **The safety caveat mirrors semantic caching:** only coalesce requests that are genuinely equivalent — same prompt, same user context where identity matters, non-streaming or with shared-stream fan-out. Coalescing personalised or stateful requests would serve one user's answer to another (18-39's leak risk).

:::note
Coalescing is a cheap, high-leverage pattern precisely for the traffic shapes that hurt most: virality, retry storms, and cache-expiry herds — all of which send bursts of *identical* work. Single-flight turns a spike of N identical requests into one model call plus N-1 nearly-free fan-outs, protecting the goodput knee (17-30) and the budget at exactly the moment load spikes. It sits at the gateway (17-47) alongside caching and rate limiting, and it's the pattern that keeps a "everyone's asking about the same news event" moment from melting the fleet.
:::
