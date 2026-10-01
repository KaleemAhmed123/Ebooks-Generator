## Flagship 14: DevOps troubleshooting agent — build

- **Goal:** build an agent that diagnoses production incidents — read alerts, query logs and metrics, form a hypothesis, and propose (not apply) a remediation. It is the research loop (Flagship 5) pointed at operations, and it is *read-heavy, act-carefully*.

:::mint
```python
def troubleshoot(alert):
    ctx = {"alert": alert, "findings": []}
    for _ in range(MAX_STEPS):
        obs = agent_step(ctx, tools=[query_logs, query_metrics,
                                     get_recent_deploys, check_dependencies])
        ctx["findings"].append(obs)
        hyp = form_hypothesis(ctx)                     # what's likely wrong
        if hyp.confident:
            return {"diagnosis": hyp,
                    "remediation": propose_fix(hyp),   # PROPOSE, gated on human
                    "evidence": ctx["findings"]}
    return {"diagnosis": "inconclusive", "evidence": ctx["findings"]}
```
:::

- **Read-only tools by default.** The agent queries logs, metrics, traces, recent deploys, and dependency health — all *read* operations. It *proposes* a remediation ("roll back deploy #4213", "scale the pool") but does **not** execute it without human approval, because a wrong action during an incident makes things worse. Propose-then-commit (Booklet 5), enforced.
- **The value is speed of diagnosis**, not autonomous action: an agent that correlates a spike with a deploy, checks the obvious dependencies, and hands the on-call engineer a hypothesis-with-evidence in 30 seconds is a force multiplier — even though a human pulls the trigger.

:::note
DevOps is the domain where "propose, don't act" is most clearly right: incidents are high-stakes and time-pressured, exactly when an autonomous wrong action (restarting the healthy service, scaling the wrong pool) is most damaging. So the agent's job is to *compress the diagnosis* — gather evidence a human would, correlate it, and present a ranked hypothesis with the evidence trail — while the human retains the act decision. It mirrors Module 17's incident-response triage (17-52a): classify and gather fast, mitigate deliberately.
:::
