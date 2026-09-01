## Before it takes real traffic

### It runs

- Two instances or tasks minimum, across two availability zones
- Health checks: liveness and readiness, separate, and the load balancer uses readiness
- `SIGTERM` handled, drain time and stop timeout both longer than the slowest request
- Resource limits set, and an out-of-memory kill is visible in the metrics

### It deploys

- The pipeline builds once, tags with the commit SHA, and promotes the same artifact
- No long-lived AWS credentials anywhere in it
- A rollback that has been performed, not just documented
- Migrations are backward compatible and run as their own step

### It is observable

- Structured JSON logs to CloudWatch, with a retention policy set
- A correlation id on every log line, propagated across services and into queues
- The dashboard from Module 14, with deploy markers on it
- Alerts that page, each with a runbook link

### It survives

- Backups on, retention set, and a restore actually performed
- A dead letter queue on every queue, with an alarm on its depth
- Timeouts on every outbound call, and a defined degraded mode
- Autoscaling with a minimum that is not one, and a maximum that is not unbounded

### It is secure and affordable

- The security checklist from earlier in this module, walked line by line
- A budget alarm, and cost allocation tags active
- A log retention policy, so observability does not outgrow the servers

- **Every unchecked line is a decision to accept that risk.** That is fine, as long as it was a decision
