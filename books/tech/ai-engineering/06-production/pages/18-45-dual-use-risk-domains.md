## Dual-use risk domains

- The dangerous-capability thresholds (18-30) track four domains where AI *uplift* — making a malicious actor more capable than they would be without it — is the specific concern. Each has a distinct threat model and a distinct measurement.

| Domain | The uplift concern | Measured by |
|---|---|---|
| **cyber** | writing exploits, automating attacks at scale | capture-the-flag, vuln-discovery evals |
| **bio** | lowering the barrier to a biological weapon | WMDP-Bio, expert uplift studies |
| **chem** | synthesis routes for chemical weapons | WMDP-Chem, red-team probes |
| **nuclear / radiological** | know-how for a radiological device | expert-graded elicitation |

- **The key concept is *marginal uplift*, not raw knowledge.** The right question is not "does the model know chemistry?" (textbooks do too) but "does the model *meaningfully lower the barrier* for someone who couldn't otherwise do this?" A model that just restates public information adds little uplift; one that troubleshoots a novice's synthesis or plans an operation is the concern.
- **Cyber is the most immediate** because attacks are digital, scalable, and the feedback loop is fast — an AI that finds and exploits vulnerabilities autonomously is a here-and-now risk (the CVE/agent connection, 18-24). Bio and chem are graver in ceiling but bottlenecked by physical steps AI does not remove.

:::interview
"How do you assess whether a model is dangerous in a domain like bio?"

Measure **marginal uplift**, not knowledge. Run a domain proxy eval (WMDP-Bio) for a capability floor, but the real assessment is a controlled study: does access to the model meaningfully raise a realistic threat actor's success over the baseline of public resources? Elicit the *ceiling* (scaffolding, best-effort prompting, 18-30), because a determined actor will. If uplift crosses the framework threshold, it triggers the corresponding safeguards — restricted deployment, unlearning, gating, or not releasing weights. The framing that matters: the harm is *differential capability enabled*, not the presence of dangerous facts.
:::
