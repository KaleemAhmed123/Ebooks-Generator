## Nginx across replicas

- With `--scale orders=3`, three containers share the service name. **Docker's embedded DNS returns all three addresses**, in rotating order

```nginx
resolver 127.0.0.11 valid=10s ipv6=off;

location /api/orders/ {
    set $orders_upstream orders;
    proxy_pass http://$orders_upstream:8083;
    include /etc/nginx/snippets/proxy.conf;
}
```

| Piece | Why |
|---|---|
| `127.0.0.11` | Docker's internal DNS server, always at this address |
| `valid=10s` | Re-resolve every 10 seconds, so new replicas are picked up |
| A **variable** in `proxy_pass` | Forces resolution per request. A literal resolves once at startup and never again |

- Without the variable, Nginx caches the first address forever. Replicas 2 and 3 receive nothing, and a recreated container becomes a permanent 502

### The alternative: an explicit upstream

```nginx
upstream orders {
    server orders-1:8083 max_fails=3 fail_timeout=30s;
    server orders-2:8083 max_fails=3 fail_timeout=30s;
    server orders-3:8083 max_fails=3 fail_timeout=30s;
    keepalive 32;
}
```

- Needs fixed container names and a config change to scale. In exchange it gives passive health checks and failover, which DNS round-robin does not
