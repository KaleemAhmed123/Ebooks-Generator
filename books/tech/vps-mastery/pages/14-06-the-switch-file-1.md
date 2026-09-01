## The one file that decides

- Nginx includes a single generated file. Everything else in the config is static

```nginx
# edge/nginx.conf
http {
    include /etc/nginx/conf.d/active-color.conf;

    server {
        listen 443 ssl;
        server_name example.com;

        location /api/ {
            proxy_pass http://gateway/;
            include /etc/nginx/snippets/proxy.conf;
        }
        location / {
            proxy_pass http://shop_ui;
            include /etc/nginx/snippets/proxy.conf;
        }
    }
}
```

```nginx
# edge/conf.d/active-color.conf   - generated, never edited by hand
upstream gateway { server api-gateway-blue:8080; keepalive 64; }
upstream shop_ui { server shop-ui-blue:3000;     keepalive 32; }
upstream chat    { server chat-blue:6010;        keepalive 32; }
```
