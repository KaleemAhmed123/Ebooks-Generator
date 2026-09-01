## DNS-01 and wildcard certificates

- A **wildcard** certificate covers `*.example.com`, so new subdomains need no new certificate
- Let's Encrypt issues wildcards only through the `DNS-01` challenge, which requires publishing a `TXT` record

```bash
sudo snap set certbot trust-plugin-with-root=ok
sudo snap install certbot-dns-cloudflare
```

```bash
sudo nano /root/.secrets/cloudflare.ini
```

```text
dns_cloudflare_api_token = REDACTED
```

```bash
sudo chmod 600 /root/.secrets/cloudflare.ini
```

```bash
sudo certbot certonly \
  --dns-cloudflare \
  --dns-cloudflare-credentials /root/.secrets/cloudflare.ini \
  -d example.com -d "*.example.com"
```

### What the wildcard does and does not cover

| Name | Covered by `*.example.com` |
|---|---|
| `api.example.com` | Yes |
| `example.com` | **No.** List it separately, as above |
| `a.b.example.com` | No. One label only |
