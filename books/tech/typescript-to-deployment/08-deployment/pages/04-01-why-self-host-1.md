# Module 4 - Self-hosting the stack

## Running the backing services yourself

- Part Four pays AWS for RDS, ElastiCache, Amazon MQ and S3. **On one box you run the same software yourself, in containers, for the cost of the memory it uses**
- Booklet 5 taught these as technologies: how Postgres indexes, how RabbitMQ routes, how Redis expires keys. **This module is about operating them**: configuration, persistence, backups, upgrades and the failure modes

### What self-hosting actually costs

| You take on | Managed gives you |
|---|---|
| backups, and testing them | automated, point in time |
| minor and major version upgrades | a maintenance window |
| tuning memory and connections | sensible defaults |
| failover when the box dies | multi-AZ standby |
| the pager | someone else's pager |

- **The money saved is real and the time is not free.** A self-hosted Postgres is perhaps two hours a month, and one bad afternoon a year
