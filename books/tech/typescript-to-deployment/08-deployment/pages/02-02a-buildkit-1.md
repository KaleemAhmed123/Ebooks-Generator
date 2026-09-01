## BuildKit

- **BuildKit is the build engine, and it is the default now.** It builds independent stages in parallel, skips stages nothing needs, and adds mounts that never become layers
- The features below need the syntax directive at the top of the Dockerfile, which pins the frontend version

```dockerfile
# syntax=docker/dockerfile:1
```

### Cache mounts

```dockerfile
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
```

- The package manager cache persists between builds **without entering a layer**, so the image stays small and a cold rebuild is fast

### Secret mounts

```dockerfile
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc \
    npm ci
```

```bash
docker build --secret id=npmrc,src=$HOME/.npmrc -t myapp .
```

- **This is the correct way to use a private registry token during a build.** A build argument would be visible forever in `docker history`

### Bind mounts, to avoid copying

```dockerfile
RUN --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
```

- The files are visible to the command and never copied into a layer
