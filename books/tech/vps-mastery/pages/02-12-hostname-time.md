## Hostname, timezone, clock

### Hostname

- The default is a provider string like `ubuntu-2gb-hel1-1`. Every log line and every alert will carry it

```bash
sudo hostnamectl set-hostname prod-1
```

- Add it to `/etc/hosts` so `sudo` stops warning about an unresolvable host:

```text
127.0.1.1 prod-1
```

### Timezone

- **Keep servers on UTC.** Log correlation across a browser, a server and a database only works when one of them is not guessing

```bash
sudo timedatectl set-timezone UTC
timedatectl
#      Local time: Sun 2026-08-30 09:14:22 UTC
# System clock synchronized: yes
#               NTP service: active
```

### The clock

- `System clock synchronized: yes` matters more than it looks. A drifting clock breaks TLS handshakes, JWT expiry checks, and every metric graph
- Ubuntu syncs through `systemd-timesyncd` by default. If it says `no`:

```bash
sudo systemctl enable --now systemd-timesyncd
sudo timedatectl set-ntp true
```

### Display time in a local zone without changing the server

```bash
TZ=Asia/Kolkata date
# Sun Aug 30 14:44:22 IST 2026
```
