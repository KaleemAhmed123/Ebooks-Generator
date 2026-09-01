## Ownership

- `chown` changes who owns a file. `chgrp` changes the group alone

```bash
sudo chown appuser:appuser /srv/app/.env
sudo chown -R kaleem:kaleem /srv/app
sudo chown :docker /srv/app/docker-compose.yml     # group only
```

- `-R` applies to everything inside. It is the flag that fixes most "permission denied" errors after copying files as root

### Numeric IDs, and why containers show them

- Linux stores a number, not a name. `appuser` is a label the system looks up
- Inside a container the lookup table is different, so `ls -l` on a mounted volume can show a bare number:

```bash
ls -l /var/lib/docker/volumes/app_pgdata/_data
# drwx------ 19 999 999 4096 Aug 30 09:14 base
```

- `999` is the `postgres` user inside the Postgres image. The host has no name for it. Nothing is broken

### The mismatch that does break things

- A bind-mounted directory owned by host user `1000` mounted into a container whose process runs as `1001` produces write failures with no useful message
- Fix by setting the container user explicitly, or by making the host directory owned by the container's numeric ID

```bash
sudo chown -R 1001:1001 /srv/app/uploads
```
