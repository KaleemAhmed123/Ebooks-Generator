## Backups, and restoring them

- **A backup you have never restored is a hypothesis.** The only proof is a restore, done on purpose, on a schedule

### What RDS gives you

```bash
aws rds modify-db-instance --db-instance-identifier orders-prod \
  --backup-retention-period 14 --preferred-backup-window 18:00-19:00 --apply-immediately

aws rds create-db-snapshot --db-instance-identifier orders-prod \
  --db-snapshot-identifier orders-pre-migration-$(date +%Y%m%d)

aws rds restore-db-instance-to-point-in-time \
  --source-db-instance-identifier orders-prod \
  --target-db-instance-identifier orders-restore-test \
  --restore-time 2026-08-31T09:30:00Z
```

- **Point-in-time recovery goes to any second within the retention window**, which is what turns a bad migration at 09:31 into a fifteen minute problem
- **A restore creates a new instance.** It does not overwrite the original, so it is safe to practice

### The two numbers to agree on

| Term | Means | Typical |
|---|---|---|
| **RPO** | how much data you can afford to lose | 5 minutes |
| **RTO** | how long you can be down | 1 hour |

- **Write them down and test against them.** A restore that takes four hours against a one hour target is a known problem rather than a discovery during an incident
