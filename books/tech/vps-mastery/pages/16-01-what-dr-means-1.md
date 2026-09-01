## What disaster recovery means here

- Not a bad deploy. That is a rollback, and Module 14 covers it
- **Disaster recovery is: the server is gone and is not coming back**

| Event | Frequency | Covered by |
|---|---|---|
| Bad deploy | Monthly | Rollback |
| Container crash | Weekly | Restart policy |
| Disk full | Yearly | Alerts, page 15-09 |
| Data corruption from a bug | Rare | Restore from backup |
| **Host failure, account suspension, region loss, deleted by mistake** | Rare | **This module** |

### The target

- **A blank Ubuntu server to a serving stack in under thirty minutes**, without needing to remember anything

| Phase | Budget |
|---|---|
| Provision a new box | 3 min |
| Bootstrap script | 5 min |
| Restore secrets and pull images | 5 min |
| Restore the database | 10 min |
| DNS and TLS | 5 min |
| Verify | 2 min |
