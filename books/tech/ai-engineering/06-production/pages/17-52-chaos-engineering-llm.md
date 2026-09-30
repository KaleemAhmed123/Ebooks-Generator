## Chaos engineering for LLMs

- Chaos engineering injects controlled failures into production to prove the system survives them *before* they happen for real. LLM systems have failure modes ordinary services do not, so the chaos experiments are different.

| Inject | Real-world cause | What you're testing |
|---|---|---|
| provider 500s / timeouts | OpenAI/Anthropic incident | failover to second provider (17-03) |
| a GPU pod killed mid-generation | node loss, deploy | in-flight request drain, retry |
| KV pool forced full | traffic spike | admission control, load shedding |
| slow TPOT (throttle) | degraded model/hardware | timeout + fallback model |
| garbage / adversarial output | model regression, jailbreak | guardrails catch it (Module 18) |
| retrieval returns nothing | vector DB down | graceful degradation, not a crash |

- **The LLM-specific experiments are the last three.** Ordinary chaos kills infrastructure; LLM chaos also corrupts *outputs* — inject a hallucinated or unsafe response and verify the guardrails and validators catch it, and inject an empty retrieval and verify the system degrades to a sensible "I don't know" instead of confidently making things up.
- **Run in production, on a small slice, with a stop button.** The value is proving the *real* system's failover, retries, and degradation paths work — staging never reproduces the true dependency graph.

:::note
Chaos engineering closes the reliability loop: SRE sets the targets (17-51), observability shows the truth (17-45), load testing finds the capacity knee (17-50), and chaos proves the failure paths actually fire. For LLM systems the crucial addition is testing **degradation of quality**, not just availability — a system that stays up but silently starts hallucinating when retrieval fails has an outage its uptime dashboard will never show.
:::
