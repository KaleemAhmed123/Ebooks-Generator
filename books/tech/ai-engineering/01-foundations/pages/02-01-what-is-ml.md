# Module 2 - Classical Machine Learning

## What machine learning is

- **Machine learning** is writing programs that learn their rules from examples instead of having the rules coded by hand.
- Traditional code: you write the rules, data flows through, answers come out. ML flips the middle two: you supply data *and* answers, and the machine works out the rules.

<svg viewBox="0 0 440 96" role="img" aria-label="Traditional programming takes rules plus data to produce answers; machine learning takes data plus answers to produce rules" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9.5" fill="#1a1a1a">
  <text x="105" y="14" text-anchor="middle" font-weight="bold">Traditional</text>
  <rect x="20" y="24" width="70" height="20" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="38" text-anchor="middle">rules</text>
  <rect x="20" y="50" width="70" height="20" fill="#e8f4fd" stroke="#24405e"/><text x="55" y="64" text-anchor="middle">data</text>
  <path d="M92 44 L120 44" stroke="#1a1a1a" marker-end="url(#w)"/>
  <rect x="122" y="34" width="70" height="20" fill="#1a3a2a"/><text x="157" y="48" text-anchor="middle" fill="#fff">answers</text>
  <text x="335" y="14" text-anchor="middle" font-weight="bold">Machine learning</text>
  <rect x="250" y="24" width="70" height="20" fill="#e8f4fd" stroke="#24405e"/><text x="285" y="38" text-anchor="middle">data</text>
  <rect x="250" y="50" width="70" height="20" fill="#e8f4fd" stroke="#24405e"/><text x="285" y="64" text-anchor="middle">answers</text>
  <path d="M322 44 L350 44" stroke="#1a1a1a" marker-end="url(#w)"/>
  <rect x="352" y="34" width="70" height="20" fill="#1a3a2a"/><text x="387" y="48" text-anchor="middle" fill="#fff">rules</text>
  <defs><marker id="w" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a1a1a"/></marker></defs>
</svg>

### When to reach for it

- Use ML when the rules are too many or too fuzzy to write by hand: recognizing a cat, flagging fraud, ranking search results.
- Do **not** use it when a simple rule works. "Block logins after 5 failures" needs an `if`, not a model.

:::warn
ML is not magic and not always the answer. It needs data, it can be wrong confidently, and it is harder to debug than an `if` statement. A rule you can read beats a model you cannot, whenever the rule is good enough.
:::
