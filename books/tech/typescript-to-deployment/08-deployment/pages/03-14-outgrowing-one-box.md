## When you have outgrown it

- One box is the right answer until it is not. **The signals are specific**, and none of them are "it feels small"

| Signal | Means |
|---|---|
| **downtime during a deploy is now a complaint** | you need more than one machine |
| **a reboot is an incident** | single point of failure is now costing you |
| **the database competes with the app for memory** | move the database off first |
| **you are afraid to touch it** | there is no second environment |
| **backups have never been restored** | fix that before anything else |
| **more than one person deploys** | you need a pipeline and a staging box |

### The order to grow in, cheapest first

1. **Bigger box.** A resize and a reboot. Buys a year for many services
2. **Move the database to managed.** Removes backups, patching and failover from your responsibilities in one step
3. **Add a second app box behind a load balancer.** Now deploys and reboots are not outages
4. **Move to ECS or a managed platform**, which is Part Four

- **Step two is the one that pays off most.** The database is the piece where a mistake is unrecoverable and where managed services are genuinely better

### What carries over

- **The container image, unchanged.** Everything in Module 2 applies identically on ECS
- The compose file becomes a task definition. The Caddyfile becomes a load balancer listener. The deploy script becomes a pipeline job
- **Nothing you built here is wasted**, which is the argument for starting on one box rather than starting on Kubernetes

### What does not

- **Anything written to the local filesystem.** Move uploads to object storage before you add a second machine, not after
