## systemd

- **systemd** starts services at boot, restarts them when they die, and owns their logs. Nginx, ssh, docker and fail2ban are all systemd units

```bash
sudo systemctl status nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx      # stop then start. Drops connections
sudo systemctl reload nginx       # re-read config, keep serving
sudo systemctl enable nginx       # start at boot
sudo systemctl disable nginx
sudo systemctl enable --now nginx # enable and start in one step
```

### Reading `status`

```text
● nginx.service - A high performance web server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled)
     Active: active (running) since Sun 2026-08-30 09:02:11 UTC; 2h ago
   Main PID: 812 (nginx)
      Tasks: 3 (limit: 4613)
     Memory: 12.4M
```

- `enabled` means it survives a reboot. `active (running)` means it is up right now. Both must be true

### What is running, and what failed

```bash
systemctl list-units --type=service --state=running
systemctl --failed
```

### Docker Compose replaces most of this

- With the stack in containers, the only systemd units that matter are `docker`, `nginx`, `ssh` and any timers from Module 12
- Page 06-10 covers restart policies, which are the container equivalent of `Restart=always`
