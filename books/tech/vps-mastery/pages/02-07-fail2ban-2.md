### Unbanning

```bash
sudo fail2ban-client set sshd unbanip 203.0.113.55
```

### What it does not do

- It reads logs, so it cannot see anything that does not log. A container that publishes its own port is invisible to it
- Increasing `bantime` past a few hours mostly grows the rule table. The addresses rotate
