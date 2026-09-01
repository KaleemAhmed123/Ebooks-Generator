### Watching for lag

```bash
aws cloudwatch get-metric-statistics --namespace AWS/RDS \
  --metric-name ReplicaLag --dimensions Name=DBInstanceIdentifier,Value=orders-replica-1 \
  --start-time 2026-08-31T00:00:00Z --end-time 2026-08-31T01:00:00Z \
  --period 300 --statistics Maximum
```

### Upgrades

- **A minor version upgrade during the maintenance window causes a short restart.** Multi-AZ makes it a failover instead
- **A major version upgrade is a real project.** Test it against a restored snapshot, and read the release notes for the extensions you use
- Blue/green deployments for RDS create a synchronised copy on the new version and switch over in about a minute
