## Design a multi-tenant LLM platform serving many customers.

- **Requirements:** many tenants share infra cheaply, but with strict **isolation** (data, cost, noisy-neighbour), per-tenant customisation, and fair performance.
- **Isolation:**
  - **Data** — hard tenant boundaries in vector stores/logs (ACL filters enforced at retrieval, separate namespaces or encryption keys); never let one tenant's data reach another's prompt.
  - **Performance** — per-tenant **rate limits/quotas** and priority so a heavy tenant doesn't starve others (noisy neighbour); fair scheduling on shared GPUs.
  - **Cost** — attribute tokens/$ per tenant; budgets and billing.
- **Customisation:** per-tenant prompts/config, and per-tenant **LoRA adapters** served on a shared base model (multi-LoRA serving) — cheap customisation without a model per tenant.
- **Serving:** shared GPU pool with continuous batching; route tenant requests, apply their adapter/prompt; autoscale on aggregate load.
- **Ops:** per-tenant observability, SLOs, and guardrail config; onboarding/offboarding (including data deletion).
- **Tradeoffs:** shared infra (cost-efficient) vs dedicated (stronger isolation for premium/regulated tenants) — often a tiered offering; multi-LoRA (cheap, shared base) vs per-tenant fine-tunes (more isolation, more cost).

:::interview
What's really being tested: that you nail tenant isolation (data ACLs, quotas/noisy-neighbour, cost attribution) and use multi-LoRA on a shared base for cheap per-tenant customisation — core multi-tenant SaaS thinking applied to LLMs.
:::
