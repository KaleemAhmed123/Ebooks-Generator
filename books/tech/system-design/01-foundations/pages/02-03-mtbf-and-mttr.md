## MTBF and MTTR

- **MTBF**, mean time between failures: how long the system runs before something breaks
- **MTTR**, mean time to recovery: how long it stays broken once it has
- Availability is their ratio:

```
availability = MTBF / (MTBF + MTTR)

150 days between failures, 1 hour to recover
= 3,600 h / (3,600 h + 1 h) = 99.97%
```

- Two levers, one number. Make failures rarer, or make them shorter

### MTTR is the lever you own

- MTBF is mostly the world's: hardware, dependencies, the traffic pattern that finds the bug. Doubling it means finding and fixing faults you have not seen yet
- MTTR is yours: detection time, paging time, diagnosis time, rollback time. Each is a measurable step with a known cost to shrink
- Halving MTTR in the example above, from 1 hour to 30 minutes, moves 99.97% to 99.986%. Doubling MTBF to 300 days gives 99.986% too. One of those is a rollback button; the other is a research programme
- This is why mature teams obsess over deploys that can be reverted in a minute and alerts that fire in under a minute. Recovery speed is availability

### The failure

- A quarter spent hardening against rare faults while the on-call rota still takes 40 minutes to find the right dashboard. The MTTR was the cheap nine and nobody bought it
- The other direction: automated recovery that restarts a process in two seconds and hides a fault that recurs a hundred times a day. MTTR is tiny, the underlying failure never gets fixed, and one day the restart is not enough. Count the recoveries, not just their duration
