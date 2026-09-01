## Model 3: build in CI, push to a registry

- The build runs on GitHub's machines. The result is an image tagged with the commit. The server pulls it and starts it

```text
push to main
   │
   ├─ test        npm ci, lint, test
   │
   ├─ build       docker build, push ghcr.io/kaleem/orders:7f3a91c
   │
   └─ deploy      ssh in, docker compose pull, flip, health check
```

### Why GHCR

- **GHCR** is GitHub's container registry. It is free for private images on normal plans, and authentication uses the token the workflow already has
- Docker Hub works too, with a pull rate limit that becomes a problem exactly when a redeploy is urgent

### What changes on the server

- No Git checkout of application code. No `docker build`. No build cache
- The server needs only three things: the Compose file, `.env`, and the ability to pull

```yaml
services:
  orders:
    image: ghcr.io/kaleem/orders:${IMAGE_TAG}
    env_file: [.env]
```

```bash
IMAGE_TAG=7f3a91c docker compose pull
IMAGE_TAG=7f3a91c docker compose up -d
```
