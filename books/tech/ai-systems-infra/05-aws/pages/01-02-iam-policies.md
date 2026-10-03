## IAM policies

- **IAM** (Identity and Access Management) answers one question for every API call: **is this principal allowed to do this action on this resource?** The answer is computed from **policies** — JSON documents of statements, each with four parts:

:::mint
```json
{ "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::reports/*",
  "Condition": { "IpAddress": { "aws:SourceIp": "10.0.0.0/16" } } }
```
:::

- **Effect** (`Allow`/`Deny`), **Action** (which API calls), **Resource** (which ARNs), and optional **Condition** (when it applies — source IP, MFA present, tag match). Two kinds attach in two places: **identity-based** policies on a user/role ("what this principal may do") and **resource-based** policies on the resource itself ("who may touch this bucket/queue"). An S3 bucket policy and an SQS queue policy are resource-based; both sides are evaluated.
- The evaluation logic you must know cold: **default deny** (no permission unless something grants it), any **explicit `Deny` always wins** over any `Allow`, and across all applicable policies the result is "allowed only if some Allow matches **and** no Deny matches." This is why an explicit Deny is the sledgehammer for guardrails (e.g. an org-wide SCP denying `*` outside approved regions).

:::warn
`"Action": "*", "Resource": "*"` — admin-everywhere — is the policy that turns a single leaked credential or compromised pod into a **full account takeover**. The same with `s3:*` on `*` or `iam:*` (which lets the holder grant themselves anything — privilege escalation). **Least privilege** is not a nicety here; it's the blast-radius control that decides whether a mistake is an incident or a catastrophe. Start from nothing, add the specific actions and resource ARNs a workload needs, and use IAM Access Analyzer to find the wildcards you left behind. Booklet 11 returns to this as the core of cloud security.
:::
