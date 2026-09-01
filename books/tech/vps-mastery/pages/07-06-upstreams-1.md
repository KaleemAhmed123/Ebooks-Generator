## Upstreams

- An `upstream` names a pool of backends. Routing then refers to the name, not to an address

```nginx
upstream shop_ui {
    server 127.0.0.1:4000;
    keepalive 32;
}

upstream api_gateway {
    server 127.0.0.1:8080;
    keepalive 32;
}
```

- Defined at `http` level, above the server blocks

### `keepalive` matters more than it looks

- Without it, Nginx opens a new TCP connection to the backend for every single request
- Under load that exhausts ephemeral ports and adds a handshake to every response. `keepalive 32` holds 32 idle connections open per worker

- It requires two more lines in the location block, or it does nothing:

```nginx
location / {
    proxy_pass http://shop_ui;
    proxy_http_version 1.1;
    proxy_set_header Connection "";
}
```

- HTTP/1.0 has no persistent connections, and the default `Connection: close` header would close them anyway
