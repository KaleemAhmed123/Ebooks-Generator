## A safety case, worked

- Make the three pillars (18-28) concrete. Worked example: *a company wants to deploy an agent that can execute code in customer environments.* Build the safety case — the structured, evidence-backed argument that this deployment is acceptably safe.

:::mint
```text
CLAIM: This code-execution agent is acceptably safe to deploy.

Pillar 1 — INCAPABILITY   (weakest here; the agent CAN run harmful code)
  ✗ cannot argue incapability — running code is the whole point of the product.

Pillar 2 — MONITORING   (the primary pillar for this case)
  ✓ every action is logged and traced (OTel), reviewed by a trusted classifier
  ✓ anomalous actions (network calls, credential access) escalate to a human
  ✓ evidence: red-team shows the monitor catches >X% of injected malicious actions

Pillar 3 — CONTAINMENT / ILLEGIBILITY   (the secondary pillar)
  ✓ sandbox: no network, filesystem denylist, resource + time limits
  ✓ least-privilege: the agent cannot reach beyond the customer's scoped env
  ✓ blast radius is bounded even if a harmful action does execute

RESIDUAL RISK: a novel action that evades the monitor AND escapes the sandbox
  -> accepted, or mitigated with human approval on irreversible actions?
```
:::

- **The structure is the lesson.** The case opens with a claim, argues it through the three pillars, and — crucially — *names the residual risk* that survives all of them. That residual-risk line is the honest core a checkbox "we added guardrails" omits, and it's what a reviewer scrutinises first.

:::note
Notice how the case *picks its pillars to the situation*: incapability is off the table because code execution is the feature, so the weight shifts to monitoring (detect and stop) and containment (bound the damage). A CBRN-knowledge case would instead lean on incapability (unlearning); a deceptive-alignment case on monitoring and interpretability. There is no one safety-case template — there is a *method*: state the claim, argue the applicable pillars with evidence, and be explicit about what risk remains. The next page draws out why that evidence discipline is what separates a safety case from a reassurance.
:::
