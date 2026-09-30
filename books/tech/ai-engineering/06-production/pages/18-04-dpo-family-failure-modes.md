## The DPO family, failure modes

- Booklet 4 introduced **DPO** (Direct Preference Optimization — align a model directly from preference pairs, skipping a separate reward model) and its successors (IPO, KTO, ORPO, SimPO). Here the interest is where they *break*, because that is what a safety review probes.
- All of them optimise "prefer the chosen response over the rejected one." The failure modes come from what that objective quietly ignores.

| Failure | Cause | Symptom |
|---|---|---|
| **likelihood displacement** | pushing down "rejected" also drops nearby *good* responses | quality dips on unrelated prompts |
| **length bias** | chosen responses tend to be longer | model learns "longer = better" |
| **reward over-optimisation** | drift far from the reference model | fluent but degraded, off-distribution |
| **distribution mismatch** | preference data unlike real traffic | aligned for the wrong inputs |

- **Likelihood displacement is the subtle one.** DPO lowers the probability of the rejected response — but probability mass is shared, so it can also lower the probability of *desirable* responses that resemble the rejected one. The model can get worse at things the preference data never mentioned.
- **The reference-model leash matters.** DPO's KL term (the "stay close to the reference model" penalty) is what stops runaway drift; SimPO drops the reference model for efficiency and must control length/quality another way. Knowing *which* variant keeps *which* guardrail is the depth signal.

:::warn
The dangerous property of preference-tuned models is that the failures are *invisible on the preference metric*. A DPO model can win on the preference benchmark it was trained for while quietly degrading on capabilities the data never covered (likelihood displacement) — so the number that says "aligned" and the reality "worse on real tasks" both go up. Always evaluate a preference-tuned model on a broad held-out capability suite, not just the preference win-rate it was optimised for.
:::
