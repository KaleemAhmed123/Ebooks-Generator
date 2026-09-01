## The security checklist

### Account

- Root has MFA and is never used
- No IAM users with access keys. Humans use identity federation, machines use roles
- CloudTrail on, in every region, writing to a bucket in a separate account
- GuardDuty on. It finds credential misuse and cryptomining with no configuration
- A budget alarm, because unexpected spend is often the first sign of a compromise

### Network

- No security group allows `0.0.0.0/0` on 22, 3389, 5432, 6379 or 27017
- Application and database subnets are private. Only the load balancer is public
- No database is `publicly-accessible`
- Session Manager instead of SSH, with session logging to S3
- IMDSv2 required on every instance

### Data

- Encryption at rest on RDS, S3, EBS and ElastiCache
- TLS in transit, including to Redis and Postgres
- Block public access on every bucket
- Versioning on any bucket holding something you would miss
- Backups tested by an actual restore

### Application

- Secrets from Secrets Manager or Parameter Store, never from an image
- Containers run non-root, read-only, with capabilities dropped
- Images scanned on push, and rebuilt on a schedule
- Dependencies scanned, and updates applied rather than acknowledged
- A WAF in front, with rules that have been through count mode

### Process

- A secret scanner in CI
- Least privilege reviewed, with Access Analyzer findings resolved
- Every production change through a pipeline, none through the console
- **Someone owns this list and reviews it quarterly.** A checklist with no owner is a document, not a control
