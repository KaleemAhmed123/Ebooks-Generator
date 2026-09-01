## Backups that leave the box

- **A backup on the same machine is not a backup.** The machine is the thing that fails
- Two things need backing up: the database, and the files under `/srv/app/data`

### The database dump

```bash
#!/usr/bin/env bash
# /srv/app/backup.sh
set -euo pipefail
STAMP=$(date +%F-%H%M)
cd /srv/app

docker compose exec -T db pg_dump -U app --format=custom app \
  > "/tmp/app-$STAMP.dump"

restic -r "$RESTIC_REPOSITORY" backup "/tmp/app-$STAMP.dump" /srv/app/data
restic forget --keep-daily 7 --keep-weekly 4 --keep-monthly 6 --prune
rm -f "/tmp/app-$STAMP.dump"
```

```bash
apt install -y restic
export RESTIC_REPOSITORY='s3:s3.amazonaws.com/acme-backups'
export RESTIC_PASSWORD_FILE=/etc/restic.pass
restic init
```

- **`restic` deduplicates and encrypts before upload**, so a daily full dump costs very little after the first
- **It works with S3, Backblaze B2, Wasabi, or any SFTP target.** B2 is usually the cheapest
- **`pg_dump --format=custom`** allows selective restore and is far smaller than plain SQL
