## DevOps agent: safety and defense

- An agent with access to production telemetry — and, if you let it, production *controls* — is powerful and dangerous. The design is about bounding what it can touch.

| Risk | Control |
|---|---|
| agent takes a harmful action | read-only tools; remediation is *proposed*, human approves |
| wrong diagnosis under time pressure | rank hypotheses with evidence; never a single unbacked claim |
| accesses sensitive logs (PII, secrets) | scoped read access; redact secrets from tool results |
| injection via log content | log lines are untrusted input; least-privilege tools |
| alert storm overwhelms it | rate-limit; deduplicate related alerts before diagnosing |

- **Evidence, not assertions.** The agent must show *why* — the log lines, the metric correlation, the deploy timeline that led to its hypothesis — so the on-call engineer can verify in seconds. A diagnosis without evidence is worse than none, because it invites a confident wrong action.
- **Graduated autonomy.** Start read-and-propose; earn trust for *reversible, low-stakes* auto-actions (restart a stateless pod, clear a cache) with a kill switch and audit, keeping irreversible ones (data deletion, scaling that costs money, config changes) human-gated. Booklet 5's autonomy ladder, applied to ops.

:::interview
"Would you let an AI agent auto-remediate production incidents?"

Not at first, and not for irreversible actions ever without a human. I'd build it **read-and-propose**: read-only access to logs/metrics/deploys, output a *ranked hypothesis with the evidence trail*, and let the on-call engineer act — because a wrong action during an incident makes the outage worse, exactly when speed pressure is highest. Over time, graduate *reversible, low-stakes* actions (restart a stateless pod, clear a cache) to auto with a kill switch and full audit, keeping money-spending and destructive actions human-gated. The value is compressing *diagnosis*, where the agent is safe and fast; autonomy on *action* is earned per-action by reversibility and stakes, not granted wholesale.
:::
