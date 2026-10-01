## Model routing and cascades

- Not every request needs your best model. **Model routing** sends each request to the cheapest model that can handle it; a **cascade** tries a cheap model first and *escalates* to a stronger one only when the cheap answer is not good enough.
- Most traffic is easy. Routing exploits that: pay frontier prices only for the fraction that genuinely needs frontier capability.

<svg viewBox="0 0 360 92" role="img" aria-label="A router or cascade sends easy queries to a small cheap model and hard queries to a large expensive model" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="36" width="52" height="20" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="36" y="49" text-anchor="middle" font-size="6">router</text>
  <rect x="96" y="14" width="88" height="18" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="140" y="26" text-anchor="middle" font-size="6">small model (80%)</text>
  <rect x="96" y="60" width="88" height="18" rx="3" fill="#24405e"/><text x="140" y="72" text-anchor="middle" font-size="6" fill="#fff">large model (20%)</text>
  <path d="M62 42 L94 23" stroke="#1a3a2a" marker-end="url(#rt)"/><path d="M62 50 L94 69" stroke="#888" marker-end="url(#rt)"/>
  <path d="M184 23 Q220 23 220 45 Q220 69 186 69" fill="none" stroke="#a03050" stroke-dasharray="3 2" marker-end="url(#rt2)"/><text x="252" y="30" font-size="5.5" fill="#a03050">cascade: escalate</text><text x="252" y="40" font-size="5.5" fill="#a03050">if low confidence</text>
  <defs><marker id="rt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker><marker id="rt2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a03050"/></marker></defs>
</svg>

:::mint
```text
1M requests/mo. Small $0.20/1M-tok, large $10/1M-tok, 1k tok each.

All-large:      1M × 1k × $10/1e6                    = $10,000
Route 80/20:    0.8M×1k×$0.20 + 0.2M×1k×$10 /1e6      = $2,160
Cascade (small first, 25% escalate + re-run on large):
   small on all + large on 25%
   1M×1k×$0.20 + 0.25M×1k×$10 /1e6                    = $2,700
=> routing ~78% cheaper; cascade slightly more but needs no upfront classifier.
```
:::

- **Router vs cascade.** A router *classifies up front* (rules, a small classifier, or a cheap LLM) and picks one model — one call, but the classifier can be wrong. A cascade *tries then checks* — no classifier needed, but escalated requests pay twice (cheap attempt + expensive redo). Pick a router when you can classify reliably, a cascade when "good enough" is easy to judge after the fact.
- **The quality guard is the escalation signal:** confidence, a verifier, or a schema-validation failure. A bad signal escalates everything (no saving) or nothing (quality drops).

:::interview
"How do you cut cost without hurting quality on the hard cases?"

Route by difficulty: a small cheap model handles the easy majority, the frontier model handles the hard minority — quality is preserved *because* the hard cases still get the strong model. Choose router vs cascade by whether difficulty is predictable up front (router) or only judgeable after an attempt (cascade). The framing — *cheapest model that clears the bar, per request* — is the point.
:::
