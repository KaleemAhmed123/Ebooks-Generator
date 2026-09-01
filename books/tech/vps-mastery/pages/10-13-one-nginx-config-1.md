## One Nginx config for the whole stack

```nginx
worker_processes auto;
events { worker_connections 2048; }

http {
    include /etc/nginx/mime.types;
    client_max_body_size 50M;
    server_tokens off;

    map $http_upgrade $connection_upgrade { default upgrade; '' close; }

    limit_req_zone $binary_remote_addr zone=api:10m rate=20r/s;

    upstream shop_ui    { server shop-ui:3000;      keepalive 32; }
    upstream seller_ui  { server seller-ui:3001;    keepalive 32; }
    upstream admin_ui   { server admin-ui:3002;     keepalive 32; }
    upstream gateway    { server api-gateway:8080;  keepalive 64; }
    upstream chat       { server chat:6010;         keepalive 32; }

    server {
        listen 80;
        server_name example.com www.example.com api.example.com
                    seller.example.com admin.example.com;
        location /.well-known/acme-challenge/ { root /var/www/certbot; }
        location / { return 301 https://$host$request_uri; }
    }

    server {
        listen 443 ssl;
        http2 on;
        server_name example.com www.example.com;
        ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
```
