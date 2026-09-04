## Speculative Decoding

A small draft model proposes the next few tokens; the large model scores all of
them in one forward pass and keeps the longest prefix it agrees with. Rejected
tokens are resampled from the large model, so the output distribution is exactly
what the large model alone would have produced.

It pays off because a transformer can score several candidate tokens in a single
pass for close to the cost of scoring one, whereas generating them
autoregressively costs that many sequential passes.

<svg viewBox="0 0 460 84" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A draft model proposes five tokens, the large model verifies them in one pass, the first three are accepted and the fourth is corrected, so four tokens emerge from one large-model pass">
  <text x="4" y="14" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">draft model proposes</text>
  <rect x="4" y="20" width="34" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><rect x="42" y="20" width="34" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><rect x="80" y="20" width="34" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><rect x="118" y="20" width="34" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/><rect x="156" y="20" width="34" height="18" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M200 29 H228" stroke="#1a1a1a" stroke-width="1.2"/><path d="M228 29 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="232" y="18" width="100" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="282" y="33" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">one verify pass</text>
  <text x="4" y="60" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">large model keeps</text>
  <rect x="4" y="64" width="34" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/><rect x="42" y="64" width="34" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/><rect x="80" y="64" width="34" height="18" fill="#fdece5" stroke="#c25a35" stroke-width="1.4"/>
  <rect x="118" y="64" width="34" height="18" fill="none" stroke="#c25a35" stroke-width="1.4" stroke-dasharray="3 2"/>
  <text x="135" y="77" text-anchor="middle" font-family="Consolas,monospace" font-size="7.5" fill="#c25a35">fixed</text>
  <path d="M156 73 L190 73" stroke="#1a1a1a" stroke-width="1.2" stroke-dasharray="3 3"/>
  <text x="196" y="76" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">discarded</text>
  <text x="240" y="76" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">4 tokens for the price of 1</text>
</svg>

Leviathan et al. (ICML 2023) measured 2x–3x on T5-XXL with identical outputs, no
retraining and no architecture change.

**The whole gain rides on the acceptance rate.** A draft model that rarely
agrees adds its own cost and returns nothing.

## Spend Circuit Breaker

A hard cap that stops spend once a per-tenant, per-feature or global budget is
crossed inside a window. A bug in an ordinary service produces errors; a bug in
an AI system produces an invoice.

The dangerous shape is a loop — an agent retrying a failing tool, a job
reprocessing the same documents. Each individual call is legitimate and small.
Unattended overnight, they compound into a number nobody budgeted for. Two tiers
handle it: a soft limit that alerts and degrades to a cheaper model, and a hard
limit that rejects with a clear error.

Agents need tighter caps than request-response features, because one run makes
many calls. Bound steps, tokens and wall-clock time per run alongside the money.

**Alert on the rate of spend, not the total.** A sharp climb is actionable hours
before the absolute figure crosses anything — the difference between a quick fix
and a conversation with finance.
