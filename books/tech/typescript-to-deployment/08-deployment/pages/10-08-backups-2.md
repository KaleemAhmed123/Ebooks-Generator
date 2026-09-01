### Beyond the database

- **S3**: versioning plus a lifecycle rule, and cross-region replication if the region is a risk you care about
- **A snapshot copied to another account** is the defence against a compromised account deleting everything, which a same-account snapshot is not
- **AWS Backup** centralises schedules and retention across RDS, EBS, S3 and DynamoDB in one place

### The drill

- **Restore to a scratch instance every quarter**, run a real query, time it, and write the number down
