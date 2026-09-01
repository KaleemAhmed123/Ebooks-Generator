### Why it is strictly better

| | SSH | Session Manager |
|---|---|---|
| Inbound port | 22 open | none |
| Credentials | a key to distribute | IAM |
| Access control | file permissions on a key | IAM policy, per tag |
| Audit | whatever the host logged | CloudTrail, and full session recording to S3 |
| Revoking access | rotate the key everywhere | remove a policy |

- **Session logging to S3 is the feature that changes an audit conversation.** Every command anyone ran is recorded, centrally
- **The best version is not needing it at all.** If a fix requires logging into a box, the fix is not in the pipeline
