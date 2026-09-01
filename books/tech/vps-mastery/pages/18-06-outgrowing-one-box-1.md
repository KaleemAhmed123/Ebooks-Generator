## When one box is no longer enough

- The signals, in the order they usually appear

| Signal | Meaning |
|---|---|
| The largest available instance is still saturated | Vertical scaling is finished |
| Downtime during a reboot is no longer acceptable | A single machine cannot avoid it |
| Users in two continents, with latency complaints | One location cannot serve both |
| The database competes with the application for memory | The database wants its own machine |
| More than one team deploying, blocking each other | Organizational, not technical |
| Compliance requires demonstrable redundancy | The answer is a second machine |

### The steps out, cheapest first

**1. Move the database off.** A managed Postgres removes backups, patching and failover from the list, and takes the memory pressure off the box

**2. Move object storage off.** Page 10-11. Usually already done

**3. A second application box behind a load balancer.** The application must already be stateless, which page 18-02 required anyway

**4. Managed container hosting.** The same images, someone else's orchestration

**5. Kubernetes.** Only with a team to operate it. It is a full-time responsibility, and this booklet deliberately stops before it

### What carries over

- The images are unchanged. The Dockerfiles, health checks and the twelve-factor discipline are all portable
- The Compose file becomes a task definition or a manifest. The concepts survive the translation
