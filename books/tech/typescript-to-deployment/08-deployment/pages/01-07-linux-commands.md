## Command reference: the server

### systemd

```bash
sudo systemctl daemon-reload           # after editing a unit file
sudo systemctl enable --now app        # start it, and at every boot
sudo systemctl restart app
sudo systemctl reload app              # SIGHUP, no downtime, if supported
sudo systemctl status app
systemctl list-units --failed          # what is broken right now
systemctl show app -p MainPID          # the process id
```

### Logs

```bash
journalctl -u app -f                   # follow
journalctl -u app --since "10 min ago"
journalctl -u app -p err -n 100        # errors only, last 100
journalctl --disk-usage
journalctl --vacuum-time=7d
```

### What is happening on this machine

```bash
htop                                   # processes, interactively
df -h                                  # disk, the usual cause of a mystery outage
free -h                                # memory
uptime                                 # load average
ss -tulpn                              # who is listening on which port
lsof -i :3000                          # what holds this port
curl -sS -o /dev/null -w '%{http_code} %{time_total}s\n' localhost:3000/health
```

### Files and processes

```bash
du -sh /var/log/* | sort -h | tail     # what is filling the disk
tail -f /var/log/nginx/error.log
kill -TERM <pid>                       # ask it to stop
kill -9 <pid>                          # make it stop, losing in-flight work
ps aux --sort=-%mem | head
```

- **`df -h` first, always.** A full disk presents as a hundred unrelated symptoms
