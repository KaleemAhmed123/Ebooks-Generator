## Where 2PC breaks

- Performance is not the only reason 2PC is disliked. It also has catastrophic failure modes when servers crash at exactly the wrong time

| Crash scenario | What happens | Outcome |
|---|---|---|
| **Participant crashes before Prepare** | Coordinator times out waiting for "Yes". | **Safe**. Coordinator sends `ROLLBACK` to everyone else. |
| **Participant crashes after saying "Yes"** | The Coordinator decides `COMMIT`. When the participant reboots, it reads its log and applies the commit. | **Safe**. The promise was durable. |
| **Coordinator crashes *before* logging the decision** | Participants time out waiting for Phase 2. Because the Coordinator never logged the decision, it defaults to abort. | **Safe**. Participants eventually rollback. |
| **Coordinator crashes *after* participants say "Yes"** | **Disaster**. | **In doubt**. |

- **The "in doubt" transaction**: If DB A says "Yes" (acquiring row locks), and then the Coordinator's motherboard catches fire, DB A is stuck. It is not allowed to commit (because it doesn't know if DB B said yes). It is not allowed to rollback (because it promised not to).
- DB A is stuck in an "in doubt" state. The row locks are held forever. The database will literally grind to a halt until a human operator SSHes into the server, manually inspects the other databases, and runs a manual `COMMIT PREPARED` or `ROLLBACK PREPARED` command

### The failure

- Using 2PC across independent teams. If Team A's database goes down, and Team B's coordinator is waiting, Team A's row locks are held hostage by Team B. 2PC tightly couples the availability of every participant, defeating the entire purpose of microservices
