## Terraform vs OpenTofu

- **Terraform**, from HashiCorp, is the tool that defined declarative IaC and the **HCL** language (HashiCorp Configuration Language — the `resource "aws_vpc" "main" { … }` syntax). In **August 2023 it relicensed** from the open MPL to the **Business Source License (BSL) 1.1** (effective in v1.6) — source-available, free for most, but forbidding use that competes with HashiCorp. That broke the open-source guarantee many companies and vendors relied on.
- The response was a **fork**: **OpenTofu** — the pre-BSL Terraform codebase, back under the open **MPL 2.0** and governed by the **Linux Foundation**. It keeps the **same HCL, same state format, and the same provider ecosystem**, so it's close to a drop-in replacement; `terraform` becomes `tofu`.

<svg viewBox="0 0 360 86" role="img" aria-label="Timeline: Terraform was open MPL until August 2023 when it relicensed to BSL at version 1.6; OpenTofu forked the open codebase under MPL with Linux Foundation governance and has since added its own features" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <line x1="12" y1="34" x2="348" y2="34" stroke="#999"/>
  <circle cx="60" cy="34" r="3" fill="#5c4b8a"/><text x="60" y="26" text-anchor="middle" font-size="5.4">Aug 2023: TF → BSL (v1.6)</text>
  <circle cx="180" cy="34" r="3" fill="#2f7d4f"/><text x="180" y="26" text-anchor="middle" font-size="5.4">OpenTofu fork (MPL, LF)</text>
  <circle cx="310" cy="34" r="3" fill="#2f7d4f"/><text x="310" y="26" text-anchor="middle" font-size="5.4">2026: OpenTofu v1.12.x</text>
  <rect x="24" y="48" width="150" height="30" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="99" y="60" text-anchor="middle" font-size="5.8">Terraform (BSL 1.1)</text><text x="99" y="71" text-anchor="middle" font-size="5" fill="#777">HashiCorp · HCP integration</text>
  <rect x="186" y="48" width="150" height="30" rx="3" fill="#e6f0e9" stroke="#2f7d4f"/><text x="261" y="60" text-anchor="middle" font-size="5.8">OpenTofu (MPL 2.0)</text><text x="261" y="71" text-anchor="middle" font-size="5" fill="#777">open · state encryption, for_each</text>
</svg>

- They have since **diverged in features**, which turns "which one?" into a real decision rather than a licence footnote. OpenTofu (current stable **v1.12.x**, 2026) shipped capabilities Terraform's open CLI still lacks: **native state encryption** (encrypt the state/plan at rest — directly addressing Module 1.2's plaintext-secrets risk), **`for_each` on provider blocks**, early variable evaluation, and an `-exclude` flag. Terraform keeps tight integration with HashiCorp's paid **HCP Terraform** platform.
- A third option, **Pulumi**, drops HCL entirely and writes infrastructure in **general-purpose languages** (TypeScript, Python, Go) — real loops, types, and unit tests, at the cost of HCL's simplicity and the enormous HCL knowledge base. Everything in this booklet is HCL and runs on **either Terraform or OpenTofu**.

:::note
How to actually choose in 2026: default to **OpenTofu** for new work if open-source licensing matters to you or your customers (common for vendors and regulated shops) — it's open, LF-governed, and now feature-ahead on state encryption. Stay on **Terraform** if you depend on HCP Terraform or an enterprise support contract. Because the HCL and providers are shared, the migration cost is low and the skill transfers completely — learn the language, not the brand.
:::
