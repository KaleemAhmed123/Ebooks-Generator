## Where 2PC breaks

- 2PC is safe against every single crash; the cost is that one of them blocks. The table is the protocol's whole reputation

| Who crashes, when | What the others do | Outcome |
|---|---|---|
| a participant, before it votes | the coordinator times out, decides abort, tells the rest | safe: nothing was promised |
| a participant, after voting yes | the coordinator commits; the participant recovers, reads its log, asks the coordinator for the decision, applies it | safe: the vote was durable |
| the coordinator, before any participant voted yes | participants time out in prepare and abort on their own | safe: no promise made |
| **the coordinator, after a participant voted yes** | that participant may neither commit (another may have voted no) nor abort (it promised). It waits, **locks held**, until the coordinator returns and replays its log | **in doubt**, for as long as the coordinator is down |

- The in-doubt case is why 2PC is avoided across services: a participant's availability is now the coordinator's availability, and the locks it holds block unrelated transactions that touch the same rows
- Three-phase commit adds a pre-commit round so participants can decide without the coordinator; it assumes bounded message delay and chooses wrong under a partition, which is why consensus-based commit replaced it (Module 7)

### The failure

- 2PC across teams. Team B's coordinator crashes at 02:00 and Team A's database holds prepared transactions until someone on Team B wakes up. In Postgres the operator ends it by hand with `COMMIT PREPARED` or `ROLLBACK PREPARED`, and has to find out which one was right
