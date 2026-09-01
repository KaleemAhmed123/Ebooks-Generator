### The redirect that breaks renewal

```nginx
server {
    listen 80;
    location / { return 301 https://$host$request_uri; }   # catches the challenge too
}
```

- The ACME path must be served **before** the redirect:

```nginx
location /.well-known/acme-challenge/ { root /var/www/certbot; }
location / { return 301 https://$host$request_uri; }
```

### `unable to get local issuer certificate`

- Nginx is serving `cert.pem` instead of `fullchain.pem`. Browsers with a cached intermediate work, everything else fails, and the report is "it works for me"

### `key values mismatch`

- The certificate and key are from different issuances. Compare their moduli, page 09-11, and re-point at the `live` symlinks
