## The fairness impossibility

- The uncomfortable theorem: **you cannot satisfy all reasonable fairness criteria at once.** Except in degenerate cases, *calibration*, *equal false-positive rates*, and *equal false-negative rates* across groups are mathematically incompatible whenever the groups have different base rates. This is not an engineering limitation — it is arithmetic.

:::mint
```text
Two groups, a risk score, different base rates of the outcome.
You want, across groups:
  (1) calibration        — score s means P(outcome)=s for everyone
  (2) equal FPR          — same false-positive rate
  (3) equal FNR          — same false-negative rate

Chouldechova / Kleinberg et al. (2016–17): when base rates differ,
you can have AT MOST TWO of {calibration, equal FPR, equal FNR}.
Enforcing calibration + equal FPR forces UNEQUAL FNR, and so on.
No classifier, however good, escapes this.
```
:::

- **The real-world case that made it famous:** the COMPAS recidivism debate. The tool was *calibrated* across race (a given score meant the same reoffend probability) yet had *unequal* false-positive rates — one group was more often wrongly flagged high-risk. Both "it's fair" (calibrated) and "it's unfair" (unequal FPR) were *true*, because they used different, incompatible definitions.
- **The consequence for engineers:** you must *choose* which fairness property to guarantee and *accept* the one you give up, then defend the choice on the ground of the specific harm. There is no configuration that is fair by all definitions simultaneously.

:::interview
"Can you build a model that's fair to everyone by every measure?"

No — and that's a theorem, not a skill gap. When base rates differ across groups, calibration and equal error rates are mutually exclusive (Kleinberg/Chouldechova), so *any* classifier sacrifices at least one fairness definition. The COMPAS case is the classic illustration: calibrated *and* unequal false-positive rates, both true. So the engineering task is to pick the criterion that matches the harm you most need to prevent — equal false-positives where a wrong "high-risk" flag is the worst outcome, calibration where the score's meaning must be consistent — and *justify the tradeoff explicitly*, because pretending you satisfied all of them is mathematically false.
:::
