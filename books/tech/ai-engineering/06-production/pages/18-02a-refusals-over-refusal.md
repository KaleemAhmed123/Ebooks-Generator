## Refusals and over-refusal

- The visible product of safety training is the **refusal** — the model declining a request. Getting refusals *right* is a two-sided balance: refuse the genuinely harmful, comply with the benign, and the failures on both sides are real product problems.
- **Over-refusal** is the underrated failure: a model so cautious it refuses safe requests — "how do I kill a Python process?", "write a villain's threatening monologue for my novel" — because they surface-pattern-match to harm.

<svg viewBox="0 0 340 78" role="img" aria-label="A 2x2 of request harmfulness vs model response, showing the two error cells: over-refusal and unsafe compliance" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <text x="90" y="12" text-anchor="middle" font-size="6" fill="#6b6b6b">request: safe</text><text x="240" y="12" text-anchor="middle" font-size="6" fill="#6b6b6b">request: harmful</text>
  <rect x="30" y="18" width="120" height="22" fill="#eaf6ea" stroke="#1a3a2a"/><text x="90" y="32" text-anchor="middle" font-size="6">comply ✓</text>
  <rect x="180" y="18" width="120" height="22" fill="#fdeef2" stroke="#a03050"/><text x="240" y="29" text-anchor="middle" font-size="6" fill="#a03050">comply ✗</text><text x="240" y="37" text-anchor="middle" font-size="5" fill="#a03050">unsafe (jailbreak)</text>
  <rect x="30" y="42" width="120" height="22" fill="#fdeef2" stroke="#a03050"/><text x="90" y="53" text-anchor="middle" font-size="6" fill="#a03050">refuse ✗</text><text x="90" y="61" text-anchor="middle" font-size="5" fill="#a03050">over-refusal (UX)</text>
  <rect x="180" y="42" width="120" height="22" fill="#eaf6ea" stroke="#1a3a2a"/><text x="240" y="56" text-anchor="middle" font-size="6">refuse ✓</text>
</svg>

- **The two errors trade off**, exactly like the classifier thresholds of a safety gate (18-22). Push refusals up to catch every harmful request and you refuse more benign ones; loosen to help everyone and more harmful requests slip through. It is the same precision/recall dial, applied to the model's own behavior.
- **Measure both.** A safety eval that only tracks "did it refuse the harmful set?" rewards a model that refuses *everything* — useless as a product. You need a benign "should-comply" set (like XSTest-style benchmarks) to catch over-refusal, alongside the harmful set.

:::warn
Over-refusal is how safety training quietly destroys a product. A model that refuses legitimate security questions, medical information, creative fiction, or ordinary system administration frustrates exactly the expert users who most need it — and they route to a competitor or a jailbroken version, which is a *worse* safety outcome. "Refuses everything risky-looking" is not safe, it is broken. Calibrate refusals against a benign-request eval, and treat a spike in over-refusal as a regression, not a win.
:::
