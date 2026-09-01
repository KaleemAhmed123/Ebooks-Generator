## fail2ban

- With password login disabled, brute force cannot succeed. It can still fill the logs and waste CPU
- **fail2ban** watches log files and adds a temporary firewall ban for any address that fails repeatedly

```bash
sudo apt install -y fail2ban
```

- Configure through `jail.local`, never `jail.conf`. The `.conf` file is replaced on upgrade

```bash
sudo nano /etc/fail2ban/jail.local
```

```text
[DEFAULT]
bantime  = 1h
findtime = 10m
maxretry = 5
backend  = systemd

[sshd]
enabled = true
```

- `backend = systemd` matters on Ubuntu, where sshd logs to the journal rather than to `/var/log/auth.log`

```bash
sudo systemctl enable --now fail2ban
sudo fail2ban-client status sshd
# Currently banned: 14
# Total banned:     212
```
