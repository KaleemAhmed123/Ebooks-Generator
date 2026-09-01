## Concurrency, so two deploys never race

- Two merges a minute apart start two deploys. Both pull, both restart containers, and the stack ends up running a mixture

```yaml
concurrency:
  group: deploy-production
  cancel-in-progress: false
```

- The second run queues until the first finishes. **`cancel-in-progress: false` is required for a deploy**, because cancelling one halfway leaves the box in an unknown state

### Different rules for different jobs

```yaml
# tests: cancel superseded runs
concurrency:
  group: test-${{ github.ref }}
  cancel-in-progress: true
```

- Cancelling a superseded test run saves minutes and breaks nothing

### A lock on the server as well

- Concurrency covers GitHub. It does not stop someone running the script by hand at the same moment

```bash
exec 9>/var/lock/deploy.lock
flock -n 9 || { echo "another deploy is running"; exit 1; }
```

- `flock -n` fails immediately rather than waiting. The lock releases when the script exits, including on a crash
