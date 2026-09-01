### Services and logs

```bash
systemctl status nginx
systemctl --failed
journalctl -u nginx -f
journalctl -p err -b
journalctl --vacuum-size=200M
```

### The four commands for a box that feels wrong

```bash
uptime && free -h && df -h && docker ps
```
