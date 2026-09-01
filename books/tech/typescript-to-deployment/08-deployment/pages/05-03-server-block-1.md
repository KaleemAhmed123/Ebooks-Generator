## The server block

```nginx
upstream app {
  server 127.0.0.1:3000;
  keepalive 32;
}

server {
  listen 80;
  server_name api.example.com;
  return 301 https://$host$request_uri;      # everything goes to TLS
}

server {
  listen 443 ssl;
  http2 on;
  server_name api.example.com;

  ssl_certificate     /etc/letsencrypt/live/api.example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;

  location /health {
    access_log off;
    proxy_pass http://app;
  }

  location / {
    proxy_pass http://app;
    proxy_http_version 1.1;
    proxy_set_header Connection "";           # required for upstream keepalive
  }
}
```
