## Compliance frameworks

- Selling to enterprises means passing their compliance bar. You do not need to be a lawyer, but you must know which framework governs which concern and design so an audit is a checkbox, not a rebuild.

| Framework | Governs | Relevance to LLM infra |
|---|---|---|
| **SOC 2 Type II** | security controls over time | table stakes for B2B SaaS |
| **HIPAA** | US health data (PHI) | BAA with provider; no PHI to non-covered models |
| **GDPR** | EU personal data | residency, deletion, purpose limits |
| **ISO 27001** | information security mgmt | enterprise procurement |
| **PCI DSS** | payment card data | keep card data out of prompts entirely |
| **EU AI Act** | AI systems by risk tier | transparency, docs, human oversight |

- **The LLM-specific wrinkle is the third party.** The moment you send data to OpenAI/Anthropic/a hyperscaler, *their* compliance posture is part of yours — hence BAAs for HIPAA, data-residency regions for GDPR, and zero-retention settings. The two-provider policy (17-03) has a compliance cost: each provider must clear the same bar.
- **The EU AI Act** classifies systems by risk (unacceptable / high / limited / minimal) and imposes obligations up the scale — transparency that users are talking to AI, technical documentation, logging, human oversight for high-risk uses. It is the first broad AI-specific regulation; Module 18 covers the regulatory landscape in depth.

:::note
Compliance is an *architecture* input, not a bolt-on. Data residency decides which regions you deploy in (17-35); retention decides how you log prompts (17-53); the risk tier decides whether you need a human-in-the-loop gate. Retrofitting these after a design is chosen is the expensive path — the senior move is to ask "what compliance regime?" in the *requirements* phase of a system design, before drawing any boxes.
:::
