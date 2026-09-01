### Record the number

| Drill date | Snapshot age | Restore time | Rows | Result |
|---|---|---|---|---|
| 2026-08-30 | 6 h | 4 min 12 s | 84,211 | pass |

- **The restore time is the RPO input for Module 16.** Guessing it during an outage is how a thirty-minute recovery becomes three hours

### Alert on the backup, not just the server

- A backup job that stops running produces no alert unless something is watching for its absence. Page 15-10 covers the dead man's switch
