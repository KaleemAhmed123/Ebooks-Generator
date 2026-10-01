## Production-readiness checklist (2/2)

- Continuing the pre-launch checklist — the **quality, safety, and ops** half. These are the items that keep the system *correct, safe, and operable* after it ships, not just fast and cheap.

**Quality & safety**
- [ ] offline eval gating CI on every model/prompt change; a live online quality signal (17-46a)
- [ ] input **and** output safety classifiers; a refusal **and** over-refusal eval (18-02a, 18-22)
- [ ] least-privilege tools, the lethal trifecta broken, irreversible actions human-gated (18-45a)
- [ ] a red-team suite in CI that grows with every attack seen (18-15a)

**Ops**
- [ ] traces carrying token / cost / quality on every request; percentile dashboards + alerts (17-45)
- [ ] versioned prompts and models, with one-command rollback (17-44a)
- [ ] an incident runbook; changes ship via shadow / canary / progressive rollout (17-48)
- [ ] on-call knows how to classify a quality vs availability vs safety incident (17-52a)

- **The checklist is a *dial*, not a gate.** A creative-writing toy needs a fraction of it; a regulated, agentic, or high-scale system needs all of it plus governance (Module 18). The judgment that matters is matching the rigor to the harm and scale a failure would cause — over-engineering a low-stakes toy wastes effort, under-engineering a high-stakes system ships an incident.

:::note
The quality/safety/ops items are the ones most often skipped, because a feature *works in the demo* without them — and then fails in ways the demo never showed: a prompt change silently degrades quality with no error (needs online eval + rollback), a jailbreak lands (needs the red-team suite + output classifier), an incident has no runbook and no version to roll back to. "Production-ready" means you've addressed each item *to the degree the stakes demand*. Being able to produce and prioritize this list for a given system — knowing which items its stakes require and which they don't — is itself the senior AI-engineering skill this booklet was built to give you.
:::
