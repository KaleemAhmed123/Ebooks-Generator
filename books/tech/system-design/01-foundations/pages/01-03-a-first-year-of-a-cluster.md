## Failure is the steady state

- At scale, something is always broken. The question is never "if" but "which one, right now"
- Jeff Dean's figures for a typical first year of a new Google cluster (2010) are the numbers to carry:

| Event | Typical first year |
|---|---|
| Machine failures | ~1,000 |
| Disk failures | thousands |
| Rack failures (40–80 machines gone, 1–6 hours) | ~20 |
| Racks going "wonky" (50% packet loss) | ~5 |
| Network maintenances | ~8 |
| Router reloads | ~12 |
| Router failures | ~3 |
| 30-second DNS blips | dozens |
| Network rewiring (5% of machines down over 2 days) | ~1 |

- Read the middle rows again. Whole racks vanish twenty times a year. A rack that drops half its packets, five times a year, is worse than one that dies: it is still "up"

### The assumption that fails

- "The rack won't die this quarter" is a bet at roughly 5-to-1 against, every quarter
- Any design that puts all copies of one thing in one rack, or one zone, has decided that row does not apply to it
- The same arithmetic applies to your dependencies. A service calling ten others sees ten times their failure rates, combined

### What it changes

- Recovery is a normal code path, not an emergency procedure. It runs a thousand times a year
- If recovery needs a human, the humans are the bottleneck at about the third incident of the day
- Design questions later in this series — replication, retries, leader election — are all answers to this table
