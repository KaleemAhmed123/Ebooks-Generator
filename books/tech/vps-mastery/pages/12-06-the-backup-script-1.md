## The backup script and its timer

```bash
sudo nano /srv/app/scripts/backup.sh
```

```bash
#!/usr/bin/env bash
set -euo pipefail

cd /srv/app
source /root/.restic-env

STAMP=$(date +%F-%H%M)
DIR=/srv/app/backups
mkdir -p "$DIR"

docker compose exec -T postgres \
  pg_dump -U app -d marketplace --format=custom --compress=9 \
  > "$DIR/marketplace-$STAMP.dump"

docker compose exec -T postgres \
  pg_dumpall -U postgres --globals-only > "$DIR/globals-$STAMP.sql"

# fail loudly on an empty dump rather than uploading nothing
[ -s "$DIR/marketplace-$STAMP.dump" ] || { echo "dump is empty"; exit 1; }

restic backup "$DIR" /srv/app/.env.enc --tag nightly
restic forget --prune --keep-daily 7 --keep-weekly 4 --keep-monthly 6
restic check --read-data-subset=5%

find "$DIR" -name "*.dump" -mtime +2 -delete
echo "backup $STAMP complete"
```
