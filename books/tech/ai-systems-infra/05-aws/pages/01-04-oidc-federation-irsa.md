## OIDC federation and IRSA

- Roles (previous page) remove long-lived keys **inside** AWS; **OIDC federation** removes them for things **outside** AWS too. OIDC (OpenID Connect — Booklet 11) lets an external identity provider vouch for a workload, and AWS trusts that token to hand back a role's temporary credentials. No AWS secret is stored anywhere; the external system proves who it is and gets scoped, short-lived access.
- The two cases you'll meet constantly:
  - **CI/CD (e.g. GitHub Actions → AWS).** Configure GitHub as an OIDC provider in your account and a role that trusts it, scoped by repo/branch. Your pipeline deploys using a token GitHub mints **per run** — so there are **no AWS keys in your CI secrets** to leak. This is now the standard way to let a pipeline touch AWS.
  - **Pods on EKS → AWS (IRSA).** **IAM Roles for Service Accounts** uses the cluster's OIDC provider to map a Kubernetes **ServiceAccount** to an IAM **role**. A pod annotated with that service account automatically receives the role's temporary credentials — so one pod can read a specific S3 bucket while its neighbour can't, each getting **exactly** its own least-privilege role instead of sharing the node's permissions.

:::note
Why IRSA matters for the blast radius: without it, pods inherit the **EC2 node's** instance-profile permissions, so *every* pod on the node can do whatever the node can — one compromised pod gets the union of all. IRSA (and the newer, simpler **EKS Pod Identity**, which does the same mapping via an agent without wiring OIDC per cluster) pushes identity down to the **pod**, restoring least privilege inside the cluster. This is the AWS-side half of the workload-identity story that Booklets 6 and 11 complete — the pod proves who it is and gets only its own role, with no secret in sight.
:::

### Module 1 — checkpoint
- **Key concepts:** shared responsibility (line moves by service; breaches are usually your misconfig) · IAM policy = Effect/Action/Resource/Condition, default-deny, explicit-Deny-wins, least privilege · roles + STS temporary creds (no stored secrets) · instance/task/execution roles · OIDC federation (GitHub Actions) · IRSA / EKS Pod Identity.
- **Task + questions:** write the least-privilege policy for "read objects from one S3 bucket, nothing else"; then explain why a role beats an access key, and what IRSA fixes about node-level permissions.
- **Next:** Module 2 — the network (VPC).
