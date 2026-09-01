## The routine

### Daily, two minutes

```bash
ssh prod 'uptime && free -h && df -h / && docker ps --format "{{.Names}} {{.Status}}" | grep -v Up'
```

- The last filter prints only containers that are **not** up. No output is the good outcome

### Weekly, ten minutes

- [ ] Check the Grafana dashboard for a trend, not a spike
- [ ] `restic snapshots | tail -5` - are backups still arriving
- [ ] `sudo certbot certificates` - expiry dates still far away
- [ ] `sudo apt list --upgradable` - anything security-related
- [ ] `docker system df` - is the disk trending up
- [ ] Read any alert that fired and was ignored. Fix it or delete it

### Monthly, an hour

- [ ] Restore drill, page 12-07
- [ ] Reboot the box during a quiet window. **A server that has not rebooted in a year will not reboot cleanly**
- [ ] Update base images and redeploy, so security patches actually land
- [ ] Review who has access to the server and to every account
- [ ] Check the bill against the expectation
