## Closing

- The distance covered: a rented Linux box with an open SSH port, to a fifteen-service stack that deploys without dropping a request and can be rebuilt from nothing in half an hour

### The five ideas the rest hangs on

1. **The firewall does not protect published container ports.** Bind to `127.0.0.1`, or publish nothing. Page 02-09
2. **`depends_on` does not wait.** Health checks are what makes a stack start reliably. Page 06-07
3. **Build somewhere other than the server.** The memory spike, the disk pressure and most of the deploy duration all disappear. Page 13-04
4. **Old code and new code run at the same time during a deploy.** Every schema change must work with both. Page 12-09
5. **A backup that has never been restored is not a backup.** Page 12-07

### What was deliberately left out

- Kubernetes. It solves problems a single box does not have, and creates a full-time operational job
- Terraform and infrastructure as code. The bootstrap script on page 16-03 covers a single machine adequately
- Canary deployments and traffic splitting. They need monitoring good enough to judge automatically, which is a later step
