## How do you measure and mitigate bias in an LLM application?

- **Bias** here means systematically different quality or treatment across groups (gender, race, dialect, language, age). Average accuracy hides it.
- Measure:
  - **Disaggregate metrics by group** — evaluate task success/quality separately per group, not just overall; look for gaps.
  - **Targeted test sets** — counterfactual pairs (same prompt, swapped demographic) to check for differing outputs; bias benchmarks for the domain.
  - **Monitor outcomes** in production for disparate impact (e.g. approval rates by group in a screening tool).
- Mitigate:
  - **Data** — balance/augment training and few-shot data; remove biased examples.
  - **Prompt/guardrails** — instructions and filters against stereotyping; refuse protected-attribute-based decisions.
  - **Post-processing / thresholds** per the fairness criterion you've chosen.
- Know the hard part: **fairness definitions conflict** — you can't satisfy all statistical fairness criteria at once (impossibility results), so you must pick which one matters for the use case and justify it.

:::interview
What's really being tested: that you measure bias by disaggregating per group (not averages), use counterfactual tests, and know fairness criteria mathematically conflict so you must choose one deliberately.
:::
