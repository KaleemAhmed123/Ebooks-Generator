## Images, layers, containers

- **Image** - a read-only template. Built once, never changes
- **Layer** - one filesystem change, produced by one instruction in a Dockerfile
- **Container** - a running image with a thin writable layer on top

```text
┌─────────────────────────────┐
│ writable layer (container)  │  ← discarded when the container is removed
├─────────────────────────────┤
│ CMD node dist/main.js       │
│ COPY dist ./dist            │  ← layers, read-only, shared
│ RUN npm ci --omit=dev       │
│ FROM node:24-alpine         │
└─────────────────────────────┘
```

### Layers are shared

- Ten services built from `node:24-alpine` store that base once. The disk cost is the difference, not ten full copies

```bash
docker image ls
docker history marketplace/orders:7f3a91c
```

### The writable layer is temporary

- Anything written inside a running container that is not on a volume disappears when the container is removed
- This includes uploaded files, SQLite databases, and log files written to disk. Module 12 covers keeping them

### Digests, not tags

- A tag is a movable label. A **digest** is the content hash and never changes

```bash
docker image inspect --format '{{index .RepoDigests 0}}' marketplace/orders:7f3a91c
# marketplace/orders@sha256:4c1f...
```

- "Which build is running" is answerable only by digest. Page 13-08 makes tagging produce one
