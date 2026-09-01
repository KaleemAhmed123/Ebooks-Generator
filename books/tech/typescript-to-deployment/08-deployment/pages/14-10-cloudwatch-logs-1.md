## CloudWatch Logs

- A container writes to stdout. **A log driver ships that to a log group, and CloudWatch is where it lands on AWS**
- A **log group** is a service, a **log stream** is one container or instance inside it

```bash
aws logs tail /ecs/orders-api --follow --since 15m
aws logs tail /ecs/orders-api --filter-pattern '{ $.level = "error" }' --since 1h
aws logs describe-log-groups --query 'logGroups[].[logGroupName,retentionInDays]' --output table
aws logs put-retention-policy --log-group-name /ecs/orders-api --retention-in-days 30
```

- **The default retention is forever, and that is the single largest avoidable CloudWatch bill.** Set 30 days on application logs and 90 on audit logs

### Logs Insights

```sql
fields @timestamp, requestId, msg, durationMs
| filter level = "error"
| filter tenantId = "t_42"
| sort @timestamp desc
| limit 100
```

```sql
fields @timestamp, route, durationMs
| filter ispresent(durationMs)
| stats count(*) as n, avg(durationMs) as avg, pct(durationMs, 95) as p95 by route
| sort p95 desc
```

- **Insights parses JSON log lines automatically**, which is the entire reason the next page insists on structured logging
- Queries are billed by data scanned, so **always narrow the time range first**
