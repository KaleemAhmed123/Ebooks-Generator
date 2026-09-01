### The decision points, during

| Signal | Do |
|---|---|
| errors rise above baseline | **roll back now.** Investigate afterwards |
| p95 doubles | roll back |
| healthy count stops climbing | read the task or container logs. It is failing to start |
| the migration is slow | **do not cancel it.** A cancelled `ALTER TABLE` can leave a lock. Watch `pg_stat_activity` |
| everything is flat | wait the full rollout, then verify

- **The bias during a deploy is to roll back, not to investigate.** The system is in a known-good state one command away, and the investigation is easier from there
