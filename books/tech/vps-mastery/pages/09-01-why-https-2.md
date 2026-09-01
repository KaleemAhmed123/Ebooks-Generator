### The one legitimate exception

- Port 80 must stay open, serving only two things: the ACME challenge path, and a redirect to HTTPS

```nginx
server {
    listen 80;
    server_name example.com www.example.com;

    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://$host$request_uri; }
}
```
