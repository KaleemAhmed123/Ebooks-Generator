## Tagging strategy

- The tag is how a running container is traced back to a commit. Getting it wrong makes rollback guesswork

| Tag | Good for | Problem |
|---|---|---|
| `latest` | Nothing in production | Two deploys, same tag, no way to tell them apart |
| `7f3a91c` (commit sha) | **The deploy tag** | Not human-readable |
| `v2.4.1` (release) | Releases | Needs a release process |
| `2026-08-30-0314` | Readable history | Does not identify a commit |

### Use the commit sha, and add the rest as aliases

```yaml
tags: |
  type=sha,format=long
  type=sha,prefix=,format=short
  type=raw,value=latest,enable={{is_default_branch}}
  type=semver,pattern={{version}}
```

- Deploy by short sha. `latest` exists for convenience and is never what Compose references

### The digest is the real identity

- A tag can be overwritten. A digest cannot

```bash
docker inspect --format '{{index .RepoDigests 0}}' ghcr.io/kaleem/orders:7f3a91c
# ghcr.io/kaleem/orders@sha256:4c1f8b...
```

- Record the digest in the deploy log. It is the only answer to "was that tag rebuilt since?"

### Reading the tag back off a running box

```bash
docker compose ps --format "table {{.Service}}\t{{.Image}}"
# orders   ghcr.io/kaleem/orders:7f3a91c
```
