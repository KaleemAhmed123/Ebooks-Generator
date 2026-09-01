## Disk full

- Everything fails at once, in confusing ways. Postgres refuses writes, Docker cannot start containers, and SSH may not let anyone in

```bash
df -h
# /dev/sda1  40G  40G  0  100% /
df -i          # check inodes as well
```

### Find it fast

```bash
sudo du -sh /var/lib/docker/* | sort -h
sudo du -sh /var/log/* | sort -h | tail
docker system df
sudo ncdu / --exclude /proc --exclude /sys
```

### Reclaim, in order of safety

```bash
# 1. build cache. Always safe
docker builder prune -af

# 2. dangling images. Safe
docker image prune -f

# 3. stopped containers. Safe
docker container prune -f

# 4. the journal
sudo journalctl --vacuum-size=200M

# 5. old backups on the box
find /srv/app/backups -name "*.dump" -mtime +2 -delete

# 6. container logs, if rotation was never configured
sudo truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

- **Never `docker system prune -a` on a full disk during an incident.** It removes images not used by a *running* container, including the previous version needed for rollback
