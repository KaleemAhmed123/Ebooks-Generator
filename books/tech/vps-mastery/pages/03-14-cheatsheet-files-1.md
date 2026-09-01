## Cheatsheet: files, permissions, search

### Looking

```bash
ls -lah                       # long, all, human sizes
ls -lt | head                 # newest first
stat .env                     # size, owner, all three timestamps
file dump.bin                 # what is this actually
readlink -f ./link            # resolve to the real path
tree -L 2 -a                  # two levels, including hidden
```

### Permissions and ownership

```bash
chmod 600 /srv/app/.env       # owner only. Secrets
chmod 640 /etc/app.conf       # owner rw, group r
chmod 755 deploy.sh           # runnable by anyone, writable by owner
chown -R appuser:appuser /srv/app
umask 027                     # default for new files in this shell
```

### Finding

```bash
find /srv -name "*.yml"
find /var/log -size +100M
find /srv -mtime -1 -type f          # changed in the last day
find /tmp -type f -mtime +7 -delete  # older than a week, removed
grep -rn "DATABASE_URL" /srv/app
grep -rl "TODO" --include="*.ts" .   # files only
```
