### The parts worth understanding

| Line | Why |
|---|---|
| `packages: write` | The only extra permission needed. `GITHUB_TOKEN` handles the rest |
| `platforms: linux/amd64` | Matches the server. Page 05-16 |
| `cache-from: type=gha` | GitHub's own build cache. Cuts a rebuild from minutes to seconds |
| `mode=max` | Caches intermediate stages too, which matters for multi-stage builds |
| `provenance: false` | Avoids a multi-arch index that some older tooling mishandles |

### The cache is per-branch

- A pull request branch starts with a cold cache and warms as it runs. The first build on a new branch is always the slow one
