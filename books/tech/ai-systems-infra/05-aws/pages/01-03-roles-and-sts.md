## Roles and STS

- An IAM **user** has long-lived credentials (a password, or an access key that works until you delete it). An IAM **role** has **no permanent credentials** — it's a set of permissions that a trusted principal can **assume** to receive **temporary** credentials from **STS** (Security Token Service), valid for minutes to hours, then gone. Roles are the mechanism that lets you grant access **without ever storing a secret**, and they are the correct default for almost everything.
- How assume-role works: a principal (an EC2 instance, a Lambda, a user, another account) calls `sts:AssumeRole`; STS checks the role's **trust policy** ("who is allowed to assume me?") and, if allowed, returns a short-lived access key + secret + session token. The workload uses those until they expire, then transparently gets fresh ones. Nothing durable to leak.
- The common shapes:
  - **EC2 instance profile / ECS task role / Lambda execution role** — the compute assumes a role automatically; the SDK picks up the temporary creds. Your code holds **no** keys.
  - **Cross-account roles** — account B's role trusts account A, so A's users assume into B instead of B minting users for them.

:::warn
**Long-lived IAM access keys are the top cloud credential leak.** They get hard-coded in source, committed to Git, baked into container images, or left in a `.env` — and because they don't expire, a key leaked years ago still works today, and attackers scan public repos for them continuously. The fix is structural, not vigilance: **use roles and temporary credentials everywhere** (instance profiles, task roles, OIDC — next page), set an org policy that **forbids creating access keys**, and if a human truly needs CLI access, use short-lived SSO credentials. "We rotate our keys" is weaker than "we have no long-lived keys to rotate."
:::
