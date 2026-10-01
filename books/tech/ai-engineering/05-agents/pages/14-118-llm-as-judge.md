## LLM-as-judge

- Much of what an agent produces has no exact right answer — is this summary *good*? is this response *helpful*? You cannot string-match quality. **LLM-as-judge** uses a model to score outputs against a rubric, making fuzzy quality measurable at scale. **[VERIFY]**

<svg viewBox="0 0 360 82" role="img" aria-label="A judge model scores an agent output against a rubric, producing a score and rationale" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="10" y="30" width="76" height="24" rx="3" fill="#e8f4fd" stroke="#24405e"/><text x="48" y="42" text-anchor="middle" font-size="6">agent output</text><text x="48" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">+ the input</text>
  <rect x="120" y="26" width="90" height="32" rx="4" fill="#a03050"/><text x="165" y="40" text-anchor="middle" fill="#fff" font-size="6.5">judge model</text><text x="165" y="51" text-anchor="middle" fill="#fc8" font-size="5.5">+ rubric</text>
  <rect x="246" y="30" width="100" height="24" rx="3" fill="#eaf6ea" stroke="#1a3a2a"/><text x="296" y="42" text-anchor="middle" font-size="6">score + rationale</text><text x="296" y="51" text-anchor="middle" font-size="5.5" fill="#6b6b6b">"4/5 because…"</text>
  <path d="M86 42 L118 42" stroke="#888" marker-end="url(#jm)"/><path d="M210 42 L244 42" stroke="#888" marker-end="url(#jm)"/>
  <defs><marker id="jm" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#888"/></marker></defs>
</svg>

- **How it works:** give a judge model the input, the agent's output, and a **rubric** ("rate faithfulness to sources 1–5"), and ask for a score *with a rationale*. The rationale both improves the score (chain-of-thought, 14-08) and lets you audit the judgment. Run it over your eval set for a quality metric, or over production samples for online eval (14-115).
- **Variants:** **reference-based** (compare to a gold answer), **reference-free** (judge on criteria alone), and **pairwise** (which of two outputs is better — often more reliable than absolute scores, since relative judgments are easier).
- **The catches — judges are fallible:**
  - **Bias.** Judges favor longer answers, their own model family's style, and the first option in a pair (position bias). Mitigate: randomize order, control for length, calibrate against human labels.
  - **The judge can be wrong.** It shares LLM blind spots. **Validate the judge against human ratings** on a sample — an unvalidated judge is a confident, unaccountable metric (the bad-metric trap of 14-104).

:::interview
"How do you evaluate open-ended agent output that has no exact answer?"

LLM-as-judge: prompt a model with the input, the output, and a rubric, and have it return a score plus a rationale. Use pairwise comparison when you can (relative judgments are more reliable than absolute scores), randomize option order to fight position bias, and control for length bias. Crucially, validate the judge against human ratings on a sample before trusting it — a judge shares LLM blind spots and can be confidently wrong. Done right, it makes subjective quality a measurable, scalable metric; done carelessly, it optimizes you toward whatever the judge is biased for.
:::
