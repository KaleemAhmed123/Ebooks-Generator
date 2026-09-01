## Requesting a certificate

### The Nginx plugin, which also edits the config

```bash
sudo certbot --nginx \
  -d example.com -d www.example.com \
  -d api.example.com -d seller.example.com -d admin.example.com \
  --email kaleem@example.com --agree-tos --no-eff-email
```

- Certbot finds the matching `server` blocks, validates each name over HTTP-01, and rewrites the config to listen on 443 with the certificate paths filled in
- It also adds the port 80 redirect if asked

### Certificate only, no config changes

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  -d example.com -d www.example.com
```

- Use this when Nginx runs in a container, or when the config is managed by hand. Certbot writes the files and touches nothing else

### One certificate or several

| Approach | Result |
|---|---|
| All names in one command | One certificate covering every name. One renewal |
| Separate commands | Separate certificates. Independent renewal, more to track |

- **One certificate for the whole stack is simpler.** Adding a name later means re-running the command with the full list, because the new run replaces the old certificate

### Where the files land

```bash
sudo ls -l /etc/letsencrypt/live/example.com/
# cert.pem -> ../../archive/example.com/cert1.pem
# fullchain.pem -> ../../archive/example.com/fullchain1.pem
# privkey.pem -> ../../archive/example.com/privkey1.pem
```

- The `live` paths are symlinks that always point at the current version. **Reference `live`, never `archive`**, or renewal silently stops taking effect
