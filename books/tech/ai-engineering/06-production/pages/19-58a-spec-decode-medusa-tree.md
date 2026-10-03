## Speculative decoding: Medusa and tree attention

- The server (Flagship 11) drafted a single linear sequence of k tokens. Two refinements push acceptance and throughput further, and they're the techniques production engines actually use.
- **Medusa** removes the separate draft model entirely: it adds extra *prediction heads* to the target model itself, each predicting a token a few positions ahead. No second model to run or keep in memory — the target drafts for itself.

<svg viewBox="0 0 360 82" role="img" aria-label="Tree drafting: instead of one linear guess, propose a tree of candidate continuations and verify them all in one pass" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <text x="80" y="14" text-anchor="middle" font-size="6" fill="#a03050">linear draft (one guess)</text>
  <g fill="#e8f4fd" stroke="#24405e"><rect x="30" y="22" width="20" height="14"/><rect x="56" y="22" width="20" height="14"/><rect x="82" y="22" width="20" height="14"/><rect x="108" y="22" width="20" height="14"/></g>
  <text x="270" y="14" text-anchor="middle" font-size="6" fill="#1a3a2a">tree draft (many candidates)</text>
  <circle cx="200" cy="29" r="6" fill="#24405e"/>
  <circle cx="230" cy="18" r="6" fill="#e8f4fd" stroke="#24405e"/><circle cx="230" cy="40" r="6" fill="#e8f4fd" stroke="#24405e"/>
  <circle cx="262" cy="14" r="6" fill="#eef3ee" stroke="#3b7a57"/><circle cx="262" cy="26" r="6" fill="#eef3ee" stroke="#3b7a57"/><circle cx="262" cy="44" r="6" fill="#eef3ee" stroke="#3b7a57"/>
  <path d="M206 27 L224 20 M206 33 L224 38 M236 16 L256 14 M236 22 L256 25 M236 42 L256 44" stroke="#888"/>
</svg>

- **Tree attention** replaces the linear guess with a *tree* of candidate continuations — several possible next tokens, each with several possible followers — and verifies the *whole tree* in one target pass using a specially-masked attention. Since more candidate paths are checked per pass, the odds that a long correct path is among them rise, lifting accepted-tokens-per-step beyond linear drafting.
- **This is the lineage** (17-38): Medusa (extra heads, no draft model) → EAGLE (feature-level drafting) → EAGLE-2/3 (dynamic trees, multi-layer features). Each raises acceptance — the number that governs the speedup (17-38a) — with tree verification as the common accelerant.

:::note
The progression shows the two axes of speculative-decoding research: *better drafts* (Medusa's self-heads, EAGLE's feature-level prediction — higher per-token acceptance) and *more candidates per verification* (tree attention — more chances for a long correct path). Both convert the same lossless mechanism (Flagship 11) into a bigger speedup, and both are why "2–3× faster" became "sometimes 4–5×" on predictable text. You don't implement these — the engines do — but knowing the lineage and that it's all raising *acceptance × candidates-per-pass* is the depth an interviewer probes past "we turned on speculative decoding."
:::
