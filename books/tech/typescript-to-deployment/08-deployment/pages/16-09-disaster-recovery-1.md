## When something large fails

- Multi-AZ handles a data center. **Disaster recovery is about losing a region, an account, or the data itself**

### The four strategies

| Strategy | RTO | Costs |
|---|---|---|
| **backup and restore** | hours | almost nothing |
| **pilot light** | tens of minutes | a replicated database, everything else off |
| **warm standby** | minutes | a small copy of everything, always running |
| **active active** | seconds | double, plus real complexity |

- **Backup and restore is the correct answer for most services.** Choosing active active for a product with no revenue attached to a minute of downtime is a way to spend a year

### What has to exist for even the cheapest one to work

- **Infrastructure as code**, so the environment can be recreated. Without it, recovery is archaeology
- **Snapshots copied to another region and another account.** A compromised account can delete its own snapshots
- **S3 cross-region replication** for anything irreplaceable
- **A written procedure**, and someone who has followed it

```bash
aws rds copy-db-snapshot --source-db-snapshot-identifier <arn> \
  --target-db-snapshot-identifier orders-dr --source-region ap-south-1 --region ap-southeast-1

aws s3api put-bucket-replication --bucket acme-uploads --replication-configuration file://replication.json
```
