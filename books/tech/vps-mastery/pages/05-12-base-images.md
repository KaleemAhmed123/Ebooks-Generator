## Choosing a base image

| Tag | Size | Based on | Use when |
|---|---|---|---|
| `node:24` | ~1.1 GB | Debian | Never in production |
| `node:24-slim` | ~200 MB | Debian, trimmed | **The safe default** |
| `node:24-alpine` | ~130 MB | Alpine, musl libc | Small images, no native modules |
| `gcr.io/distroless/nodejs24` | ~110 MB | No shell, no package manager | Hardened final stage |

### The recommendation

- **Start with `slim`.** It is Debian, so native modules compile normally and every troubleshooting answer online applies
- Move to `alpine` when image size genuinely matters and the dependency tree has been checked
- Reach for distroless when a security review asks for it. Debugging without a shell is harder, and `docker exec` stops being an option

### Pin the major, not the digest

```dockerfile
FROM node:24-alpine        # good
FROM node:latest           # a future rebuild silently jumps major versions
FROM node:24.6.1-alpine    # too tight. Blocks security patches
```

### The same rule for service images

```yaml
image: postgres:18-alpine     # good
image: postgres:latest        # a rebuild in a year starts Postgres 19 on an 18 data directory
```

- Postgres refuses to start on a data directory from an older major version. That failure looks like data loss at the moment it happens, during a rebuild, under pressure
