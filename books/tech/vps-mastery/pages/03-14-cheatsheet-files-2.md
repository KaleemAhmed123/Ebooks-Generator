### Moving things on and off the box

```bash
scp backup.tar.gz kaleem@203.0.113.10:/srv/app/backups/
scp kaleem@203.0.113.10:/srv/app/backups/db.dump ./
rsync -avz --progress ./dist/ kaleem@203.0.113.10:/srv/app/dist/
```

### Archives

```bash
tar -czf backup.tar.gz /srv/app/uploads     # create
tar -tzf backup.tar.gz | head               # list without extracting
tar -xzf backup.tar.gz -C /srv/restore      # extract into a directory
```
