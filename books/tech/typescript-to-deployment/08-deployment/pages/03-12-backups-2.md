### Schedule it

```bash
# /etc/systemd/system/backup.timer
[Timer]
OnCalendar=*-*-* 02:30
Persistent=true
```

```bash
systemctl enable --now backup.timer
systemctl list-timers backup.timer
```

### The part that is not optional

```bash
restic snapshots
restic restore latest --target /tmp/restore-test
pg_restore --list /tmp/restore-test/tmp/app-*.dump | head
```

- **Restore once a month, into a scratch container, and run a real query.** A backup you have never restored is a hypothesis
- **Alert when a backup does not run.** Send a ping to a dead-man service at the end of the script; if the ping stops, someone is told
