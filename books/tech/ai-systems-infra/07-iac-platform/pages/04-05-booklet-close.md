## Booklet 7 — what you can now do

- **Reason declaratively**: describe the **end state** and let the tool diff-and-apply, understanding **state** as the pivot (code → real IDs) and **drift** as reality diverging from it — fixed by routing every change through code.
- **Choose your tool with context**: **Terraform (BSL since v1.6)** vs **OpenTofu (MPL, Linux Foundation, state encryption)** vs Pulumi — shared HCL and providers make the skill portable.
- **Write real HCL**: providers/resources (references = the dependency graph), data sources, **variables/locals/outputs**, and **modules** composed by wiring outputs → inputs.
- **Operate state safely**: **versioned, encrypted, locked remote state** — S3-native `use_lockfile` (TF 1.11+) over the deprecated DynamoDB table — split per layer; **directory-per-env** over workspaces; **secrets** pulled from a store or owned by the cloud, never in code.
- **Build the whole stack in code**: VPC → EKS (IRSA) → RDS/cache/ALB/S3 wired by SG-references → **IAM least-privilege** → monitoring, all in one composed graph.
- **Build the platform**: **golden paths** (paved, not walled), **policy-as-code** guardrails that fail the PR, **plan-on-PR → apply-on-merge** with an OIDC-scoped role and drift detection, and an **IDP** over it all.

<svg viewBox="0 0 360 54" role="img" aria-label="The arc: the idea, writing HCL, building the stack, and platform engineering" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="5.8" fill="#1a1a1a">
  <rect x="6" y="20" width="76" height="16" rx="2" fill="#e6e1f1" stroke="#5c4b8a"/><text x="44" y="31" text-anchor="middle">the idea</text>
  <rect x="90" y="20" width="84" height="16" rx="2" fill="#f6f4fa" stroke="#5c4b8a"/><text x="132" y="31" text-anchor="middle">writing HCL</text>
  <rect x="182" y="20" width="92" height="16" rx="2" fill="#e6e1f1" stroke="#5c4b8a"/><text x="228" y="31" text-anchor="middle">build the stack</text>
  <rect x="282" y="20" width="72" height="16" rx="2" fill="#e6f0e9" stroke="#2f7d4f"/><text x="318" y="31" text-anchor="middle">platform</text>
</svg>

- **Next booklet:** *Observability & SRE* — the stack you just built in code emits telemetry (Module 3.5) from day one. Now make it **operable**: the four signals with OpenTelemetry, RED/USE and PromQL, traces and continuous profiling, SLOs and error budgets, load testing and chaos, and the incident method — trace a request edge→service→DB→queue and name where it broke.
