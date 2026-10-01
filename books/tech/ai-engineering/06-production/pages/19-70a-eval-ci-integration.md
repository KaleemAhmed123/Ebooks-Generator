## Eval harness: CI integration

- An eval harness (Flagship 16) only prevents regressions if it *runs automatically* on every change. Wiring it into CI turns "we should evaluate this" into a gate nothing ships past — the discipline that keeps quality from silently drifting (17-46a).

:::mint
```python
# CI step: block the merge if the eval regresses vs the baseline
def ci_eval_gate(candidate, baseline_scores, tolerance=0.02):
    scores = run_eval(candidate, tasks, metrics)          # Flagship 16
    regressions = {tag: scores["by_tag"][tag]
                   for tag in scores["by_tag"]
                   if scores["by_tag"][tag] < baseline_scores[tag] - tolerance}
    if regressions:
        print(f"BLOCKED — regressions: {regressions}")
        exit(1)                                            # fail the CI job
    if scores["by_tag"].get("safety", 1.0) < SAFETY_FLOOR: # safety = hard gate
        exit(1)
    return scores
```
:::

- **Every prompt, model, or code change runs the eval** before merge, compared against the baseline. A regression *beyond tolerance* on any slice blocks the merge — so a prompt tweak that quietly hurts one category can't ship, which is exactly the silent-regression failure (19-04) caught at the source instead of in production.
- **Safety is a *hard* gate, not a tolerance.** Quality can wobble within a small tolerance; a safety-eval regression (a jailbreak now landing, a refusal now missing) blocks unconditionally. The gate encodes the stakes — some numbers are allowed to move a little, others must not move at all.

:::note
CI-gated eval is what makes frequent, confident changes *safe* — the same reason unit tests gate code. Without it, "we evaluated it" means "someone ran the eval once, manually, a while ago," and quality drifts change by change until a user complains. With it, the eval is a living gate: it runs on every PR, its baseline updates as the product improves, and its failures are caught before merge, not after deploy. The eval harness (Flagship 16) is the tool; **CI integration is what turns it from a report into a safeguard** — and it's the single practice most correlated with LLM products that don't silently degrade.
:::
