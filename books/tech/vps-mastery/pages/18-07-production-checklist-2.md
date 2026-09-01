### Edge

- [ ] TLS on every hostname, `certbot renew --dry-run` passes
- [ ] A deploy hook reloads Nginx after renewal
- [ ] Port 80 redirects, except the ACME path
- [ ] `Upgrade` headers set wherever WebSockets are used
- [ ] `client_max_body_size` matches the largest real upload
- [ ] Security headers, with HSTS raised only after TLS is proven
- [ ] Rate limits on `/api/` and a tighter one on login
- [ ] A `default_server` returning 444

### Data

- [ ] Nightly dump, sent off the box, to a **different provider**
- [ ] A restore has been performed and rows counted
- [ ] The restic password and the age key are in a password manager
- [ ] Backup failure alerts through a push monitor

### Deploy

- [ ] Images built in CI, tagged by commit
- [ ] Tests gate the deploy, concurrency prevents a race
- [ ] The deploy verifies health before sending traffic
- [ ] Rollback tested at least once
- [ ] Migrations are additive, expand and contract

### Watching

- [ ] Uptime check from outside the box
- [ ] Disk, memory, error rate and certificate expiry all alert
- [ ] A dead man's switch on the monitoring itself
- [ ] Alerts reach a phone, and there are few enough to still be read
