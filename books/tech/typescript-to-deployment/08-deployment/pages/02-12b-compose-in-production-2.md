### The rolling update on one box

```bash
docker compose pull api
docker compose up -d --no-deps --wait api
```

- **`--wait` blocks until the health check passes** and fails the command if it does not, which is what makes a deploy script safe
- Module 3 builds the zero-downtime version, where the new container is healthy before the old one is removed

### When to stop using it

- **More than one machine, or a need for real rolling deploys across hosts.** That is where ECS from Part Four, or a self-hosted platform from Module 4, takes over
