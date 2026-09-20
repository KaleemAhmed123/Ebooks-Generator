## Scale up or out

- The decision depends on the tier, its bottleneck, and where the state lives

| Situation | Direction | Why |
|---|---|---|
| Database under the ceiling, load growing slowly | **Up** | no distributed-systems cost; one box is simpler to operate |
| Stateless request handlers, traffic growing | **Out** | add pods; a balancer routes; each pod is disposable |
| Data too large for one machine | **Out** (partition) | the data must be split; booklet 02 covers how |
| Reads heavy, writes light | **Out** (read replicas) | copies serve reads; writes go to the primary |
| Both compute and data growing | **Both** | bigger database *and* more web nodes, until the DB hits the ceiling, then partition it too |

### The bottleneck decides, not the dashboard

- CPU at 30%, memory at 40%, but the p99 is climbing. The bottleneck is probably a lock, a sequential scan, or a dependency, not the box itself
- Scaling out the web tier does nothing if the bottleneck is the database. Scaling up the database does nothing if the bottleneck is a distributed lock
- Before adding resources, find the serial fraction (Amdahl) or the queue (Little). The constraint decides the fix

### The failure

- A team scales out a stateless API to 40 pods. Throughput does not change. The Postgres query planner is doing a sequential scan on a 200 GB table. Forty pods hit the same slow query, forty times as often. The fix was an index, not a node
