## Cheatsheet: nginx

### Operating

```bash
sudo nginx -t                          # test. Always before reload
sudo nginx -T | less                    # test and dump the FULL merged config
sudo systemctl reload nginx
sudo systemctl status nginx
sudo nginx -s reload                    # same as systemctl reload
```

- `nginx -T` is the one to reach for when a directive appears to be ignored. It shows every included file merged into one

### The site file skeleton

```nginx
upstream shop_ui { server 127.0.0.1:4000; keepalive 32; }

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name example.com www.example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    client_max_body_size 50M;

    location / {
        proxy_pass http://shop_ui;
        include /etc/nginx/snippets/proxy.conf;
    }
}

server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$host$request_uri;
}
```
