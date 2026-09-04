## Tool Schema Design

Tool names, descriptions and parameter documentation are the entire basis on
which the model chooses. That makes them prompt engineering, not API reference,
and most wrong-tool selection traces back here rather than to model capability.

A tool named `search`, described as "searches", gives the model nothing to
separate it from three other search-like tools. It guesses, and it guesses
inconsistently, which is worse than guessing wrong.

The part almost always missing is when *not* to use it. "Do not use this for
customer data; use `get_customer` instead" resolves ambiguity better than
describing the correct tool more thoroughly. Parameters behave the same way:
`date` invites any format, "date as YYYY-MM-DD, e.g. 2026-03-14" gets one.

**Past a point, better wording stops helping.** When many tools overlap in
purpose the model is choosing among near-synonyms. Consolidate them, or split
the agent so each holds a smaller set.

## Train-Serve Skew

Preprocessing at training time differing from preprocessing at serving time, so
the model is fed inputs subtly unlike anything it learned on.

The differences are small and boring. Whitespace normalised in one path and not
the other. A different truncation length. Fields concatenated in a different
order. None of them look like bugs in review.

<svg viewBox="0 0 460 86" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Training and serving each build model inputs through their own preprocessing code, so the two paths drift apart and the model receives inputs it never learned on">
  <rect x="4" y="6" width="88" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="48" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">training data</text>
  <path d="M92 17 H118" stroke="#1a1a1a" stroke-width="1.2"/><path d="M118 17 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="120" y="6" width="112" height="22" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="176" y="21" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">prep_v1 (notebook)</text>
  <rect x="4" y="52" width="88" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="48" y="67" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">live request</text>
  <path d="M92 63 H118" stroke="#1a1a1a" stroke-width="1.2"/><path d="M118 63 l-7 -4 v8 z" fill="#1a1a1a"/>
  <rect x="120" y="52" width="112" height="22" fill="#e2fcf3" stroke="#c25a35" stroke-width="1.4"/>
  <text x="176" y="67" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#c25a35">prep_v2 (service)</text>
  <path d="M232 17 H286 V32" stroke="#1a1a1a" stroke-width="1.2"/>
  <path d="M232 63 H286 V48" stroke="#1a1a1a" stroke-width="1.2"/>
  <rect x="288" y="29" width="80" height="22" fill="none" stroke="#1a1a1a" stroke-width="1.2"/>
  <text x="328" y="44" text-anchor="middle" font-family="Consolas,monospace" font-size="8" fill="#1a1a1a">same model</text>
  <text x="376" y="44" font-family="Georgia,serif" font-size="9" fill="#6b6b6b">two inputs</text>
</svg>

The symptom is a persistent, unexplained gap between offline and production
accuracy. Offline is clean because one script built both training and evaluation
inputs; production runs different code.

**One shared preprocessing module, imported by both paths, with a test asserting
identical output for identical input.** Two separate implementations drift,
always, via a change nobody connected to the model.
