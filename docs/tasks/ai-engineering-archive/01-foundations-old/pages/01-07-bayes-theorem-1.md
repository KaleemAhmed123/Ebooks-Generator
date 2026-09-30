## Bayes' theorem — prior, likelihood, posterior

- **Prior** P(H) — your belief about hypothesis H before seeing any evidence. It encodes what you know from experience, domain knowledge, or earlier data
- **Likelihood** P(E|H) — how probable the observed evidence E is, assuming H is true
- **Posterior** P(H|E) — your updated belief after incorporating the evidence. The answer Bayes computes
- **Bayes' theorem**: `P(H|E) = P(E|H) · P(H) / P(E)`. The denominator `P(E)` is just a normalizing constant ensuring the posterior sums to 1

### Why the prior dominates when the condition is rare

<svg viewBox="0 0 460 80" role="img" aria-label="Disease testing example: despite 99% accuracy, only 0.98% of positives are truly sick because the disease is rare (1 in 10000)" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="4" y="8" width="104" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="56" y="26" text-anchor="middle" font-weight="bold">Prior</text>
  <text x="56" y="42" text-anchor="middle">P(sick) = 0.0001</text>
  <text x="56" y="58" text-anchor="middle" fill="#6b6b6b">disease is rare</text>
  <text x="126" y="44" text-anchor="middle" font-size="14">×</text>
  <rect x="144" y="8" width="108" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="198" y="26" text-anchor="middle" font-weight="bold">Likelihood</text>
  <text x="198" y="42" text-anchor="middle">P(+|sick) = 0.99</text>
  <text x="198" y="58" text-anchor="middle" fill="#6b6b6b">test is accurate</text>
  <text x="270" y="44" text-anchor="middle" font-size="14">÷</text>
  <rect x="288" y="8" width="84" height="64" rx="3" fill="none" stroke="#1a1a1a"/>
  <text x="330" y="26" text-anchor="middle" font-weight="bold">Evidence</text>
  <text x="330" y="42" text-anchor="middle">P(+) = 0.0101</text>
  <text x="386" y="44" text-anchor="middle" font-size="14">=</text>
  <rect x="396" y="8" width="60" height="64" rx="3" fill="#e8f4fd" stroke="#24405e"/>
  <text x="426" y="26" text-anchor="middle" font-weight="bold" fill="#24405e">Posterior</text>
  <text x="426" y="42" text-anchor="middle" fill="#24405e">0.98%</text>
</svg>

99% accurate test. 1-in-10,000 disease. Positive result: only 0.98% chance of actually being sick. The rare prior crushes the likelihood.
