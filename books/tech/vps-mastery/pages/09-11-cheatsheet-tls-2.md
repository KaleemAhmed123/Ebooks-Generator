### Common failures

| Message | Cause |
|---|---|
| `NXDOMAIN` during validation | DNS not propagated. Page 08-04 |
| `Connection refused` on port 80 | Firewall, or Nginx not running |
| `too many certificates already issued` | Rate limit. Wait, and use `--dry-run` next time |
| Browser warns after renewal | Nginx was never reloaded. Page 09-06 |
| `unable to get local issuer certificate` | Serving `cert.pem` instead of `fullchain.pem` |
