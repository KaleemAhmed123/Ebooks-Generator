### Disk full on the database

```sql
SELECT pg_size_pretty(pg_database_size(current_database()));
SELECT relname, pg_size_pretty(pg_total_relation_size(relid)) FROM pg_catalog.pg_statio_user_tables
ORDER BY pg_total_relation_size(relid) DESC LIMIT 10;
SELECT slot_name, active, pg_size_pretty(pg_wal_lsn_diff(pg_current_wal_lsn(), restart_lsn))
FROM pg_replication_slots;
```

- **An inactive replication slot holds WAL forever and fills the disk.** It is the most surprising database outage there is. Drop the slot if the replica is gone

### The rule

- **Never `DELETE` or `TRUNCATE` to free space during an incident.** It writes more WAL and does not return disk until vacuum. Add disk instead
- **Take a snapshot before any destructive action**, however obvious it seems
