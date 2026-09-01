## One Nginx config for the whole stack - continued

```nginx
location /socket.io/ {
            proxy_pass http://chat;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_read_timeout 3600s;
        }

        location /api/ {
            limit_req zone=api burst=40 nodelay;
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

- Upstreams use **service names**, because this Nginx runs inside the Docker network. `seller.example.com` and `admin.example.com` get their own server blocks on the same pattern
