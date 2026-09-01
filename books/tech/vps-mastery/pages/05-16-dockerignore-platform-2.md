### The architecture trap

- An image built on an Apple laptop is `linux/arm64`. A typical VPS is `linux/amd64`

```text
exec /usr/local/bin/node: exec format error
```

- Build for the target explicitly:

```bash
docker build --platform linux/amd64 -t marketplace/orders:7f3a91c .
```

- Emulated cross-builds are slow. Building in CI on an `amd64` runner, as Module 13 does, removes the problem entirely

### Confirm what an image is

```bash
docker image inspect marketplace/orders:7f3a91c --format '{{.Os}}/{{.Architecture}}'
# linux/amd64
```
