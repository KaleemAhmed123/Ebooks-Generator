## IAM least-privilege in code

- IAM (Booklet 5) is where IaC pays off most and fails worst. Expressed as code, every permission is **reviewable, diffable, and greppable** — a reviewer sees exactly what a role can do before it exists, and you can audit "who can delete S3?" with a search. Clicked in the console, the same policies are invisible and sprawl. IaC turns least-privilege from an aspiration into a diff.
- The right tool is the **`aws_iam_policy_document`** data source, not a hand-written JSON heredoc: it's validated at plan, composable, and readable.

:::mint
```hcl
data "aws_iam_policy_document" "app" {
  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${aws_s3_bucket.uploads.arn}/*"]   # this bucket only
  }
}
```
:::

- The most valuable use is **IRSA** (Booklet 5/6): an IAM role a *pod* assumes via the cluster's OIDC provider, scoped to exactly the AWS actions that one service needs — and **no static keys anywhere**. The role's trust policy names the specific Kubernetes service account, so only that workload can assume it. This is how an AI-serving pod gets read access to one model bucket and nothing else.
- Because policies reference **resource ARNs you built in the same code** (`aws_s3_bucket.uploads.arn`), least privilege is natural: you scope to the actual bucket/queue, not `"*"`. The wildcard temptation (`"Action": "*"`, `"Resource": "*"`) that Booklet 5 flagged as account-takeover fuel is now something a reviewer catches in the pull request diff — before it ships.

:::warn
IAM mistakes in IaC are **high-blast-radius and easy to automate at scale** — one over-broad module reused across ten services grants ten over-privileged roles. Guard it on two fronts: a **policy-as-code check in CI** (Module 4.2) that fails the plan on a wildcard action or a public principal, and **AWS IAM Access Analyzer** to find unused grants to trim. And apply the same least-privilege to the **pipeline's own role** (Module 4.3): the CI principal that runs `apply` is itself a top target — scope it, don't hand it `AdministratorAccess`.
:::
