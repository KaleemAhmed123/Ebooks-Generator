## Policy as code

- A golden path guides; a **guardrail** enforces. **Policy as code** expresses organisational rules — "no public S3 buckets," "every resource must be tagged with an owner," "no IAM wildcard actions," "images only from our registry" — as **machine-checkable code that runs in CI** and **fails the pull request** when violated. The rule stops being a wiki page nobody reads and becomes a test nobody can skip.
- The common engine is **OPA** (Open Policy Agent, a graduated CNCF project) with its policy language **Rego**. **Conftest** runs Rego against structured config — a Terraform/OpenTofu **plan** (as JSON), Kubernetes manifests, Dockerfiles — in the pipeline. Terraform-specific scanners (**Checkov**, **tfsec/Trivy**) ship hundreds of ready rules for the same job. The check sits **between plan and apply**, so a violating change never reaches the cloud.

<svg viewBox="0 0 360 74" role="img" aria-label="In the pipeline, a plan is produced then checked by policy-as-code; a pass proceeds to apply, a violation fails the pull request before anything is created" xmlns="http://www.w3.org/2000/svg" font-family="Georgia,serif" font-size="7" fill="#1a1a1a">
  <rect x="8" y="26" width="70" height="22" rx="3" fill="#e6e1f1" stroke="#5c4b8a"/><text x="43" y="40" text-anchor="middle" font-size="6">plan (JSON)</text>
  <rect x="104" y="26" width="86" height="22" rx="3" fill="#f6f4fa" stroke="#5c4b8a"/><text x="147" y="37" text-anchor="middle" font-size="6">policy check</text><text x="147" y="46" text-anchor="middle" font-size="4.8" fill="#777">OPA/Conftest</text>
  <rect x="222" y="6" width="130" height="20" rx="3" fill="#e6f0e9" stroke="#2f7d4f"/><text x="287" y="19" text-anchor="middle" font-size="6">pass → apply</text>
  <rect x="222" y="40" width="130" height="20" rx="3" fill="#fdecea" stroke="#c0392b"/><text x="287" y="49" text-anchor="middle" font-size="6">violation → fail PR</text><text x="287" y="57" text-anchor="middle" font-size="4.8" fill="#777">nothing created</text>
  <path d="M78 37 L104 37" stroke="#1a1a1a" marker-end="url(#pc)"/><path d="M190 33 L222 18" stroke="#2f7d4f" marker-end="url(#pc)"/><path d="M190 41 L222 48" stroke="#c0392b" marker-end="url(#pc)"/>
  <defs><marker id="pc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#999"/></marker></defs>
</svg>

- The same **OPA engine reappears at the Kubernetes admission layer** (OPA Gatekeeper / Kyverno, Booklet 11) to block non-compliant workloads at deploy time. Learning policy-as-code once covers both the IaC pipeline *and* the cluster — defence at the two points where resources get created.

:::lab
Write one Conftest policy in Rego that **denies any `aws_s3_bucket` without `server_side_encryption` and public-access-block**, and run it against a Terraform plan locally (`tofu plan -out tf.plan && tofu show -json tf.plan > plan.json && conftest test plan.json`). Add a bucket that violates it and watch the check fail; fix the bucket and watch it pass. Then add a second rule rejecting any IAM statement with `"Action": "*"`. You now have a guardrail that would have stopped Booklet 5's two top incidents — a public bucket and an admin-everywhere policy — before they ever reached the account.
:::
