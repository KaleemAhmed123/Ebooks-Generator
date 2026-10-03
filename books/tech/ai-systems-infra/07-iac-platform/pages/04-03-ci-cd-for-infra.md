## CI/CD for infrastructure

- Running `apply` from a laptop is the IaC version of `kubectl apply` from a laptop (Booklet 6's GitOps page): unreviewed, unaudited, and reliant on one person's local credentials. Infrastructure gets a pipeline, and the canonical flow is **plan on PR, apply on merge**.
- The mechanism:
  - **On a pull request** → CI runs `init` + **`plan`** and **posts the diff as a PR comment**. The reviewer approves the *exact* change (the `-/+` and `N to destroy` from Module 1.4) alongside the code, and the policy checks (Module 4.2) run as required status checks.
  - **On merge to main** → CI runs **`apply`** of that approved plan. Git is the record of who changed what and when; the merge *is* the deploy approval.

<svg viewBox="0 0 360 80" role="img" aria-label="Pull request triggers plan and policy checks posted for review; merge to main triggers apply run by a pipeline role that assumes a scoped IAM role via OIDC with no static keys" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="12" width="78" height="22" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="47" y="23" text-anchor="middle" font-size="6">pull request</text><text x="47" y="31" text-anchor="middle" font-size="4.8" fill="#777">plan + policy</text>
  <rect x="112" y="12" width="78" height="22" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="151" y="23" text-anchor="middle" font-size="6">review diff</text><text x="151" y="31" text-anchor="middle" font-size="4.8" fill="#777">approve exact plan</text>
  <rect x="216" y="12" width="78" height="22" rx="3" fill="#e6f0e9" stroke="#2f7d4f"/><text x="255" y="23" text-anchor="middle" font-size="6">merge → apply</text>
  <rect x="216" y="48" width="136" height="22" rx="3" fill="#fff3cd" stroke="#b8860b"/><text x="284" y="59" text-anchor="middle" font-size="5.8">pipeline role via OIDC</text><text x="284" y="67" text-anchor="middle" font-size="4.8" fill="#777">scoped, no static keys</text>
  <path d="M86 23 L112 23" stroke="#1a1a1a" marker-end="url(#ci)"/><path d="M190 23 L216 23" stroke="#1a1a1a" marker-end="url(#ci)"/><path d="M255 34 L255 48" stroke="#999" marker-end="url(#ci)"/>
  <defs><marker id="ci" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- **The pipeline's credentials are the crown jewels** — it can create and destroy your whole cloud. Do **not** store long-lived AWS keys in CI. Use **OIDC federation** (Booklet 5): GitHub Actions (or your runner) presents a short-lived token to assume a **scoped IAM role**, so there are no static secrets to leak, and the role is limited to what the pipeline actually provisions (Module 3.4), not `AdministratorAccess`. **Tools:** generic CI (GitHub Actions/GitLab) runs this directly; **Atlantis** adds PR-native `plan`/`apply` comment workflows; HCP Terraform/Spacelift are managed options.
- **Drift detection** completes the loop: a **scheduled** `plan` (nightly) that reports if reality has drifted from code (Module 1.2) — the same detection GitOps does continuously for the cluster, here on a timer for the cloud.

:::warn
`apply` in CI needs a **human gate on production** and a plan it won't silently re-plan. Auto-applying to prod on every merge — with no approval step and no saved plan — means a mis-merge, or a provider that changes behaviour between plan and apply, can destroy resources unattended. Save the reviewed plan artifact and apply **that exact plan**; require a manual approval for prod; and never let the pipeline run `-auto-approve` against production without one.
:::
