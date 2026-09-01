## TLS when Nginx runs in a container

- Certbot lives on the host. Nginx lives in a container. Two problems follow: the challenge file, and the reload

### The shared webroot

```yaml
nginx:
  image: nginx:1.28-alpine
  ports: ["80:80", "443:443"]
  volumes:
    - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    - /etc/letsencrypt:/etc/letsencrypt:ro
    - /var/www/certbot:/var/www/certbot:ro
```

```nginx
location /.well-known/acme-challenge/ {
    root /var/www/certbot;
}
```

- Certbot writes the token into `/var/www/certbot` on the host. The container serves it from the same directory

```bash
sudo certbot certonly --webroot -w /var/www/certbot \
  -d example.com -d www.example.com -d api.example.com
```
