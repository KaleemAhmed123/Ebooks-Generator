### The two things to understand

- **`exposedByDefault=false` is not optional.** With the default, every container on the machine gets a public route, including your database admin UI
- **The Docker socket is mounted.** That is root-equivalent access, and it is the security cost of the automatic configuration. Mount it read-only and never expose the dashboard

```bash
chmod 600 ./data/letsencrypt/acme.json     # Traefik refuses to start otherwise
```

### Where it wins

- **Many services appearing and disappearing**: preview environments, a self-hosted stack, a monorepo of services
- **It exports Prometheus metrics natively**, which Module 14 picks up
- The cost is that **routing lives in labels scattered across the compose file**, which is harder to read than one config file
