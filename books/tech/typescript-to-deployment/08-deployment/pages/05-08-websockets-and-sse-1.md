## WebSockets, SSE and long requests

- A WebSocket starts as an HTTP request asking to **upgrade** the connection. A proxy that does not pass the upgrade headers turns that into an ordinary `200` and the connection never forms
- Server-Sent Events is a plain response that never ends, which trips every buffering and timeout default Nginx has

### WebSockets

```nginx
map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

location /socket.io/ {
  proxy_pass http://app;
  proxy_http_version 1.1;
  proxy_set_header Upgrade    $http_upgrade;
  proxy_set_header Connection $connection_upgrade;
  proxy_read_timeout 3600s;
  proxy_send_timeout 3600s;
}
```

- **The `map` block is the correct form.** Hard-coding `Connection upgrade` breaks ordinary requests through the same location
- **`proxy_read_timeout` defaults to 60 seconds**, so an idle socket is closed after a minute. That is the reason a chat reconnects every 60 seconds
