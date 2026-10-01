## Eval harness: runner, aggregation, judge

- The runner executes task specs against a model, scores each, and aggregates — with the discipline that makes results *trustworthy* rather than cherry-picked.

:::mint
```python
def run_eval(model, tasks, metrics):
    results = []
    for t in tasks:
        out = model(t["input"])
        score = metrics[t["checker"]](out, t)
        results.append({"id": t["id"], "score": score, "tags": t["tags"]})
    return aggregate(results)

def aggregate(results):
    overall = mean(r["score"] for r in results)
    by_tag  = {tag: mean(r["score"] for r in results if tag in r["tags"])
               for tag in all_tags(results)}          # disaggregate!
    return {"overall": overall, "by_tag": by_tag, "n": len(results)}
```
:::

- **Disaggregate, always** (the bias-measurement lesson, 18-36). An overall score hides subgroup failure — a model at 90% overall may be 98% on easy tasks and 55% on hard ones. Report `by_tag` (difficulty, category, language) so a regression in one slice isn't masked by the average.
- **LLM-as-judge, used honestly.** For open-ended quality, a strong model scores responses against a rubric — cheap and scalable, but it has biases (favours longer, more confident, self-similar answers). Calibrate it against periodic human review, use it for *relative* trends and gating, not absolute truth, and hold out a human-labelled set to check the judge itself (17-46a).

:::interview
"How do you build an eval you can actually trust?"

Task-specs-as-data (so cases are auditable and anyone can add them), the **right metric per task** (execution for code, LLM-judge-with-rubric for open-ended, exact-match only for closed), **disaggregated** reporting (by difficulty/category, so subgroup regressions aren't hidden by the mean), and **enough samples** to clear LLM-output noise. For LLM-as-judge, calibrate against human labels and use it for trends and gating, not gospel. Then wire it into **CI** so every model/prompt change is gated, and sample **production** traffic into it (17-46a) so the eval set tracks reality. The trust comes from disaggregation, metric-fit, and judge-calibration — not from a single headline number.
:::
