## Pulling updates, and keeping the box clean

```bash
cd /srv/app
git pull origin main
```

- Git downloads only the changed objects. On a normal update this is a few kilobytes

### The rule that keeps `pull` working

- **Never edit tracked files on the server.** A local edit turns the next pull into a merge conflict on a production box at the worst time

```text
error: Your local changes to the following files would be overwritten by merge:
        docker-compose.yml
Please commit your changes or stash them before you merge.
```

### Recovering from having done it anyway

```bash
git diff                       # see what was changed. Copy anything worth keeping
git checkout -- docker-compose.yml   # discard one file
git reset --hard origin/main         # discard everything. Destructive
```

- `reset --hard` throws away every uncommitted change. Read the `diff` first

### Files that must not be tracked

- `.env`, TLS material, any generated build output. These belong in `.gitignore` and live only on the box
- `git status` on a healthy production checkout prints nothing. Anything listed is either a missing `.gitignore` entry or an edit that should not exist

### Pinning to a known commit

```bash
git fetch origin
git checkout 7f3a91c        # detached HEAD, deliberate
```

- Useful for a rollback. Return to normal with `git checkout main`
