## The firewall, and the Docker trap

```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow OpenSSH
ufw allow 80,443/tcp
ufw enable
ufw status verbose
```

- **Allow SSH before enabling.** `ufw enable` on a remote box with no SSH rule ends the session permanently

### The trap that catches almost everyone

- **Docker writes its own iptables rules and bypasses ufw entirely.** A container published with `-p 5432:5432` is reachable from the internet, and `ufw status` will report the port as closed
- This is not a bug. Docker inserts into the `DOCKER-USER` chain, which is evaluated before ufw's rules

```bash
# prove it to yourself, from your laptop
nc -zv 203.0.113.10 5432
```
