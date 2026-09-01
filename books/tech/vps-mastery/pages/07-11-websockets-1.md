## WebSockets

- A WebSocket starts as an HTTP request asking to switch protocols:

```text
GET /socket.io/ HTTP/1.1
Upgrade: websocket
Connection: Upgrade
```

- Nginx does not forward hop-by-hop headers by default. The upgrade never reaches the backend, the handshake fails, and the client falls back to polling or errors

### The map, at `http` level

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}
```

- This is why a `map` is needed rather than a fixed header. Setting `Connection: upgrade` on every request breaks keepalive for normal traffic

### The location block

```nginx
location /socket.io/ {
    proxy_pass http://chat_service;
    proxy_http_version 1.1;
    proxy_set_header Upgrade    $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host       $host;

    proxy_read_timeout  3600s;
    proxy_send_timeout  3600s;
}
```
