### fail2ban

```bash
apt install -y fail2ban
```

```ini
# /etc/fail2ban/jail.local
[sshd]
enabled = true
maxretry = 3
findtime = 10m
bantime = 1h
```

```bash
systemctl enable --now fail2ban
fail2ban-client status sshd
fail2ban-client set sshd unbanip 203.0.113.55
```

- **With password authentication already off, fail2ban is mostly about log noise.** It is still worth the two minutes
- **The better answer is Tailscale or WireGuard**, so SSH is not exposed to the internet at all. Module 4 covers it
