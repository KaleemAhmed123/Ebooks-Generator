### The systemd timer

```bash
sudo tee /etc/systemd/system/backup.service > /dev/null <<'UNIT'
[Unit]
Description=Nightly backup
[Service]
Type=oneshot
ExecStart=/srv/app/scripts/backup.sh
UNIT

sudo tee /etc/systemd/system/backup.timer > /dev/null <<'UNIT'
[Unit]
Description=Run the nightly backup
[Timer]
OnCalendar=*-*-* 03:00:00
RandomizedDelaySec=900
Persistent=true
[Install]
WantedBy=timers.target
UNIT

sudo systemctl daemon-reload
sudo systemctl enable --now backup.timer
```

- `Persistent=true` runs a missed backup after a reboot. A cron job simply skips it
- `restic check --read-data-subset=5%` verifies a sample of the stored data every night, so silent corruption surfaces before a restore needs it
