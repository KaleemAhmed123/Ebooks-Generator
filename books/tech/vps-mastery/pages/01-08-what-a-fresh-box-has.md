## What a fresh box actually has

- Worth checking before installing anything on top

```bash
lsb_release -a          # Ubuntu 26.04 LTS
uname -r                # kernel version
nproc                   # 2
free -h                 # total 3.8Gi, used 180Mi
df -h /                 # 40G total, 2.1G used
ip -4 addr show         # the public address, usually on eth0
```

### Already running

- `ssh` - the daemon this session came through
- `systemd-resolved` - DNS resolution
- `unattended-upgrades` - present, often not fully configured
- `cron` - the scheduler
- Usually a provider agent for the web console and metrics

### Not there

- No firewall rules. Every port is reachable from the internet
- No non-root user
- No swap file, on most providers
- No Docker, no Nginx, no runtime, no database

### The scanning starts immediately

- A public IPv4 address gets scanned within minutes of coming online

```bash
journalctl -u ssh --since "1 hour ago" | grep -c "Failed password"
# 431
```

- Four hundred password guesses in the first hour is normal, not an attack in progress. It is why Module 2 comes before anything else
