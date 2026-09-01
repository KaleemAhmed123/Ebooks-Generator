## Size, scanning and provenance

- A smaller image pulls faster, starts faster, and contains fewer packages that can have vulnerabilities. All three matter in a deploy

### Finding the weight

```bash
docker images myapp --format '{{.Repository}}:{{.Tag}} {{.Size}}'
docker history myapp:1.4.2 --no-trunc | head -20
docker system df                      # what Docker is using on this machine
```

| Cause | Fix |
|---|---|
| dev dependencies in the runtime | multi-stage, `npm ci --omit=dev` |
| the full `node:24` base | `-slim` or `-alpine` |
| `node_modules` copied from the host | `.dockerignore` |
| build caches inside a layer | `--mount=type=cache`, or clean in the same `RUN` |
| `apt-get` lists left behind | `rm -rf /var/lib/apt/lists/*` in the same `RUN` |

### Scanning

```bash
docker scout cves myapp:1.4.2
docker scout recommendations myapp:1.4.2   # suggests a better base image
trivy image myapp:1.4.2 --severity HIGH,CRITICAL
```

- **Scan in CI and fail the build on critical findings in your own dependencies.** Base image findings usually need a rebuild, not a code change
- ECR can scan on push, which catches an image that was fine when built and is not any more
