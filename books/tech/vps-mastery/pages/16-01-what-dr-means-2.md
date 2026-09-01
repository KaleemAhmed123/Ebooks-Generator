### The two numbers

- **RTO** (Recovery Time Objective) - how long recovery may take. Target: 30 minutes
- **RPO** (Recovery Point Objective) - how much data may be lost. With nightly backups: **up to 24 hours**

### Twenty-four hours of data loss is usually not acceptable

- Nightly dumps are a floor, not an answer. Options that improve RPO:
  - Dump every hour instead of nightly. RPO becomes 1 hour, at more storage cost
  - Continuous archiving in Postgres, restoring to any point in time. Real work to set up
  - A managed database, where the provider handles it

- **Decide the acceptable number before the incident.** Choosing it during one produces the wrong answer
