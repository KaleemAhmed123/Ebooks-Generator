## Server blocks

- One `server` block per hostname. Nginx picks it by matching `server_name` against the `Host` header

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://shop_ui;
        include /etc/nginx/snippets/proxy.conf;
    }
}

server {
    listen 80;
    listen [::]:80;
    server_name api.example.com;

    location / {
        proxy_pass http://api_gateway;
        include /etc/nginx/snippets/proxy.conf;
    }
}
```

- `listen [::]:80` is IPv6. Without it the site is unreachable over IPv6 while DNS advertises it

### Matching order

1. Exact match on `server_name`
2. Leading wildcard, `*.example.com`
3. Trailing wildcard, `example.*`
4. Regular expressions, in file order
5. The `default_server`, or the first block Nginx read
