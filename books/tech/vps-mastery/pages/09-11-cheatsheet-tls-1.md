## Cheatsheet: TLS

### Issue and renew

```bash
sudo certbot --nginx -d example.com -d www.example.com
sudo certbot certonly --webroot -w /var/www/certbot -d example.com
sudo certbot certonly --dns-cloudflare \
  --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
  -d example.com -d "*.example.com"

sudo certbot renew --dry-run          # test the whole renewal path
sudo certbot renew --force-renewal    # only when genuinely needed. Rate limited
sudo certbot certificates             # what exists, and when each expires
sudo certbot delete --cert-name example.com
```

### Inspecting a live certificate

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -dates -subject -issuer

curl -vI https://example.com 2>&1 | grep -E "subject|expire|issuer"
```

### Inspecting a file on disk

```bash
sudo openssl x509 -in /etc/letsencrypt/live/example.com/fullchain.pem -noout -text | head -20
```

### Does the key match the certificate

```bash
sudo openssl x509 -noout -modulus -in /etc/letsencrypt/live/example.com/cert.pem | openssl md5
sudo openssl rsa  -noout -modulus -in /etc/letsencrypt/live/example.com/privkey.pem | openssl md5
```

- Two identical hashes means they match. This is the check for `key values mismatch` at reload
