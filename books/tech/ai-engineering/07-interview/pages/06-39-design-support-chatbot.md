## Design a customer-support chatbot for a SaaS company.

- **Requirements:** answer from the company's docs/tickets, cite sources, hand off to a human when stuck, multi-turn, per-customer data isolation, low latency, measured deflection rate.
- **Core = RAG + light agent:**
  - **RAG** over help docs, past tickets, and policies (hybrid retrieval + re-rank + citations). Facts live in the store, updated without retraining.
  - **Tools** for account-specific actions (look up order/subscription, create ticket) via function calling — gated and permission-scoped per user.
  - **Multi-turn** — query rewriting to resolve references from history; manage/summarise context.
- **Safety & escalation:** input/output guardrails; detect low confidence / repeated failure / explicit request → **escalate to a human** with transcript. Never fabricate policy — "I don't know, let me connect you."
- **Isolation:** strict tenant/user ACL filtering at retrieval and tool layer.
- **Eval & ops:** golden Q&A set + groundedness evals; track **deflection rate, CSAT, escalation rate, hallucination rate**; trace conversations; A/B prompt/model changes.
- **Tradeoffs:** bias toward escalation over wrong answers in support; cache common FAQs; route simple vs complex queries to cheaper vs stronger models.

:::interview
What's really being tested: choosing RAG + scoped tools (not fine-tuning facts), designing human escalation and tenant isolation, and measuring deflection/CSAT/hallucination — product-aware, not just architectural.
:::
