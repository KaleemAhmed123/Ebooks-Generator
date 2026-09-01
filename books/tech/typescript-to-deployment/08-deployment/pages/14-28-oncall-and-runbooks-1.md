## On-call and runbooks

- Someone has to be reachable when an alert fires, and they will not remember the recovery steps at 3am
- **A runbook is those steps, written down before they are needed**, and it is the difference between a fifteen minute incident and a two hour one

### What a runbook contains

```markdown
# Alert: orders-5xx-high

## What it means
More than 1% of requests are returning 5xx over 3 minutes.

## First checks, in order
1. Was there a deploy in the last 30 minutes? `gh run list --workflow deploy.yml`
2. Target health: `aws elbv2 describe-target-health --target-group-arn <arn>`
3. Errors: `aws logs tail /ecs/orders-api --filter-pattern '{ $.level = "error" }' --since 15m`
4. Database: RDS CPU, connections, and ReplicaLag in CloudWatch

## Recovery
- Deploy-related: roll back to the previous task definition (link)
- Database at connection limit: scale the service down, then investigate
- Dependency down: enable the kill switch flag for that feature

## Escalate to
Payments team if the errors are on /payments/*.
```
