## Images, layers and the build cache

- An **image** is the filesystem template. A **container** is a running instance of it. The relationship is a class and an object
- An image is built from **layers**, one per instruction in the Dockerfile, each recording only what changed
- Layers are content-addressed and shared. Ten images on the same base store that base once

### Why the order of instructions decides your build time

- On a rebuild, Docker reuses a layer if its instruction and its inputs are unchanged
- **The first changed layer invalidates every layer after it.** Nothing below a cache miss can be reused

```dockerfile
COPY . .                 # any source change invalidates this
RUN npm ci               # so dependencies reinstall on every commit
```

```dockerfile
COPY package*.json ./    # changes only when dependencies change
RUN npm ci               # cached across almost every build
COPY . .                 # source changes land after the expensive step
```

- **That reordering is usually the difference between a 20 second build and a 3 minute one**, and it is the single most valuable Docker habit

### Seeing the layers

```bash
docker history myapp:latest
docker image inspect myapp:latest --format '{{ .RootFS.Layers }}'
```

### The rule that catches people out

- **Deleting a file in a later layer does not shrink the image.** The earlier layer still contains it, and anyone with the image can read it
- A secret copied in and then removed is still in the image. Multi-stage builds, two pages on, are the fix
- `--mount=type=secret` passes a credential to one command without it ever entering a layer
