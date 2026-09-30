## Bayes' theorem: updating a belief with evidence

- Bayes' theorem is the rule for changing your mind when new evidence arrives.
- You start with a belief, see data, and end with a revised belief. That is all it does — but it is the backbone of how machines reason under uncertainty.

$$ P(H \mid E) = \frac{P(E \mid H)\,P(H)}{P(E)} $$

- **`P(H)` — prior**: how likely the hypothesis was *before* the evidence.
- **`P(E | H)` — likelihood**: how well the hypothesis explains the evidence.
- **`P(H | E)` — posterior**: the updated belief, *after* the evidence.

### The example that fixes it

- A test for a rare disease (1 in 1,000) is 99% accurate. You test positive. The intuitive answer — "99% chance I'm sick" — is wrong.
- Because the disease is rare, most positives are false alarms from the huge healthy majority. The true chance is about **9%**.

<svg viewBox="0 0 300 92" role="img" aria-label="Out of positives, most come from the large healthy group as false positives, few from the rare sick group" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="9" fill="#1a1a1a">
  <rect x="20" y="30" width="200" height="24" fill="#e8f4fd" stroke="#24405e"/>
  <text x="120" y="46" text-anchor="middle">healthy: ~10 false positives</text>
  <rect x="222" y="30" width="20" height="24" fill="#1a3a2a"/>
  <text x="255" y="46" fill="#1a3a2a">~1 true</text>
  <text x="150" y="20" text-anchor="middle" font-weight="bold">who tested positive</text>
  <text x="150" y="74" text-anchor="middle" fill="#c0392b">only ~1 in 11 positives is actually sick → 9%</text>
</svg>

:::note
The lesson: a rare prior swamps a strong test. Ignoring the base rate — the **base rate fallacy** — is one of the most common reasoning errors, in humans and in badly-calibrated models alike.
:::
