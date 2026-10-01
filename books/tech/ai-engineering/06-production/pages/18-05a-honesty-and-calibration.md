## Honesty and calibration

- Sycophancy (18-05) is one face of a deeper property: **honesty** — does the model say what it believes to be true, admit uncertainty, and decline to fabricate? Its measurable cousin is **calibration** — does the model's stated confidence match its actual accuracy?
- A well-calibrated model that says "I'm 70% sure" is right about 70% of the time. Most aligned models are *overconfident* — they assert wrong answers in the same fluent, certain tone as right ones.

<svg viewBox="0 0 340 80" role="img" aria-label="A calibration plot: perfect calibration is the diagonal; an overconfident model bulges below it" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="6.5" fill="#1a1a1a">
  <line x1="34" y1="66" x2="34" y2="10" stroke="#888"/><line x1="34" y1="66" x2="150" y2="66" stroke="#888"/>
  <line x1="34" y1="66" x2="150" y2="10" stroke="#3b7a57" stroke-dasharray="3 2"/><text x="118" y="20" font-size="5.5" fill="#3b7a57">perfect</text>
  <path d="M34 66 Q100 60 150 30" fill="none" stroke="#a03050" stroke-width="1.3"/><text x="120" y="48" font-size="5.5" fill="#a03050">overconfident</text>
  <text x="92" y="76" text-anchor="middle" font-size="5.5" fill="#6b6b6b">stated confidence</text>
  <text x="200" y="34" font-size="6">calibration = confidence</text><text x="200" y="46" font-size="6">matches accuracy</text><text x="200" y="60" font-size="5.5" fill="#6b6b6b">overconfidence is the norm</text>
</svg>

- **Why it matters in production.** Users calibrate their *trust* to the model's *tone*. An overconfident model that sounds equally sure when right and wrong trains users to over-rely on it — and the wrong answers land hardest exactly when a user couldn't check. Calibration is a safety property, not a nicety.
- **Honesty is distinct from harmlessness.** A model can be harmless (refuses bad requests) yet dishonest (confidently fabricates a citation, agrees with a false premise). The HHH triad — Helpful, Harmless, **Honest** — names honesty separately for this reason, and it is the property sycophancy and hallucination both violate.

:::interview
"How do you measure whether a model is honest, not just harmless?"

Two angles. **Calibration** — bin predictions by stated confidence and check accuracy per bin (a well-calibrated model's "80% sure" is right 80% of the time); most models are overconfident, and you can measure and even post-hoc-correct it. **Truthfulness under pressure** — evals like a pushback test (does it abandon a correct answer when challenged?) and fabrication checks (does it invent citations/facts?). The key framing: honesty is a *separate* axis from harmlessness — a model can refuse all the bad stuff and still confidently lie — so it needs its own metric, and calibration is the most tractable one.
:::
