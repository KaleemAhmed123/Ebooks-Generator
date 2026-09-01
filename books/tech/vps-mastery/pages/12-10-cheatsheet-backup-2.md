### restic

```bash
restic snapshots
restic backup /srv/app/backups --tag nightly
restic restore latest --target /tmp/restore
restic restore latest --target /tmp/r --include /srv/app/.env.enc
restic forget --prune --keep-daily 7 --keep-weekly 4 --keep-monthly 6
restic check --read-data-subset=5%
restic stats
```

### The five-line check that a backup is real

```bash
restic snapshots --tag nightly | tail -3      # recent
restic restore latest --target /tmp/t        # retrievable
ls -lh /tmp/t/srv/app/backups/               # non-empty
pg_restore --list /tmp/t/srv/app/backups/*.dump | head   # valid
# then restore it into a scratch database and count rows
```
