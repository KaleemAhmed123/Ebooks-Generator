## `ARG` against `ENV`

- Two ways to get a value into a build, and confusing them is how a token ends up published in an image

| | `ARG` | `ENV` |
|---|---|---|
| Available at | build time only | build **and** run time |
| Set with | `--build-arg` | the Dockerfile, or `-e` at run |
| Visible in | `docker history` | `docker inspect` and the process |
| **Secret-safe** | **no** | **no** |

```dockerfile
ARG NODE_VERSION=24
FROM node:${NODE_VERSION}-slim

ARG BUILD_SHA
ENV GIT_SHA=${BUILD_SHA}          # promote a build arg into the runtime
ENV NODE_ENV=production
```

```bash
docker build --build-arg BUILD_SHA=$(git rev-parse HEAD) -t myapp .
```

### Neither one is for secrets

```bash
docker history --no-trunc myapp | grep -i token    # build args are right there
docker inspect myapp --format '{{ .Config.Env }}'   # so is every ENV
```

- **Use `--mount=type=secret` for a build-time credential** and an injected environment variable at run time. Module 13 covers where the runtime one comes from
