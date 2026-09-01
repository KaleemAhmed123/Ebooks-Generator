### A rewrite is the escape hatch, not the fix

```nginx
location /api/api/ {
    rewrite ^/api/api/(.*)$ /api/$1 last;
}
```

- This works and hides a client bug from whoever reads the config next

### Variables in proxy_pass change the behavior

```nginx
proxy_pass http://$upstream_host;    # resolved at request time, needs a resolver
```

- Using a variable makes Nginx re-resolve DNS per request instead of once at startup. That is how a container Nginx keeps working after a backend container is recreated with a new IP
