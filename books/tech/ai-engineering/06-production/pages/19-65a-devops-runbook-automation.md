## DevOps agent: runbooks and graduated action

- The DevOps agent (Flagship 14) diagnoses and proposes. To let it *act* safely, encode operational knowledge as **runbooks** — structured, tested procedures — and grant autonomy per-action by reversibility.

:::mint
```python
# a runbook: a named, tested procedure with a risk level and a verifier
RUNBOOKS = {
  "restart_stateless_pod": {"risk": "low",  "reversible": True},
  "rollback_deploy":       {"risk": "med",  "reversible": True},
  "scale_up":              {"risk": "med",  "reversible": True,  "cost": True},
  "delete_data":           {"risk": "high", "reversible": False, "human": True},
}
def execute(choice):
    rb = RUNBOOKS[choice]
    if rb.get("human") or not rb["reversible"]:
        return request_human_approval(rb)       # gate irreversible/high-risk
    rb["action"]()                               # act
    return rb["verify"]()                        # confirm it helped
```
:::

- **Runbooks turn "the agent acts" into "the agent picks a *vetted* action."** The agent doesn't invent arbitrary commands — it selects from a library of tested procedures, each with a known risk level, a reversibility flag, and a *verifier* that confirms the action helped (the verification-gate pattern, Flagship 4). This bounds the action space to things ops already trusts.
- **Graduated autonomy by reversibility** (Flagship 14): low-risk reversible runbooks (restart a stateless pod) can auto-execute with a kill switch; medium-risk reversible ones (rollback, scale) auto-execute with tighter monitoring; irreversible or costly ones (delete data, large scale-up) *always* require human approval.

:::note
This is safe-autonomy (Booklet 5, Module 18) made concrete for ops: constrain the agent to a *vetted action library*, gate by *reversibility and cost*, and *verify* every action helped — like onboarding a junior on-call engineer who follows runbooks and escalates the scary stuff. The agent gets faster over time not by becoming more autonomous wholesale, but by *more runbooks being promoted* to auto-execute as they earn it by reversibility and track record.
:::
