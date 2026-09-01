## Choosing a base image

- The base decides the image size, the vulnerability count, and whether native modules compile at all

| Base | Size | Fits |
|---|---|---|
| `node:24` | ~1.1 GB | never, in production |
| `node:24-slim` | ~200 MB | **the safe default**, Debian, glibc |
| `node:24-alpine` | ~140 MB | small, musl libc, occasional surprises |
| `gcr.io/distroless/nodejs24` | ~110 MB | no shell at all, hardest to attack |

### Alpine, and the one real catch

- Alpine uses **musl** rather than **glibc**. Almost everything works, and the exceptions are memorable
- Prebuilt native binaries built for glibc will not load, so a package may compile from source or fail outright
- DNS resolution and timezone handling have both historically differed. `apk add --no-cache tzdata` is the usual fix for the second
- **If a native dependency misbehaves, move to `-slim` and stop investigating.** The 60 MB is not worth the day

### Distroless

- Contains the runtime and nothing else: no shell, no package manager, no `curl`
- **An attacker who gets code execution has no tools to use**, which is a real security gain
- The cost is that `docker exec` gives you nothing, so debugging is done through logs and a separate debug image

### The rules

- **Pin the digest for production**, so a rebuilt image is byte-identical

```dockerfile
FROM node:24-slim@sha256:0f2a...
```

- **Rebuild on a schedule.** A pinned base stops receiving security fixes, so pinning without rebuilding trades one risk for another
