## What is different about production

- Not the code. **The rules around touching it**

### The seven rules

1. **Nothing reaches it except through the pipeline.** No `scp`, no console edit, no `docker exec` that changes state. If it is not in git, it does not exist
2. **Every change is reversible in minutes.** A previous artifact to redeploy, and someone who has actually done it
3. **Read access is normal, write access is exceptional.** Reading logs and metrics needs no ceremony. Running a `DELETE` needs a second person
4. **Nobody has a standing production database password.** Access is temporary, logged, and expires
5. **Deploys are boring and frequent.** Ten small deploys a week is safer than one large one, because each is reviewable and revertible
6. **No deploy Friday evening**, unless the rollback has been rehearsed and someone is on call
7. **Every incident produces a written change.** A test, an alarm, a runbook, or a guard rail

### Access, concretely

```bash
aws ssm start-session --target i-0abc            # logged in CloudTrail
ssh prod                                          # logged, key-based, and audited
psql "$(aws secretsmanager get-secret-value ...)" # temporary credential
```

- **Session recording to S3 or to a log**, so what was run is answerable later. Module 9 covers Session Manager

### The things that must exist before it is production

- **A health check the load balancer uses**, distinct from liveness
- **Structured logs shipped off the machine**
- **An alert that reaches a human**, with a runbook link
- **A backup, restored at least once**
- **A defined degraded mode** for each external dependency

- **A system missing any of these is a prototype with customers on it.** That is a legitimate stage to be at, and it should be a decision rather than an accident
