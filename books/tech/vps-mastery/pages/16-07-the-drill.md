## The drill

- A recovery plan that has never been executed is a document, not a capability
- Run it once a quarter, on a real new box, with a timer

### The rules

1. **Use a fresh server**, not the old one repaired
2. **Nobody may SSH into production during the drill.** If a value is needed from there, the plan has a gap
3. **Time each phase.** The total is the honest RTO
4. **Write down every place the script failed.** Those are the real deliverable

### The record

| Date | Total | Where it stalled | Fixed |
|---|---|---|---|
| 2026-02-14 | 1 h 52 m | age key was only on the old box | Moved to the password manager |
| 2026-05-09 | 47 m | Postgres 18 could not read an 17 dump | Pinned the major version |
| 2026-08-15 | 31 m | DNS TTL was 3600 | Lowered to 300 permanently |

- **Every one of those was found by drilling and would have been found during an outage otherwise.** That is the entire argument for doing it

### The cost

- A drill costs one hour and a few dollars of server time. Four a year is half a working day

### The cheaper version

- If a full drill is not happening, do the partial one on page 12-07: restore the latest backup into a scratch database and count the rows
- It takes ten minutes and catches the most common failure, which is a backup that was never valid
