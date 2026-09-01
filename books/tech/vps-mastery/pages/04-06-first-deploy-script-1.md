## The first deploy script

- Three commands typed in the same order every time is a script waiting to be written

```bash
nano /srv/app/deploy.sh
chmod +x /srv/app/deploy.sh
```

```bash
#!/usr/bin/env bash
set -euo pipefail

cd /srv/app

echo "deploying $(git rev-parse --short HEAD) -> latest"
git pull --ff-only origin main
docker compose build
docker compose up -d
docker image prune -f

echo "now running $(git rev-parse --short HEAD)"
docker compose ps
```

### The first line and the second line

- `#!/usr/bin/env bash` picks bash from the path rather than assuming a location
- `set -euo pipefail` is what separates a script from a hope:

| Flag | Effect |
|---|---|
| `-e` | Stop at the first command that fails |
| `-u` | Stop if an unset variable is used |
| `-o pipefail` | A pipeline fails if any stage fails, not just the last |

- Without `-e`, a failed build is ignored and the next line restarts the old containers while reporting success
