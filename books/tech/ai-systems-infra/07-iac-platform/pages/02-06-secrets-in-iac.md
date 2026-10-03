## Secrets in IaC

- IaC has a secret problem baked into its model: **anything a resource needs, the tool puts in state** (Module 1.2), and state is **plaintext JSON**. A database password, a generated private key, an API token — set it on a resource and it's in state in the clear, even if your code never hardcoded it. So "where do secrets go?" is a first-class design question, not an afterthought.
- The non-negotiables, worst-to-best:
  - **Never hardcode** a secret in `.tf` — it lands in git history forever (and git history is forever even after you delete the line).
  - **Never commit a `.tfvars` with real secrets** — `.gitignore` them; they're as sensitive as the state.
  - **Pull secrets at apply time from a store.** A `data` source reads the live value from **AWS Secrets Manager / SSM** or **Vault** (Booklet 11) when you apply, so the secret lives in the store, not your code.

:::mint
```hcl
data "aws_secretsmanager_secret_version" "db" {
  secret_id = "prod/db/password"
}
resource "aws_db_instance" "main" {
  password = data.aws_secretsmanager_secret_version.db.secret_string
}
# value still enters STATE → encrypt state + lock the backend
```
:::

- Pulling from a store fixes **source control** but **not state** — the fetched value still writes into state. So you layer the controls: **encrypt state at rest** (an encrypted S3 backend, plus OpenTofu's **native state encryption** from Module 1.3 for defence beyond the backend), **lock down who can read the state bucket** with IAM (Booklet 5), and **mark variables/outputs `sensitive`** to keep them out of logs (Module 2.2).
