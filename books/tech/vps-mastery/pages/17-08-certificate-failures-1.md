## Certificate failures

### The browser says the certificate expired

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -enddate

sudo openssl x509 -in /etc/letsencrypt/live/example.com/fullchain.pem -noout -enddate
```

- **If the file on disk is valid and the served one is not, Nginx was never reloaded.** That is the deploy hook on page 09-06, and it is the most common version of this failure

```bash
docker compose -p app-edge exec -T nginx nginx -s reload
```

### Renewal is failing

```bash
sudo certbot renew --dry-run
sudo journalctl -u snap.certbot.renew.service --since "7 days ago"
```

| Message | Cause |
|---|---|
| `Timeout during connect` | Port 80 closed, or the redirect swallows the challenge path |
| `NXDOMAIN` | The record was removed, or the domain expired |
| `unauthorized` | The challenge file was not served. Wrong webroot |
| `too many certificates` | Rate limit. Page 09-03 |
