## Safety for the shipping engineer

- The module spans frontier research to regulation. Most of it is context; a smaller set is what *you*, shipping an LLM product, actually do. Here is the practical checklist the theory reduces to.

| Do this | Because |
|---|---|
| input **and** output classifiers (18-22) | catch harmful content both directions |
| least-privilege tools, break the trifecta (18-18) | contain injection blast radius |
| human confirmation on irreversible actions | actions can't be un-taken (18-45a) |
| a **refusal + over-refusal** eval (18-02a) | safe *and* usable, not just safe |
| red-team suite in CI, growing (18-15) | attacks evolve; test continuously |
| version + rollback prompts/models (18-41a) | rollback is your fastest mitigation |
| keep secrets out of prompts (18-16a) | prompts leak |
| know your data provenance (18-34) | backdoors can't be trained out |
| a model/system card (18-42) | disclosure + your own release checklist |
| pick a governance framework (18-26a) | procurement + auditable posture |

- **The mindset, not the checklist, is the deliverable.** Assume the model *will* be jailbroken, injected, and wrong sometimes — and design so those events are *caught, contained, and reversible* rather than trusting the model to be perfect. That is Module 18 in one sentence: **defense in depth around a fallible component.**
- **Match effort to stakes.** A creative-writing toy needs a fraction of this; a medical, financial, or agentic system with real actions needs all of it plus the governance and eval rigor. Safety is a dial you set by the harm a failure would cause.

:::interview
"Shipping an LLM feature next week — your safety checklist?"

Defense in depth, sized to the stakes: input+output classifiers; least-privilege tools with the trifecta broken and confirmation on irreversible actions; a **refusal *and* over-refusal** eval; a red-team suite in CI that grows; versioned prompts/models for fast rollback; no secrets in the prompt; known data provenance; a model/system card as disclosure and release gate. The framing: I *assume* it'll be jailbroken, injected, and sometimes wrong, and design so each is caught, contained, and reversible — defense in depth around a fallible component, dialed to the harm.
:::
